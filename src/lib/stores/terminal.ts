import {
	calculateCharacterHeight,
	calculateMonospaceHeight
} from '$lib/utils/grid';
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
	return calculateCharacterHeight(cmd.output, {
		extraLines: 1, // Add one line for the command prompt
		headerHeight: 0, // Don't count header here
		padding: 0 // Don't count padding here
	});
}

// Count total height needed for all commands up to current
function calculateTotalHeight(currentCommand: number): number {
	let totalLines = 0;

	// Sum up lines from all commands shown so far
	for (let i = 0; i <= currentCommand; i++) {
		// Add a line for the command prompt
		totalLines += 1; // $
		// Add a line for the command itself
		totalLines += 1; // command text
		// Add lines from output
		totalLines += commands[i].output.split('\n').length;
		// Add a blank line after each command except the last one
		if (i < currentCommand) totalLines += 1;
	}

	// Add header and padding
	return totalLines + headerHeight + padding;
}

const maxLines = Math.max(...commands.map(countCommandLines));
const headerHeight = 3; // 3ch for header
const padding = 4; // More padding to ensure content is visible

// Debug store to track calculations
interface DebugState {
	currentLines: number;
	maxLines: number;
	headerHeight: number;
	padding: number;
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
	rawHeight: maxLines + headerHeight + padding,
	scaledHeight: calculateTotalHeight(commands.length - 1),
	totalHeight: `${calculateTotalHeight(commands.length - 1)}ch`,
	commands: commands.map((cmd) => {
		const lines = countCommandLines(cmd);
		const height = lines + headerHeight + padding;
		return {
			cmd: cmd.cmd,
			lines,
			height: `${height}ch`,
			breakdown: `(${lines} lines + ${headerHeight}ch header + ${padding}ch padding) = ${height}ch`
		};
	})
});

export const terminalHeight = derived(terminal, ($terminal) => {
	// Update debug info with current command details
	debug.update((d) => ({
		...d,
		currentLines: countCommandLines(commands[$terminal.currentCommand])
	}));

	// Count total content lines
	let totalLines = 0;
	for (let i = 0; i <= $terminal.currentCommand; i++) {
		totalLines += 1; // Prompt
		totalLines += 1; // Command
		totalLines += commands[i].output.split('\n').length;
		if (i < $terminal.currentCommand) totalLines += 1; // Gap between commands
	}

	return calculateMonospaceHeight({
		lines: totalLines,
		lineHeight: 1.7,
		headerHeight: 3,
		padding: 4,
		extraGaps: 4 // Gaps between elements
	});
});
