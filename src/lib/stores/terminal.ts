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
				store.update(s => ({ ...s, commandVisible: command.cmd.slice(0, cmdIndex) }));
				cmdIndex++;
			} else {
				if (currentInterval) clearInterval(currentInterval);
				// Show output instantly
				store.update(s => ({ ...s, outputVisible: command.output }));
				
				if (state.currentCommand < commands.length - 1) {
					setTimeout(() => {
						cmdIndex = 0;
						store.update(s => ({
							...s,
							currentCommand: s.currentCommand + 1,
							commandVisible: '',
							outputVisible: ''
						}));
						typeNextCommand();
					}, 1000);
				} else {
					store.update(s => ({ ...s, isTyping: false }));
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
export const terminalHeight = derived(terminal, $terminal => {
	const currentOutput = commands[$terminal.currentCommand]?.output || '';
	const lines = currentOutput.split('\n').length;
	return `${(lines + 4) * 1.5}ch`;
}); 