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
		expect(grid?.innerHTML?.trim()).toBe('<div>Grid Item</div>');
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
		expect(grid?.innerHTML?.trim()).toBe('<div>Grid Item</div>');
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
		expect(grid?.innerHTML?.trim()).toBe('<div>Grid Item</div>');
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
		const items = grid?.querySelectorAll('div');
		expect(items?.length).toBe(4);
		expect(items?.[0]?.textContent?.trim()).toBe('Item 1');
		expect(items?.[1]?.textContent?.trim()).toBe('Item 2');
		expect(items?.[2]?.textContent?.trim()).toBe('Item 3');
		expect(items?.[3]?.textContent?.trim()).toBe('Item 4');
	});
});
