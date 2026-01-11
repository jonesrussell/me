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
};

const TYPING_SPEED = 50;
let typingInterval: ReturnType<typeof setInterval> | null = null;
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
       No limits. An expert Software Developer crafting elegant solutions using modern technologies.
       Specializes in PHP, TypeScript, Go, and Cloud Architecture.`
	}
];

// Commands store
export const commands = writable<Command[]>([...defaultCommands]);

function createTerminal() {
	const { subscribe, update, set } = writable<TerminalState>({
		currentCommand: 0,
		commandVisible: '',
		outputVisible: '',
		isTyping: false
	});

	function typeCommand(command: string, callback: () => void) {
		let currentIndex = 0;
		typingInterval = setInterval(() => {
			update(state => ({
				...state,
				commandVisible: command.slice(0, currentIndex + 1)
			}));

			currentIndex++;
			if (currentIndex === command.length) {
				if (typingInterval) clearInterval(typingInterval);
				callback();
			}
		}, TYPING_SPEED);
	}

	function showOutput(output: string) {
		update(state => ({
			...state,
			outputVisible: output,
			isTyping: false
		}));

		// Move to next command after a delay
		setTimeout(() => {
			update(state => {
				if (state.currentCommand < currentCommands.length - 1) {
					const nextCommand = state.currentCommand + 1;
					const nextCommandData = currentCommands[nextCommand];

					// Mark current command as completed
					commands.update(cmds =>
						cmds.map((cmd, i) =>
							i === state.currentCommand ? { ...cmd, completed: true } : cmd
						)
					);

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
			commands.set([...commandsToLoad]);

			if (commandsToLoad.length > 0) {
				set({
					currentCommand: 0,
					commandVisible: '',
					outputVisible: '',
					isTyping: true
				});
				typeCommand(commandsToLoad[0].cmd, () => {
					showOutput(commandsToLoad[0].output);
				});
			}
		},
		start: () => {
			if (currentCommands.length > 0) {
				update(state => ({
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
				typingInterval = null;
			}
			update(state => ({
				...state,
				isTyping: false
			}));
		},
		reset: () => {
			if (typingInterval) {
				clearInterval(typingInterval);
				typingInterval = null;
			}
			set({
				currentCommand: 0,
				commandVisible: '',
				outputVisible: '',
				isTyping: false
			});
		}
	};
}

export const terminal = createTerminal();

// Terminal height stores
export const terminalHeight = writable('auto');
export const terminalMinHeight = writable('35ch');
