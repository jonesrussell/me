import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Header from './Header.svelte';

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
		const { container } = render(Header, {
			url: { pathname: '/blog' }
		});
		const activeLink = container.querySelector('a.active');
		expect(activeLink).toBeInTheDocument();
		expect(activeLink?.textContent).toBe('Blog');
	});

	it('renders subtitle', () => {
		const { container } = render(Header);
		const subtitle = container.querySelector('.subtitle-bar');
		expect(subtitle).toBeInTheDocument();
		expect(subtitle?.textContent?.trim()).toBe(
			'Building elegant solutions with modern web technologies'
		);
	});

	it('has sticky positioning', () => {
		const { container } = render(Header);
		const header = container.querySelector('.site-header');
		expect(header).toBeInTheDocument();
		expect(header).toHaveClass('site-header');
	});
});
