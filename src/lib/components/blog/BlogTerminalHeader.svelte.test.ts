import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import BlogTerminalHeader from './BlogTerminalHeader.svelte';

describe('BlogTerminalHeader', () => {
	it('should render the terminal path', () => {
		render(BlogTerminalHeader, {
			props: { postCount: 24, lastUpdated: '2025-01-15' }
		});
		expect(screen.getByText('/blog')).toBeTruthy();
	});

	it('should render the command prompt', () => {
		render(BlogTerminalHeader, {
			props: { postCount: 24, lastUpdated: '2025-01-15' }
		});
		expect(screen.getByText(/ls -la \.\/posts/)).toBeTruthy();
	});

	it('should display post count and last updated date', () => {
		render(BlogTerminalHeader, {
			props: { postCount: 24, lastUpdated: '2025-01-15' }
		});
		expect(screen.getByText(/24 articles/)).toBeTruthy();
		expect(screen.getByText(/2025-01-15/)).toBeTruthy();
	});

	it('should have terminal window chrome', () => {
		const { container } = render(BlogTerminalHeader, {
			props: { postCount: 12, lastUpdated: '2025-03-01' }
		});
		expect(container.querySelector('.terminal-header')).toBeTruthy();
		expect(container.querySelector('.terminal-chrome')).toBeTruthy();
	});
});
