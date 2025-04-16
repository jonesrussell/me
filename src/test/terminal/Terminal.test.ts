import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/svelte';
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import Terminal from '$lib/components/terminal/Terminal.svelte';
import { terminal, commands } from '$lib/stores/terminal';

describe('Terminal', () => {
	describe('Basic Rendering', () => {
		it('renders with terminal styling', () => {
			const { container } = render(Terminal, { props: { command: 'test' } });
			const terminal = container.querySelector('.terminal');
			expect(terminal).toBeInTheDocument();
		});

		it('formats command line correctly', () => {
			const { container } = render(Terminal, { props: { command: 'test' } });
			const prompt = container.querySelector('.prompt');
			const command = container.querySelector('.command');
			expect(prompt?.textContent).toBe('$');
			expect(command?.textContent).toBe('test');
		});

		it('indents command output', () => {
			const { container } = render(Terminal, { props: { command: 'test', output: 'output' } });
			const output = container.querySelector('.command-output');
			expect(output).toBeInTheDocument();
			expect(output?.textContent).toBe('output');
		});

		it('renders with default title', () => {
			const { container } = render(Terminal, { props: { command: 'test' } });
			const title = container.querySelector('.terminal-title');
			expect(title?.textContent).toBe('Terminal');
		});

		it('renders with custom title', () => {
			const { container } = render(Terminal, { props: { command: 'test', title: 'Custom Title' } });
			const title = container.querySelector('.terminal-title');
			expect(title?.textContent).toBe('Custom Title');
		});
	});

	describe('Store Integration', () => {
		beforeEach(() => {
			terminal.reset();
			commands.set([]);
			vi.useFakeTimers();
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it('shows initial command when loaded', async () => {
			const testCommands = [{ cmd: 'test', output: 'test output' }];
			commands.set(testCommands);
			terminal.loadCommands(testCommands);

			const { container } = render(Terminal, { props: { command: 'test' } });
			vi.advanceTimersByTime(1000);
			await Promise.resolve();

			const prompt = container.querySelector('.prompt');
			const command = container.querySelector('.command');
			expect(prompt?.textContent).toBe('$');
			expect(command?.textContent).toBe('test');
		});

		it('stops typing when component is unmounted', () => {
			const { unmount } = render(Terminal);
			const stopSpy = vi.spyOn(terminal, 'stop');

			unmount();

			expect(stopSpy).toHaveBeenCalled();
		});
	});

	describe('Accessibility', () => {
		it('has proper ARIA role and label', () => {
			const { container } = render(Terminal, { props: { command: 'test' } });
			const terminal = container.querySelector('.terminal');
			expect(terminal).toHaveAttribute('role', 'log');
			expect(terminal).toHaveAttribute('aria-label', 'Terminal output');
		});

		it('maintains proper heading structure', () => {
			const { container } = render(Terminal, { props: { command: 'test', title: 'Test Terminal' } });
			const title = container.querySelector('.terminal-title');
			expect(title?.textContent).toBe('Test Terminal');
		});
	});
});
