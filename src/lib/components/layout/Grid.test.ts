import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Grid from './Grid.svelte';

describe('Grid', () => {
	it('renders with default props', () => {
		const { container } = render(Grid, {
			children: () => 'Test Content'
		});
		const grid = container.querySelector('.grid');
		expect(grid).toBeInTheDocument();
		expect(grid).toHaveStyle({
			'grid-template-columns': 'repeat(1, 1fr)',
			gap: 'var(--ch4)'
		});
		expect(grid?.textContent?.trim()).toBe('Test Content');
	});

	it('renders with custom columns', () => {
		const { container } = render(Grid, {
			cols: 2,
			children: () => 'Grid Content'
		});
		const grid = container.querySelector('.grid');
		expect(grid).toHaveStyle({
			'grid-template-columns': 'repeat(2, 1fr)'
		});
		expect(grid?.textContent?.trim()).toBe('Grid Content');
	});

	it('renders with custom gap', () => {
		const { container } = render(Grid, {
			gap: 2,
			children: () => 'Gap Content'
		});
		const grid = container.querySelector('.grid');
		expect(grid).toHaveStyle({
			gap: 'var(--ch2)'
		});
		expect(grid?.textContent?.trim()).toBe('Gap Content');
	});

	it('renders multiple grid items', () => {
		const { container } = render(Grid, {
			cols: 2,
			children: () => '<div>Item 1</div><div>Item 2</div>'
		});
		const grid = container.querySelector('.grid');
		expect(grid?.querySelectorAll('div')).toHaveLength(2);
		expect(grid?.textContent?.trim()).toBe('Item 1Item 2');
	});
});
