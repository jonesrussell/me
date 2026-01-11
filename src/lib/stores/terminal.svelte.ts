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

export const terminalState = $state({
	commands: [...defaultCommands] as Command[],
	currentCommand: 0,
	commandVisible: '',
	outputVisible: '',
	isTyping: false,
	height: 'auto',
	minHeight: '35ch'
});

let typingIntervalId: ReturnType<typeof setInterval> | null = null;

function clearTypingInterval() {
	if (typingIntervalId) {
		clearInterval(typingIntervalId);
		typingIntervalId = null;
	}
}

function typeCommand(command: string, callback: () => void) {
	clearTypingInterval();
	let currentIndex = 0;

	typingIntervalId = setInterval(() => {
		terminalState.commandVisible = command.slice(0, currentIndex + 1);
		currentIndex++;

		if (currentIndex === command.length) {
			clearTypingInterval();
			callback();
		}
	}, TYPING_SPEED);
}

function showOutput(output: string) {
	terminalState.outputVisible = output;
	terminalState.isTyping = false;

	// Move to next command after a delay
	setTimeout(() => {
		if (terminalState.currentCommand < terminalState.commands.length - 1) {
			const nextCommand = terminalState.currentCommand + 1;
			const nextCommandData = terminalState.commands[nextCommand];

			// Mark current command as completed
			terminalState.commands[terminalState.currentCommand] = {
				...terminalState.commands[terminalState.currentCommand],
				completed: true
			};

			// Start typing next command
			typeCommand(nextCommandData.cmd, () => {
				showOutput(nextCommandData.output);
			});

			terminalState.currentCommand = nextCommand;
			terminalState.commandVisible = '';
			terminalState.outputVisible = '';
			terminalState.isTyping = true;
		}
	}, 1000);
}

export const terminal = {
	loadCommands: (newCommands?: Command[]) => {
		clearTypingInterval();
		const commandsToLoad = newCommands || defaultCommands;
		terminalState.commands = [...commandsToLoad];
		terminalState.currentCommand = 0;
		terminalState.commandVisible = '';
		terminalState.outputVisible = '';
		terminalState.isTyping = false;

		if (commandsToLoad.length > 0) {
			terminalState.isTyping = true;
			typeCommand(commandsToLoad[0].cmd, () => {
				showOutput(commandsToLoad[0].output);
			});
		}
	},
	start: () => {
		clearTypingInterval();
		if (terminalState.commands.length > 0) {
			terminalState.isTyping = true;
			typeCommand(terminalState.commands[0].cmd, () => {
				showOutput(terminalState.commands[0].output);
			});
		}
	},
	stop: () => {
		clearTypingInterval();
		terminalState.isTyping = false;
	},
	reset: () => {
		clearTypingInterval();
		terminalState.currentCommand = 0;
		terminalState.commandVisible = '';
		terminalState.outputVisible = '';
		terminalState.isTyping = false;
	}
};
