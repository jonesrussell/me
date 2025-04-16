import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import Terminal from '$lib/components/terminal/Terminal.svelte';
import { terminal, commands } from '$lib/stores/terminal';

describe('Terminal', () => {
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
		const title = document.querySelector('.terminal-title');
		expect(title).toBeInTheDocument();
		expect(title?.textContent).toBe('~/developer');
	});

	it('renders with custom title', () => {
		render(Terminal, { title: 'custom-terminal' });
		const title = document.querySelector('.terminal-title');
		expect(title).toBeInTheDocument();
		expect(title?.textContent).toBe('custom-terminal');
	});

	it('displays terminal buttons', () => {
		render(Terminal);
		const buttonsContainer = document.querySelector('.terminal-buttons');
		expect(buttonsContainer).toBeInTheDocument();
		const buttons = buttonsContainer?.querySelectorAll('span');
		expect(buttons?.length).toBe(3);
	});

	it('shows initial command when loaded', async () => {
		const testCommands = [{ cmd: 'test', output: 'test output' }];
		commands.set(testCommands);
		terminal.loadCommands(testCommands);

		render(Terminal);
		vi.advanceTimersByTime(1000);
		await Promise.resolve();

		const prompt = document.querySelector('.prompt');
		expect(prompt).toBeInTheDocument();
		expect(prompt?.textContent).toBe('$');

		const command = document.querySelector('.command');
		expect(command).toBeInTheDocument();
		expect(command?.textContent).toBe('test');
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
		expect(frame).toBeInTheDocument();
		expect(frame).toHaveClass('terminal-frame');
	});
});
