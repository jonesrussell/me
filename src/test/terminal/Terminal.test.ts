import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Terminal from '$lib/components/terminal/Terminal.svelte';

describe('Terminal', () => {
	it('has terminal styling', () => {
		const { container } = render(Terminal);
		const terminal = container.querySelector('.terminal-frame');
		expect(terminal).toBeInTheDocument();
		expect(terminal).toHaveClass('terminal-frame');
	});

	it('has proper command line formatting', () => {
		const { container } = render(Terminal);
		const commandLine = container.querySelector('.command-line');
		expect(commandLine).toBeInTheDocument();
		expect(commandLine?.querySelector('.prompt')).toBeInTheDocument();
		expect(commandLine?.querySelector('.command')).toBeInTheDocument();
	});

	it('indents command output', () => {
		const { container } = render(Terminal);
		const output = container.querySelector('.command-output');
		expect(output).toBeInTheDocument();
		expect(output).toHaveStyle({
			'margin-left': 'var(--space-4)'
		});
	});

	it('renders with custom title', () => {
		const { container } = render(Terminal, {
			title: 'Custom Terminal'
		});
		const title = container.querySelector('.terminal-title');
		expect(title).toBeInTheDocument();
		expect(title?.textContent).toBe('Custom Terminal');
	});
});
