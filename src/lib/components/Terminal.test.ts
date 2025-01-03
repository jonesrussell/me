import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Terminal from './Terminal.svelte';
import { terminal } from '$lib/stores/terminal';

describe('Terminal', () => {
	it('has terminal styling', () => {
		const { container } = render(Terminal);
		const frame = container.querySelector('.terminal-frame');
		const header = container.querySelector('.terminal-header');
		const buttons = container.querySelectorAll('.terminal-buttons span');

		expect(frame).toHaveClass('terminal-frame');
		expect(header).toHaveClass('terminal-header');
		expect(buttons).toHaveLength(3);
	});

	it('has proper command line formatting', () => {
		const { container } = render(Terminal);
		const commandLine = container.querySelector('.command-line');
		const prompt = container.querySelector('.prompt');

		expect(commandLine).toBeInTheDocument();
		expect(prompt?.textContent).toBe('$');
		expect(commandLine).toHaveClass('command-line');
	});

	it('indents command output', () => {
		const { container } = render(Terminal);
		const output = container.querySelector('.command-output');

		expect(output).toHaveStyle({
			'padding-left': 'calc(var(--ch) * 3)'
		});
	});

	it('renders with custom title', () => {
		const { container } = render(Terminal, {
			props: {
				title: '~/projects'
			}
		});

		const title = container.querySelector('.terminal-title');
		expect(title?.textContent).toBe('~/projects');
	});
});
