import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Header from './Header.svelte';

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
		expect(title).toBeInTheDocument();
		expect(title?.textContent).toBe('Russell Jones');
		expect(title?.getAttribute('href')).toBe('/');
	});

	it('renders navigation items', () => {
		const { container } = render(Header, { url: mockUrl });
		const nav = container.querySelector('.desktop-nav');
		expect(nav).toBeInTheDocument();

		const navLinks = nav?.querySelectorAll('a');
		expect(navLinks).toHaveLength(4);

		const linkTexts = Array.from(navLinks || []).map(link => link.textContent);
		expect(linkTexts).toEqual(['Blog', 'Projects', 'Resources', 'Contact']);
	});

	it('marks active navigation item', async () => {
		const blogUrl = new URL('https://jonesrussell.github.io/me/blog');
		const { container } = render(Header, {
			url: blogUrl
		});

		await waitFor(
			() => {
				const activeLink = container.querySelector('.desktop-nav a[href="/blog"]');
				expect(activeLink).toBeInTheDocument();
				expect(activeLink?.classList.contains('active')).toBe(true);
				expect(activeLink?.textContent).toBe('Blog');
			},
			{ timeout: 1000 }
		);
	});

	it('renders subtitle', () => {
		const { container } = render(Header, { url: mockUrl });
		const subtitle = container.querySelector('.subtitle-bar');
		expect(subtitle).toBeInTheDocument();
		expect(subtitle?.textContent?.trim()).toBe(
			'Building elegant solutions with modern web technologies'
		);
	});

	it('has sticky positioning', () => {
		const { container } = render(Header, { url: mockUrl });
		const header = container.querySelector('.site-header');
		expect(header).toBeInTheDocument();
		expect(header).toHaveClass('site-header');
	});

	it('renders header with navigation', () => {
		const { getAllByText } = render(Header);
		const blogLinks = getAllByText('Blog');
		expect(blogLinks).toHaveLength(2); // One in desktop nav, one in mobile nav
		expect(getAllByText('Projects')).toHaveLength(2);
		expect(getAllByText('Resources')).toHaveLength(2);
		expect(getAllByText('Contact')).toHaveLength(2);
	});
});
