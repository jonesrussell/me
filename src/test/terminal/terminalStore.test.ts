import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { get } from 'svelte/store';
import { terminal, commands } from '$lib/stores/terminal.svelte';

describe('Terminal Store', () => {
	beforeEach(() => {
		terminal.reset();
		commands.set([]);
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
		const testCommands = [{ cmd: 'test', output: 'test output' }];
		commands.set(testCommands);
		terminal.loadCommands(testCommands);
		terminal.stop(); // Ensure typing is stopped after loading commands

		const state = get(terminal);
		expect(state.currentCommand).toBe(0);
		expect(state.commandVisible).toBe('');
		expect(state.outputVisible).toBe('');
		expect(state.isTyping).toBe(false);
	});

	it('types command with correct timing', async () => {
		const testCommands = [{ cmd: 'test', output: 'test output' }];
		commands.set(testCommands);
		terminal.loadCommands(testCommands);

		// Start typing
		terminal.start();

		// Advance timers for each character
		for (let i = 0; i < 'test'.length; i++) {
			vi.advanceTimersByTime(50);
			await Promise.resolve();
		}

		const state = get(terminal);
		expect(state.commandVisible).toBe('test');
		expect(state.outputVisible).toBe('test output');
	});

	it('stops typing when stop() is called', () => {
		terminal.stop();
		const state = get(terminal);
		expect(state.isTyping).toBe(false);
	});

	it('resets state correctly', () => {
		terminal.reset();
		const state = get(terminal);
		expect(state.currentCommand).toBe(0);
		expect(state.commandVisible).toBe('');
		expect(state.outputVisible).toBe('');
		expect(state.isTyping).toBe(false);
	});
});
