import { writable } from 'svelte/store';

export type Command = {
	cmd: string;
	output: string;
	completed?: boolean;
};

const TYPING_SPEED = 50;

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

function createTerminalState() {
	// State using runes
	let currentCommand = $state(0);
	let commandVisible = $state('');
	let outputVisible = $state('');
	let isTyping = $state(false);
	let commandsList = $state<Command[]>([...defaultCommands]);
	let height = $state('auto');
	let minHeight = $state('35ch');

	let typingInterval: ReturnType<typeof setInterval> | null = null;
	let currentCommands: Command[] = [...defaultCommands];

	function typeCommand(command: string, callback: () => void) {
		let currentIndex = 0;
		typingInterval = setInterval(() => {
			commandVisible = command.slice(0, currentIndex + 1);
			currentIndex++;

			if (currentIndex === command.length) {
				if (typingInterval) clearInterval(typingInterval);
				callback();
			}
		}, TYPING_SPEED);
	}

	function showOutput(output: string) {
		outputVisible = output;
		isTyping = false;

		// Move to next command after a delay
		setTimeout(() => {
			if (currentCommand < currentCommands.length - 1) {
				const nextCommandIndex = currentCommand + 1;
				const nextCommandData = currentCommands[nextCommandIndex];

				// Mark current command as completed
				commandsList = commandsList.map((cmd, i) =>
					i === currentCommand ? { ...cmd, completed: true } : cmd
				);

				// Start typing next command
				currentCommand = nextCommandIndex;
				commandVisible = '';
				outputVisible = '';
				isTyping = true;

				typeCommand(nextCommandData.cmd, () => {
					showOutput(nextCommandData.output);
				});
			}
		}, 1000);
	}

	return {
		// Getters for reactive state
		get currentCommand() {
			return currentCommand;
		},
		get commandVisible() {
			return commandVisible;
		},
		get outputVisible() {
			return outputVisible;
		},
		get isTyping() {
			return isTyping;
		},
		get commands() {
			return commandsList;
		},
		get height() {
			return height;
		},
		set height(value: string) {
			height = value;
		},
		get minHeight() {
			return minHeight;
		},
		set minHeight(value: string) {
			minHeight = value;
		},

		loadCommands(newCommands?: Command[]) {
			const commandsToLoad = newCommands || defaultCommands;
			currentCommands = commandsToLoad;
			commandsList = [...commandsToLoad];

			if (commandsToLoad.length > 0) {
				currentCommand = 0;
				commandVisible = '';
				outputVisible = '';
				isTyping = true;

				typeCommand(commandsToLoad[0].cmd, () => {
					showOutput(commandsToLoad[0].output);
				});
			}
		},

		start() {
			if (currentCommands.length > 0) {
				isTyping = true;
				typeCommand(currentCommands[0].cmd, () => {
					showOutput(currentCommands[0].output);
				});
			}
		},

		stop() {
			if (typingInterval) {
				clearInterval(typingInterval);
				typingInterval = null;
			}
			isTyping = false;
		},

		reset() {
			if (typingInterval) {
				clearInterval(typingInterval);
				typingInterval = null;
			}
			currentCommand = 0;
			commandVisible = '';
			outputVisible = '';
			isTyping = false;
		}
	};
}

export const terminalState = createTerminalState();

// Legacy store-compatible API for gradual migration
type TerminalStoreState = {
	currentCommand: number;
	commandVisible: string;
	outputVisible: string;
	isTyping: boolean;
};

function createLegacyTerminalStore() {
	const { subscribe, set } = writable<TerminalStoreState>({
		currentCommand: 0,
		commandVisible: '',
		outputVisible: '',
		isTyping: false
	});

	// Sync with new state
	$effect.root(() => {
		$effect(() => {
			set({
				currentCommand: terminalState.currentCommand,
				commandVisible: terminalState.commandVisible,
				outputVisible: terminalState.outputVisible,
				isTyping: terminalState.isTyping
			});
		});
	});

	return {
		subscribe,
		loadCommands: terminalState.loadCommands,
		start: terminalState.start,
		stop: terminalState.stop,
		reset: terminalState.reset
	};
}

export const terminal = createLegacyTerminalStore();

// Height stores for legacy compatibility
export const terminalHeight = writable('auto');
export const terminalMinHeight = writable('35ch');

// Commands store for legacy compatibility
function createCommandsStore() {
	const { subscribe, set, update } = writable<Command[]>([...defaultCommands]);

	// Sync with new state
	$effect.root(() => {
		$effect(() => {
			set(terminalState.commands);
		});
	});

	return { subscribe, set, update };
}

export const commands = createCommandsStore();
