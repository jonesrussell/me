import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import MobileNav from './MobileNav.svelte';

describe('MobileNav', () => {
	beforeEach(() => {
		// Mock window.location
		delete window.location;
		window.location = new URL('http://localhost/blog') as Location;
	});

	it('renders navigation items', () => {
		const { container } = render(MobileNav, {
			props: {
				url: new URL('http://localhost/blog'),
				isOpen: true,
				toggleMenu: () => {}
			}
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
			props: {
				url: new URL('http://localhost/blog'),
				isOpen: true,
				toggleMenu: () => {}
			}
		});
		const activeLink = container.querySelector('a.active');
		expect(activeLink).toBeInTheDocument();
		expect(activeLink?.textContent).toBe('Blog');
	});

	it('updates active item when URL changes', () => {
		const { container } = render(MobileNav, {
			props: {
				url: new URL('http://localhost/projects'),
				isOpen: true,
				toggleMenu: () => {}
			}
		});
		const activeLink = container.querySelector('a.active');
		expect(activeLink).toBeInTheDocument();
		expect(activeLink?.textContent).toBe('Projects');
	});

	it('toggles menu when link is clicked', () => {
		const toggleMenu = vi.fn();
		const { container } = render(MobileNav, {
			props: {
				url: new URL('http://localhost/blog'),
				isOpen: true,
				toggleMenu
			}
		});
		const link = container.querySelector('a');
		if (link) {
			const clickEvent = new MouseEvent('click', {
				bubbles: true,
				cancelable: true
			});
			link.dispatchEvent(clickEvent);
		}
		expect(toggleMenu).toHaveBeenCalled();
	});
});
