import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import DesktopNav from './DesktopNav.svelte';

describe('DesktopNav', () => {
	it('renders navigation items', () => {
		const { container } = render(DesktopNav, {
			url: new URL('http://localhost/blog')
		});
		const nav = container.querySelector('.desktop-nav');
		expect(nav).toBeInTheDocument();

		const navLinks = nav?.querySelectorAll('a');
		expect(navLinks).toHaveLength(4);

		const linkTexts = Array.from(navLinks || []).map(
			(link) => link.textContent
		);
		expect(linkTexts).toEqual(['Blog', 'Projects', 'Resources', 'Contact']);
	});

	it('marks active navigation item', () => {
		const { container } = render(DesktopNav, {
			url: new URL('http://localhost/blog')
		});
		const activeLink = container.querySelector('a.active');
		expect(activeLink).toBeInTheDocument();
		expect(activeLink?.textContent).toBe('Blog');
	});

	it('updates active item when URL changes', () => {
		const { container } = render(DesktopNav, {
			url: new URL('http://localhost/projects')
		});
		const activeLink = container.querySelector('a.active');
		expect(activeLink).toBeInTheDocument();
		expect(activeLink?.textContent).toBe('Projects');
	});
});
