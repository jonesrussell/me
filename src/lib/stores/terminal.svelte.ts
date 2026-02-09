export type Pane = 'left' | 'right';

export type Command = {
	cmd: string;
	output: string;
	completed?: boolean;
	pane?: Pane;
};

const TYPING_SPEED = 50;
const SPLIT_OPEN_DELAY_MS = 800;

// Initial commands: whoami and man russell in left pane; cat skills.json in right (after split)
const defaultCommands: Command[] = [
	{
		cmd: 'whoami',
		output: 'russell',
		pane: 'left'
	},
	{
		cmd: 'man russell | grep -A5 "^SYNOPSIS"',
		output: `SYNOPSIS
       russell [--build] [--innovate] [--ship] <solution>

DESCRIPTION
       No limits. An expert Software Developer crafting elegant solutions using modern technologies.
       Specializes in PHP, TypeScript, Go, and Cloud Architecture.`,
		pane: 'left'
	},
	{
		cmd: 'cat skills.json',
		output: `{
  "languages": ["TypeScript", "Go", "PHP", "SQL"],
  "frontend":  ["Svelte", "React", "CSS Architecture"],
  "backend":   ["REST APIs", "Microservices", "Event-Driven"],
  "devops":    ["Docker", "CI/CD", "Cloud (AWS/GCP)"],
  "status":    "always learning"
}`,
		pane: 'right'
	}
];

export const terminalState = $state({
	commands: [...defaultCommands] as Command[],
	currentCommand: 0,
	commandVisible: '',
	outputVisible: '',
	isTyping: false,
	splitOpen: false,
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

	const currentIndex = terminalState.currentCommand;
	const nextIndex = currentIndex + 1;
	const hasNext = nextIndex < terminalState.commands.length;
	const nextCommandData = hasNext ? terminalState.commands[nextIndex] : null;
	const nextIsRightPane = nextCommandData?.pane === 'right';

	// Mark current command as completed (replace array for reactivity)
	terminalState.commands = terminalState.commands.map((c, i) =>
		i === currentIndex ? { ...c, completed: true } : c
	);

	// When moving to a right-pane command, open split first (delay), then type
	const delayBeforeNext = nextIsRightPane ? SPLIT_OPEN_DELAY_MS : 1000;

	setTimeout(() => {
		if (!hasNext || !nextCommandData) return;

		if (nextIsRightPane) {
			terminalState.splitOpen = true;
		}

		typeCommand(nextCommandData.cmd, () => {
			showOutput(nextCommandData.output);
		});

		terminalState.currentCommand = nextIndex;
		terminalState.commandVisible = '';
		terminalState.outputVisible = '';
		terminalState.isTyping = true;
	}, delayBeforeNext);
}

export const terminal = {
	loadCommands: (newCommands?: Command[]) => {
		clearTypingInterval();
		const commandsToLoad = newCommands || defaultCommands;
		terminalState.commands = [...commandsToLoad];
		terminalState.currentCommand = 0;
		terminalState.commandVisible = '';
		terminalState.outputVisible = '';
		terminalState.splitOpen = false;
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
		terminalState.splitOpen = false;
		terminalState.isTyping = false;
	}
};
