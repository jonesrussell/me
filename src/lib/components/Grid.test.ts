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
		expect(container.textContent?.replace(/\s+/g, ' ').trim()).toContain(
			'Item 1 Item 2 Item 3 Item 4'
		);
	});
});
