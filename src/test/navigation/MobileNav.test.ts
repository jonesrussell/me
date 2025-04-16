import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import MobileNav from '$lib/components/navigation/MobileNav.svelte';

// Mock SvelteKit's navigation features
vi.mock('$app/state', () => ({
	page: {
		url: new URL('http://localhost/')
	}
}));

vi.mock('$app/paths', () => ({
	base: ''
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

		// Prevent default navigation behavior
		const blogLink = getByText('Blog');
		blogLink.addEventListener('click', e => e.preventDefault());

		fireEvent.click(blogLink);
		expect(toggleMenu).toHaveBeenCalled();
	});
});
