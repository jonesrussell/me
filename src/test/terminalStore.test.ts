import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { terminal, commands, debug, terminalHeight } from '$lib/stores/terminal';
import { get } from 'svelte/store';

describe('Terminal Store', () => {
	beforeEach(() => {
		terminal.reset();
		commands.set([]);
		debug.set({
			headerHeight: 0,
			padding: 0,
			maxLines: 0,
			rawHeight: 0,
			totalHeight: '',
			currentLines: 0,
			commands: []
		});
		terminalHeight.set('35ch');
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('initializes with correct default state', () => {
		const state = get(terminal);
		expect(state.currentCommand).toBe(0);
		expect(state.commandVisible).toBe('');
		expect(state.outputVisible).toBe('');
		expect(state.isTyping).toBe(false);
	});

	it('loads commands correctly', () => {
		const testCommands = [
			{ cmd: 'test1', output: 'output1' },
			{ cmd: 'test2', output: 'output2' }
		];

		terminal.loadCommands(testCommands);

		expect(get(commands)).toEqual(testCommands);
		expect(get(terminal).isTyping).toBe(true);
	});

	it('types command with correct timing', async () => {
		const testCommands = [
			{ cmd: 'test', output: 'output' }
		];
		terminal.loadCommands(testCommands);
		terminal.start();

		// Wait for the full command to be typed
		vi.advanceTimersByTime(2000);
		await Promise.resolve();

		const state = get(terminal);
		expect(state.commandVisible).toBe('test');
		expect(state.outputVisible).toBe('output');
	});

	it('handles multiple commands sequentially', async () => {
		const testCommands = [
			{ cmd: 'first', output: 'first output' },
			{ cmd: 'second', output: 'second output' }
		];

		terminal.loadCommands(testCommands);
		terminal.start();

		// Wait for first command
		vi.advanceTimersByTime(2000);
		await Promise.resolve();

		// Wait for second command
		vi.advanceTimersByTime(2000);
		await Promise.resolve();

		const state = get(terminal);
		expect(state.currentCommand).toBe(1);
		expect(state.commandVisible).toBe('second');
		expect(state.outputVisible).toBe('second output');
	});

	it('stops typing when stop() is called', () => {
		const testCommands = [
			{ cmd: 'test', output: 'output' }
		];
		terminal.loadCommands(testCommands);
		terminal.start();
		terminal.stop();

		const state = get(terminal);
		expect(state.isTyping).toBe(false);
	});

	it('resets state correctly', () => {
		const testCommands = [
			{ cmd: 'test', output: 'output' }
		];
		terminal.loadCommands(testCommands);
		terminal.start();
		terminal.reset();

		const state = get(terminal);
		expect(state.currentCommand).toBe(0);
		expect(state.commandVisible).toBe('');
		expect(state.outputVisible).toBe('');
		expect(state.isTyping).toBe(false);
	});

	it('updates debug store correctly', () => {
		const debugInfo = {
			headerHeight: 10,
			padding: 5,
			maxLines: 20,
			rawHeight: 30,
			totalHeight: '40ch',
			currentLines: 15,
			commands: [
				{
					cmd: 'test',
					lines: 5,
					height: 10,
					breakdown: 'test breakdown'
				}
			]
		};

		debug.set(debugInfo);

		expect(get(debug)).toEqual(debugInfo);
	});

	it('updates terminal height correctly', () => {
		terminalHeight.set('50ch');
		expect(get(terminalHeight)).toBe('50ch');
	});
});
