import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Grid from './Grid.svelte';

describe('Grid', () => {
	it('renders with default props', () => {
		const { container } = render(Grid, {
			props: {
				children: () => '<div>Grid Item</div>'
			}
		});
		const grid = container.querySelector('.grid');
		expect(grid).toBeInTheDocument();
		expect(grid).toHaveClass('grid');
		expect(grid?.textContent?.trim()).toContain('Grid Item');
	});

	it('renders with custom columns', () => {
		const { container } = render(Grid, {
			props: {
				cols: 3,
				children: () => '<div>Grid Item</div>'
			}
		});
		const grid = container.querySelector('.grid');
		expect(grid).toBeInTheDocument();
		expect(grid).toHaveClass('grid');
		expect(grid?.textContent?.trim()).toContain('Grid Item');
		expect(grid).toHaveStyle({ '--cols': '3' });
	});

	it('renders with custom gap', () => {
		const { container } = render(Grid, {
			props: {
				gap: 4,
				children: () => '<div>Grid Item</div>'
			}
		});
		const grid = container.querySelector('.grid');
		expect(grid).toBeInTheDocument();
		expect(grid).toHaveClass('grid');
		expect(grid?.textContent?.trim()).toContain('Grid Item');
		expect(grid).toHaveStyle({ '--gap': 'var(--ch4)' });
	});

	it('renders multiple grid items', () => {
		const { container } = render(Grid, {
			props: {
				cols: 2,
				children: () => `
					<div>Item 1</div>
					<div>Item 2</div>
					<div>Item 3</div>
					<div>Item 4</div>
				`
			}
		});
		const grid = container.querySelector('.grid');
		expect(grid).toBeInTheDocument();
		expect(grid).toHaveClass('grid');
		expect(grid?.textContent?.trim()).toContain('Item 1');
		expect(grid?.textContent?.trim()).toContain('Item 2');
		expect(grid?.textContent?.trim()).toContain('Item 3');
		expect(grid?.textContent?.trim()).toContain('Item 4');
	});
});
