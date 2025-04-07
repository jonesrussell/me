import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import MobileNav from './MobileNav.svelte';

describe('MobileNav', () => {
	it('renders navigation items', () => {
		const { container } = render(MobileNav, {
			url: new URL('http://localhost/blog'),
			isOpen: true,
			toggleMenu: () => {}
		});
		const nav = container.querySelector('.mobile-nav');
		expect(nav).toBeInTheDocument();

		const navLinks = nav?.querySelectorAll('a');
		expect(navLinks).toHaveLength(4);

		const linkTexts = Array.from(navLinks || []).map(
			(link) => link.textContent
		);
		expect(linkTexts).toEqual(['Blog', 'Projects', 'Resources', 'Contact']);
	});

	it('marks active navigation item', () => {
		const { container } = render(MobileNav, {
			url: new URL('http://localhost/blog'),
			isOpen: true,
			toggleMenu: () => {}
		});
		const activeLink = container.querySelector('a.active');
		expect(activeLink).toBeInTheDocument();
		expect(activeLink?.textContent).toBe('Blog');
	});

	it('updates active item when URL changes', () => {
		const { container } = render(MobileNav, {
			url: new URL('http://localhost/projects'),
			isOpen: true,
			toggleMenu: () => {}
		});
		const activeLink = container.querySelector('a.active');
		expect(activeLink).toBeInTheDocument();
		expect(activeLink?.textContent).toBe('Projects');
	});

	it('toggles menu when link is clicked', () => {
		const toggleMenu = vi.fn();
		const { container } = render(MobileNav, {
			url: new URL('http://localhost/blog'),
			isOpen: true,
			toggleMenu
		});
		const link = container.querySelector('a');
		link?.click();
		expect(toggleMenu).toHaveBeenCalled();
	});
});
