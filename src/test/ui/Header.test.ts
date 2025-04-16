import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Header from '$lib/components/ui/Header.svelte';

// Mock SvelteKit stores
vi.mock('$app/stores', () => ({
	page: {
		subscribe: (fn: (value: { url: URL }) => void) => {
			fn({ url: new URL('https://jonesrussell.github.io/me/') });
			return () => {};
		}
	}
}));

vi.mock('$app/state', () => ({
	page: {
		url: new URL('https://jonesrussell.github.io/me/')
	}
}));

vi.mock('$app/paths', () => ({
	base: '/me'
}));

describe('Header', () => {
	const mockUrl = new URL('https://jonesrussell.github.io/me/');

	it('renders site title', () => {
		const { container } = render(Header, { url: mockUrl });
		const title = container.querySelector('.title');
		if (!title) throw new Error('Title element not found');
		expect(title.textContent).toBe('Russell Jones');
		expect(title.getAttribute('href')).toBe('/me');
	});

	it('renders navigation items', () => {
		const { container } = render(Header, { url: mockUrl });
		const nav = container.querySelector('.desktop-nav');
		if (!nav) throw new Error('Navigation element not found');

		const navLinks = nav.querySelectorAll('a');
		expect(navLinks).toHaveLength(4);

		const linkTexts = Array.from(navLinks).map(link => link.textContent);
		expect(linkTexts).toEqual(['Blog', 'Projects', 'Resources', 'Contact']);
	});

	it('marks active navigation item', async () => {
		const blogUrl = new URL('https://jonesrussell.github.io/me/blog');
		const { container } = render(Header, {
			url: blogUrl
		});

		await waitFor(
			() => {
				const activeLink = container.querySelector('.desktop-nav a[href="/me/blog"]');
				if (!activeLink) throw new Error('Active link not found');
				expect(activeLink.classList.contains('active')).toBe(true);
				expect(activeLink.textContent).toBe('Blog');
			},
			{ timeout: 1000 }
		);
	});

	it('renders subtitle', () => {
		const { container } = render(Header, { url: mockUrl });
		const subtitle = container.querySelector('.subtitle-bar');
		if (!subtitle) throw new Error('Subtitle element not found');
		expect(subtitle.textContent?.trim()).toBe(
			'Building elegant solutions with modern web technologies'
		);
	});

	it('has sticky positioning', () => {
		const { container } = render(Header, { url: mockUrl });
		const header = container.querySelector('.site-header');
		if (!header) throw new Error('Header element not found');
		expect(header).toHaveClass('site-header');
	});

	it('renders header with navigation', () => {
		const { container } = render(Header);
		const desktopNav = container.querySelector('.desktop-nav');
		const mobileNav = container.querySelector('.mobile-nav');

		if (!desktopNav) throw new Error('Desktop navigation not found');
		if (!mobileNav) throw new Error('Mobile navigation not found');

		// Check desktop nav links
		const desktopLinks = desktopNav.querySelectorAll('a');
		expect(desktopLinks).toHaveLength(4);
		const desktopTexts = Array.from(desktopLinks).map(link => link.textContent);
		expect(desktopTexts).toEqual(['Blog', 'Projects', 'Resources', 'Contact']);

		// Check mobile nav links
		const mobileLinks = mobileNav.querySelectorAll('a');
		expect(mobileLinks).toHaveLength(4);
		const mobileTexts = Array.from(mobileLinks).map(link => link.textContent);
		expect(mobileTexts).toEqual(['Blog', 'Projects', 'Resources', 'Contact']);
	});
});
