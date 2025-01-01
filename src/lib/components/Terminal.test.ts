import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Terminal from './Terminal.svelte';

describe('Terminal', () => {
	it('renders with default props', () => {
		const { container } = render(Terminal, {
			props: {
				children: () => 'Terminal output'
			}
		});
		const terminal = container.querySelector('.terminal-frame');
		expect(terminal).toBeInTheDocument();
		
		const title = container.querySelector('.terminal-title');
		expect(title?.textContent).toBe('~/developer');
		
		const command = container.querySelector('.command');
		expect(command?.textContent).toBe('whoami');
	});

	it('renders with custom title and command', () => {
		const { container } = render(Terminal, {
			props: {
				title: '~/projects',
				command: 'ls -la',
				children: () => 'Directory listing'
			}
		});
		
		const title = container.querySelector('.terminal-title');
		expect(title?.textContent).toBe('~/projects');
		
		const command = container.querySelector('.command');
		expect(command?.textContent).toBe('ls -la');
	});

	it('renders command output', () => {
		const output = 'total 20\ndrwxr-xr-x  3 user  group  96 Jan 1 12:34 .';
		const { container } = render(Terminal, {
			props: {
				children: () => output
			}
		});
		
		const commandOutput = container.querySelector('.command-output');
		expect(commandOutput?.textContent).toBe(output);
	});

	it('has terminal styling', () => {
		const { container } = render(Terminal);
		const frame = container.querySelector('.terminal-frame');
		const header = container.querySelector('.terminal-header');
		const buttons = container.querySelectorAll('.terminal-buttons span');
		
		expect(frame).toHaveStyle({
			background: 'var(--bg-color)',
			'border-radius': '8px'
		});
		
		expect(header).toHaveStyle({
			'border-bottom': '1px solid var(--border-color)'
		});
		
		expect(buttons).toHaveLength(3);
	});

	it('has proper command line formatting', () => {
		const { container } = render(Terminal);
		const commandLine = container.querySelector('.command-line');
		const prompt = container.querySelector('.prompt');
		
		expect(commandLine).toBeInTheDocument();
		expect(prompt?.textContent).toBe('$');
		expect(commandLine).toHaveStyle({
			display: 'flex',
			gap: 'var(--ch)'
		});
	});

	it('indents command output', () => {
		const { container } = render(Terminal);
		const output = container.querySelector('.command-output');
		
		expect(output).toHaveStyle({
			'padding-left': 'calc(var(--ch) * 2)'
		});
	});
}); 