import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Menu from './Menu.svelte';

describe('Menu', () => {
	const testItems = ['Home', 'About', 'Contact'];

	it('renders with default props', () => {
		const { container } = render(Menu, {
			props: {
				items: testItems
			}
		});
		const menu = container.querySelector('.menu');
		expect(menu).toBeInTheDocument();

		const items = container.querySelectorAll('.menu-item');
		expect(items).toHaveLength(3);
		expect(items[0]).toHaveClass('selected');
		expect(items[0].textContent).toContain('→ Home');
		expect(items[1].textContent).toContain('  About');
		expect(items[2].textContent).toContain('  Contact');
	});

	it('renders with custom selected item', () => {
		const { container } = render(Menu, {
			props: {
				items: testItems,
				selected: 1
			}
		});
		const items = container.querySelectorAll('.menu-item');
		expect(items[0].textContent).toContain('  Home');
		expect(items[1]).toHaveClass('selected');
		expect(items[1].textContent).toContain('→ About');
		expect(items[2].textContent).toContain('  Contact');
	});

	it('renders empty menu when no items provided', () => {
		const { container } = render(Menu, {
			props: {
				items: []
			}
		});
		const items = container.querySelectorAll('.menu-item');
		expect(items).toHaveLength(0);
	});

	it('handles invalid selected index', () => {
		const { container } = render(Menu, {
			props: {
				items: testItems,
				selected: 5
			}
		});
		const items = container.querySelectorAll('.menu-item');
		expect(items).toHaveLength(3);
		// No item should have the arrow when selected index is invalid
		expect(container.textContent).not.toContain('→');
	});
});
