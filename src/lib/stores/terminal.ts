import { derived, get, writable } from 'svelte/store';

export interface Command {
	cmd: string;
	output: string;
}

interface TerminalState {
	currentCommand: number;
	commandVisible: string;
	outputVisible: string;
	isTyping: boolean;
}

export const commands: Command[] = [
	{
		cmd: 'whoami',
		output: 'russell'
	},
	{
		cmd: 'man russell',
		output: `RUSSELL(1)                     User Commands                     RUSSELL(1)

NAME
       russell - a limitless developer

SYNOPSIS
       russell [--build] [--innovate] [--ship] <solution>

DESCRIPTION
       Crafts elegant solutions using modern web technologies.
       Specializes in TypeScript, Go, and cloud architecture.

AUTHOR
       Written by Russell Jones.

COPYRIGHT
       License MIT`
	}
];

function createTerminalStore() {
	const store = writable<TerminalState>({
		currentCommand: 0,
		commandVisible: '',
		outputVisible: '',
		isTyping: true
	});

	let cmdIndex = 0;
	let currentInterval: NodeJS.Timeout | null = null;

	const typeNextCommand = () => {
		if (currentInterval) clearInterval(currentInterval);

		const state = get(store);
		currentInterval = setInterval(() => {
			const command = commands[state.currentCommand];
			if (cmdIndex <= command.cmd.length) {
				store.update((s) => ({
					...s,
					commandVisible: command.cmd.slice(0, cmdIndex)
				}));
				cmdIndex++;
			} else {
				if (currentInterval) clearInterval(currentInterval);
				// Show output instantly
				store.update((s) => ({ ...s, outputVisible: command.output }));

				if (state.currentCommand < commands.length - 1) {
					setTimeout(() => {
						cmdIndex = 0;
						store.update((s) => ({
							...s,
							currentCommand: s.currentCommand + 1,
							commandVisible: '',
							outputVisible: ''
						}));
						typeNextCommand();
					}, 1000);
				} else {
					store.update((s) => ({ ...s, isTyping: false }));
				}
			}
		}, 100);
	};

	return {
		subscribe: store.subscribe,
		start: () => {
			cmdIndex = 0;
			store.set({
				currentCommand: 0,
				commandVisible: '',
				outputVisible: '',
				isTyping: true
			});
			typeNextCommand();
		},
		stop: () => {
			if (currentInterval) clearInterval(currentInterval);
		}
	};
}

export const terminal = createTerminalStore();

// Count lines including command prompt and spacing
function countCommandLines(cmd: Command): number {
	// Count command line itself ($ prompt + command)
	const commandLines = 1;
	// Count output lines exactly as they appear
	const outputLines = cmd.output.split('\n').length;
	return commandLines + outputLines;
}

const maxLines = Math.max(...commands.map(countCommandLines));
const headerHeight = 3; // 3ch for header
const padding = 2; // 1ch padding top + 1ch bottom
const lineHeight = 1.5; // From CSS var(--line-height)
const TERMINAL_HEIGHT = `${Math.ceil((maxLines + headerHeight + padding) * lineHeight)}ch`;

// Debug store to track calculations
interface DebugState {
	currentLines: number;
	maxLines: number;
	headerHeight: number;
	padding: number;
	lineHeight: number;
	rawHeight: number;
	scaledHeight: number;
	totalHeight: string;
	commands: Array<{
		cmd: string;
		lines: number;
		height: string;
		breakdown: string;
	}>;
}

export const debug = writable<DebugState>({
	currentLines: 0,
	maxLines,
	headerHeight,
	padding,
	lineHeight,
	rawHeight: maxLines + headerHeight + padding,
	scaledHeight: Math.ceil((maxLines + headerHeight + padding) * lineHeight),
	totalHeight: TERMINAL_HEIGHT,
	commands: commands.map((cmd) => {
		const lines = countCommandLines(cmd);
		const height = Math.ceil((lines + headerHeight + padding) * lineHeight);
		return {
			cmd: cmd.cmd,
			lines,
			height: `${height}ch`,
			breakdown: `(${lines} lines + ${headerHeight}ch header + ${padding}ch padding) × ${lineHeight} line height = ${height}ch`
		};
	})
});

export const terminalHeight = derived(terminal, ($terminal) => {
	const currentOutput = commands[$terminal.currentCommand]?.output || '';
	const lines = currentOutput.split('\n').length + 1; // +1 for command line

	// Update debug info with current command details
	debug.update((d) => ({
		...d,
		currentLines: lines
	}));

	return TERMINAL_HEIGHT;
});
