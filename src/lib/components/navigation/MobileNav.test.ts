import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import MobileNav from './MobileNav.svelte';

vi.mock('$app/state', () => ({
	page: {
		url: new URL('http://localhost/')
	}
}));

describe('MobileNav', () => {
	it('renders navigation links', () => {
		const { getByText } = render(MobileNav, {
			isOpen: true,
			toggleMenu: () => {}
		});
		expect(getByText('Blog')).toBeTruthy();
		expect(getByText('Projects')).toBeTruthy();
		expect(getByText('Resources')).toBeTruthy();
		expect(getByText('Contact')).toBeTruthy();
	});

	it('marks active navigation item', () => {
		const { getByText } = render(MobileNav, {
			url: new URL('http://localhost/blog'),
			isOpen: true,
			toggleMenu: () => {}
		});
		const blogLink = getByText('Blog');
		expect(blogLink.classList.contains('active')).toBe(true);
	});

	it('calls toggleMenu when link is clicked', () => {
		const toggleMenu = vi.fn();
		const { getByText } = render(MobileNav, {
			isOpen: true,
			toggleMenu
		});
		fireEvent.click(getByText('Blog'));
		expect(toggleMenu).toHaveBeenCalled();
	});
});
