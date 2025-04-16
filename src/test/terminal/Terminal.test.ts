import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import Terminal from '$lib/components/terminal/Terminal.svelte';
import { terminal, commands } from '$lib/stores/terminal';

describe('Terminal', () => {
	describe('Basic Rendering', () => {
		it('renders with terminal styling', () => {
			render(Terminal, { props: { command: 'test' } });
			const terminal = screen.getByRole('log');
			expect(terminal).toHaveClass('terminal');
		});

		it('formats command line correctly', () => {
			render(Terminal, { props: { command: 'test' } });
			const command = screen.getByText('$ test');
			expect(command).toBeInTheDocument();
		});

		it('indents command output', () => {
			render(Terminal, { props: { command: 'test', output: 'output' } });
			const output = screen.getByText('output');
			const style = window.getComputedStyle(output);
			expect(style.marginLeft).toBe('var(--space-4)');
		});

		it('renders with custom title', () => {
			render(Terminal, { props: { command: 'test', title: 'Custom Title' } });
			const title = screen.getByText('Custom Title');
			expect(title).toBeInTheDocument();
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

			render(Terminal);
			vi.advanceTimersByTime(1000);
			await Promise.resolve();

			const prompt = screen.getByText('$');
			expect(prompt).toBeInTheDocument();

			const command = screen.getByText('test');
			expect(command).toBeInTheDocument();
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
			render(Terminal, { props: { command: 'test' } });
			const terminal = screen.getByRole('log', { name: 'Terminal output' });
			expect(terminal).toBeInTheDocument();
		});

		it('maintains proper heading structure', () => {
			render(Terminal, { props: { command: 'test', title: 'Test Terminal' } });
			const title = screen.getByText('Test Terminal');
			expect(title).toBeInTheDocument();
		});
	});
});
