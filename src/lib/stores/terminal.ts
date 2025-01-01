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

// Count total height needed for all commands up to current
function calculateTotalHeight(currentCommand: number): number {
	let totalLines = 0;
	for (let i = 0; i <= currentCommand; i++) {
		totalLines += countCommandLines(commands[i]);
	}
	return Math.ceil(totalLines * lineHeight + headerHeight + padding);
}

const maxLines = Math.max(...commands.map(countCommandLines));
const headerHeight = 3; // 3ch for header
const padding = 1; // 0.5ch padding top + 0.5ch bottom
const lineHeight = 3.5; // Much taller to show all content including AUTHOR and COPYRIGHT

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
	scaledHeight: calculateTotalHeight(commands.length - 1),
	totalHeight: `${calculateTotalHeight(commands.length - 1)}ch`,
	commands: commands.map((cmd) => {
		const lines = countCommandLines(cmd);
		const height = Math.ceil(lines * lineHeight + headerHeight + padding);
		return {
			cmd: cmd.cmd,
			lines,
			height: `${height}ch`,
			breakdown: `(${lines} lines × ${lineHeight} line height + ${headerHeight}ch header + ${padding}ch padding) = ${height}ch`
		};
	})
});

export const terminalHeight = derived(terminal, ($terminal) => {
	const height = calculateTotalHeight($terminal.currentCommand);

	// Update debug info with current command details
	debug.update((d) => ({
		...d,
		currentLines: countCommandLines(commands[$terminal.currentCommand])
	}));

	return `${height}ch`;
});
