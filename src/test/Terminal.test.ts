import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Terminal from '$lib/components/terminal/Terminal.svelte';
import { terminal, commands } from '$lib/stores/terminal';

describe('Terminal Component', () => {
	beforeEach(() => {
		terminal.reset();
		commands.set([]);
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('renders with default title', () => {
		render(Terminal);
		expect(screen.getByText('~/developer')).toBeInTheDocument();
	});

	it('renders with custom title', () => {
		render(Terminal, { title: 'custom-terminal' });
		expect(screen.getByText('custom-terminal')).toBeInTheDocument();
	});

	it('displays terminal buttons', () => {
		render(Terminal);
		const buttonsContainer = document.querySelector('.terminal-buttons');
		expect(buttonsContainer).toBeInTheDocument();
		const buttons = buttonsContainer?.querySelectorAll('span');
		expect(buttons?.length).toBe(3);
	});

	it('shows initial command when loaded', async () => {
		const testCommands = [
			{ cmd: 'test', output: 'test output' }
		];
		commands.set(testCommands);
		terminal.loadCommands(testCommands);

		render(Terminal);

		// Fast-forward timers
		vi.advanceTimersByTime(1000);
		await Promise.resolve();

		expect(screen.getByText('$')).toBeInTheDocument();
		const commandSpan = document.querySelector('.command');
		expect(commandSpan).toHaveTextContent('test');
	});

	it('handles multiple commands sequentially', async () => {
		const testCommands = [
			{ cmd: 'first', output: 'first output' },
			{ cmd: 'second', output: 'second output' }
		];
		commands.set(testCommands);
		terminal.loadCommands(testCommands);

		render(Terminal);

		// Fast-forward timers for first command
		vi.advanceTimersByTime(1000);
		await Promise.resolve();

		// Fast-forward timers for second command
		vi.advanceTimersByTime(1000);
		await Promise.resolve();

		const commandSpans = document.querySelectorAll('.command');
		expect(commandSpans[0]).toHaveTextContent('first');
		expect(screen.getByText('first output')).toBeInTheDocument();
		expect(commandSpans[1]).toHaveTextContent('second');
		expect(screen.getByText('second output')).toBeInTheDocument();
	});

	it('stops typing when component is unmounted', () => {
		const { unmount } = render(Terminal);
		const stopSpy = vi.spyOn(terminal, 'stop');

		unmount();

		expect(stopSpy).toHaveBeenCalled();
	});

	it('applies correct styling classes', () => {
		render(Terminal);
		const frame = document.querySelector('.terminal-frame');
		expect(frame).toHaveClass('terminal-frame');
	});
});
