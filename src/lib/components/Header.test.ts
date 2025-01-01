import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Header from './Header.svelte';

// Mock $app/paths and $app/stores
vi.mock('$app/paths', () => ({
	base: ''
}));

vi.mock('$app/stores', () => ({
	page: {
		subscribe: (fn: (value: any) => void) => {
			fn({ url: { pathname: '/blog' } });
			return () => {};
		}
	}
}));

describe('Header', () => {
	it('renders site title', () => {
		const { container } = render(Header);
		const title = container.querySelector('.title');
		expect(title).toBeInTheDocument();
		expect(title?.textContent).toBe('Russell Jones');
		expect(title?.getAttribute('href')).toBe('/');
	});

	it('renders navigation items', () => {
		const { container } = render(Header);
		const nav = container.querySelector('.header-nav');
		expect(nav).toBeInTheDocument();

		const navLinks = nav?.querySelectorAll('a');
		expect(navLinks).toHaveLength(4);

		const linkTexts = Array.from(navLinks || []).map(
			(link) => link.textContent
		);
		expect(linkTexts).toEqual(['Blog', 'Projects', 'Resources', 'Contact']);
	});

	it('marks active navigation item', () => {
		const { container } = render(Header);
		const activeLink = container.querySelector('a.active');
		expect(activeLink).toBeInTheDocument();
		expect(activeLink?.textContent).toBe('Blog');
		expect(activeLink?.getAttribute('aria-current')).toBe('page');
	});

	it('renders subtitle', () => {
		const { container } = render(Header);
		const subtitle = container.querySelector('.subtitle-bar');
		expect(subtitle).toBeInTheDocument();
		expect(subtitle?.textContent).toBe('Limitless Developer');
	});

	it('has sticky positioning', () => {
		const { container } = render(Header);
		const header = container.querySelector('.site-header');
		expect(header).toBeInTheDocument();
		expect(header).toHaveClass('site-header');
	});
});
