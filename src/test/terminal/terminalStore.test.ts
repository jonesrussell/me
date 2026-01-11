import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { terminalState, terminal } from '$lib/stores/terminal.svelte';

describe('Terminal Store', () => {
	beforeEach(() => {
		terminal.reset();
		terminalState.commands = [];
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('initializes with correct default state', () => {
		expect(terminalState.currentCommand).toBe(0);
		expect(terminalState.commandVisible).toBe('');
		expect(terminalState.outputVisible).toBe('');
		expect(terminalState.isTyping).toBe(false);
	});

	it('loads commands correctly', () => {
		const testCommands = [{ cmd: 'test', output: 'test output' }];
		terminal.loadCommands(testCommands);
		terminal.stop(); // Ensure typing is stopped after loading commands

		expect(terminalState.currentCommand).toBe(0);
		expect(terminalState.commandVisible).toBe('');
		expect(terminalState.outputVisible).toBe('');
		expect(terminalState.isTyping).toBe(false);
		expect(terminalState.commands).toHaveLength(1);
	});

	it('types command with correct timing', async () => {
		const testCommands = [{ cmd: 'test', output: 'test output' }];
		terminal.loadCommands(testCommands);

		// Start typing
		terminal.start();

		// Advance timers for each character
		for (let i = 0; i < 'test'.length; i++) {
			vi.advanceTimersByTime(50);
			await Promise.resolve();
		}

		expect(terminalState.commandVisible).toBe('test');
	});
});
