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
		expect(grid).toHaveStyle({
			'--grid-template': 'repeat(1, minmax(0, 1fr))',
			'--grid-gap': '2ch'
		});
		expect(container.textContent).toContain('Grid Item');
	});

	it('renders with custom columns', () => {
		const { container } = render(Grid, {
			props: {
				cols: 3,
				children: () => '<div>Grid Item</div>'
			}
		});
		const grid = container.querySelector('.grid');
		expect(grid).toHaveStyle({
			'--grid-template': 'repeat(3, minmax(0, 1fr))',
			'--grid-gap': '2ch'
		});
	});

	it('renders with custom gap', () => {
		const { container } = render(Grid, {
			props: {
				gap: 4,
				children: () => '<div>Grid Item</div>'
			}
		});
		const grid = container.querySelector('.grid');
		expect(grid).toHaveStyle({
			'--grid-template': 'repeat(1, minmax(0, 1fr))',
			'--grid-gap': '4ch'
		});
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
		expect(container.textContent).toContain('Item 1');
		expect(container.textContent).toContain('Item 2');
		expect(container.textContent).toContain('Item 3');
		expect(container.textContent).toContain('Item 4');
	});
});
