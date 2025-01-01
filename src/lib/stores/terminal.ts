import { calculateCharacterHeight } from '$lib/utils/grid';
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

// Calculate height with ALL spacing factors
const CONTENT_LINES = 23; // Total content lines
const LINE_HEIGHT = 1.7; // --line-height-relaxed
const HEADER = 3; // Terminal header height
const BODY_PADDING = 4; // 2ch top + 2ch bottom (var(--ch2))
const COMMAND_MARGINS = 4; // 1ch margin-top on each command-line and command-output (2 commands)
const ELEMENT_GAPS = 2; // 1ch gap between elements in terminal-body
const EXTRA_PADDING = 2; // Safety margin

// Calculate total height:
// 1. Content lines with line height
// 2. Fixed header height
// 3. Body padding (top and bottom)
// 4. Command margins
// 5. Element gaps
// 6. Extra padding for safety
const TERMINAL_HEIGHT = `${
	Math.ceil(CONTENT_LINES * LINE_HEIGHT) +
	HEADER +
	BODY_PADDING +
	COMMAND_MARGINS +
	ELEMENT_GAPS +
	EXTRA_PADDING
}ch`;

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
	currentLines: CONTENT_LINES,
	maxLines: CONTENT_LINES,
	headerHeight: HEADER,
	padding: BODY_PADDING,
	rawHeight:
		CONTENT_LINES +
		HEADER +
		BODY_PADDING +
		COMMAND_MARGINS +
		ELEMENT_GAPS +
		EXTRA_PADDING,
	scaledHeight:
		Math.ceil(CONTENT_LINES * LINE_HEIGHT) +
		HEADER +
		BODY_PADDING +
		COMMAND_MARGINS +
		ELEMENT_GAPS +
		EXTRA_PADDING,
	totalHeight: TERMINAL_HEIGHT,
	commands: commands.map((cmd) => {
		const lines = countCommandLines(cmd);
		const height =
			Math.ceil(lines * LINE_HEIGHT) +
			HEADER +
			BODY_PADDING +
			COMMAND_MARGINS +
			ELEMENT_GAPS +
			EXTRA_PADDING;
		return {
			cmd: cmd.cmd,
			lines,
			height: `${height}ch`,
			breakdown: `(${lines} lines × ${LINE_HEIGHT} line-height + ${HEADER}ch header + ${BODY_PADDING}ch top padding + ${COMMAND_MARGINS}ch command margins + ${ELEMENT_GAPS}ch element gaps + ${EXTRA_PADDING}ch extra padding) = ${height}ch`
		};
	})
});

export const terminalHeight = derived(terminal, () => TERMINAL_HEIGHT);
