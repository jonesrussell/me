import { writable } from 'svelte/store';

export type Command = {
	cmd: string;
	output: string;
	completed?: boolean;
};

type TerminalState = {
	currentCommand: number;
	commandVisible: string;
	outputVisible: string;
	isTyping: boolean;
	debug?: {
		headerHeight: number;
		padding: number;
		maxLines: number;
		rawHeight: number;
		totalHeight: string;
		currentLines: number;
		commands: {
			cmd: string;
			lines: number;
			height: number;
			breakdown: string;
		}[];
	};
	height?: string;
	loadCommands: (commands: Command[]) => void;
	start: () => void;
	stop: () => void;
	reset: () => void;
};

const TYPING_SPEED = 50;
let typingInterval: NodeJS.Timeout | null = null;
let currentCommands: Command[] = [];

// Initial commands
const defaultCommands: Command[] = [
	{
		cmd: 'whoami',
		output: 'russell'
	},
	{
		cmd: 'man russell | grep -A5 "^SYNOPSIS"',
		output: `SYNOPSIS
       russell [--build] [--innovate] [--ship] <solution>

DESCRIPTION
       A limitless developer crafting elegant solutions with modern web technologies.
       Specializes in TypeScript, Go, and cloud architecture.`
	}
];

function createTerminal() {
	const { subscribe, update } = writable<TerminalState>({
		currentCommand: 0,
		commandVisible: '',
		outputVisible: '',
		isTyping: false,
		loadCommands: () => {},
		start: () => {},
		stop: () => {},
		reset: () => {}
	});

	function typeCommand(command: string, callback: () => void) {
		let currentIndex = 0;
		typingInterval = setInterval(() => {
			update((state) => ({
				...state,
				commandVisible: command.slice(0, currentIndex + 1)
			}));

			currentIndex++;
			if (currentIndex === command.length) {
				clearInterval(typingInterval!);
				callback();
			}
		}, TYPING_SPEED);
	}

	function showOutput(output: string) {
		update((state) => ({
			...state,
			outputVisible: output,
			isTyping: false
		}));

		// Move to next command after a delay
		setTimeout(() => {
			update((state) => {
				if (state.currentCommand < currentCommands.length - 1) {
					const nextCommand = state.currentCommand + 1;
					const nextCommandData = currentCommands[nextCommand];

					// Update state immediately for completed command
					const completedCommand = currentCommands[state.currentCommand];
					commands.update((cmds) => {
						cmds[state.currentCommand] = {
							...completedCommand,
							completed: true
						};
						return cmds;
					});

					// Start typing next command
					typeCommand(nextCommandData.cmd, () => {
						showOutput(nextCommandData.output);
					});

					return {
						...state,
						currentCommand: nextCommand,
						commandVisible: '',
						outputVisible: '',
						isTyping: true
					};
				}
				return state;
			});
		}, 1000);
	}

	return {
		subscribe,
		loadCommands: (newCommands?: Command[]) => {
			const commandsToLoad = newCommands || defaultCommands;
			currentCommands = commandsToLoad;
			commands.set(commandsToLoad); // Update the commands store

			if (commandsToLoad.length > 0) {
				update((state) => ({
					...state,
					currentCommand: 0,
					commandVisible: '',
					outputVisible: '',
					isTyping: true
				}));
				typeCommand(commandsToLoad[0].cmd, () => {
					showOutput(commandsToLoad[0].output);
				});
			}
		},
		start: () => {
			if (currentCommands.length > 0) {
				update((state) => ({
					...state,
					isTyping: true
				}));
				typeCommand(currentCommands[0].cmd, () => {
					showOutput(currentCommands[0].output);
				});
			}
		},
		stop: () => {
			if (typingInterval) {
				clearInterval(typingInterval);
			}
			update((state) => ({
				...state,
				isTyping: false
			}));
		},
		reset: () => {
			if (typingInterval) {
				clearInterval(typingInterval);
			}
			update((state) => ({
				...state,
				currentCommand: 0,
				commandVisible: '',
				outputVisible: '',
				isTyping: false
			}));
		}
	};
}

export const terminal = createTerminal();

// Debug store for terminal calculations
export const debug = writable({
	headerHeight: 0,
	padding: 0,
	maxLines: 0,
	rawHeight: 0,
	totalHeight: '',
	currentLines: 0,
	commands: [] as {
		cmd: string;
		lines: number;
		height: number;
		breakdown: string;
	}[]
});

// Terminal height store
export const terminalHeight = writable('35ch');

// Commands store - initialize with default commands
export const commands = writable<Command[]>(defaultCommands);
