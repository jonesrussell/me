import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Navigation from '$lib/components/navigation/Navigation.svelte';

describe('Navigation Component', () => {
	const testLinks = [
		{
			href: '/test1',
			icon: '📝',
			text: 'Test Link 1'
		},
		{
			href: '/test2',
			icon: '🚀',
			text: 'Test Link 2'
		}
	];

	it('renders all navigation links', () => {
		render(Navigation, { links: testLinks });

		testLinks.forEach((link) => {
			const navLink = screen.getByText(link.text).closest('a');
			expect(navLink).toHaveAttribute('href', link.href);
			expect(screen.getByText(link.icon)).toBeInTheDocument();
		});
	});

	it('applies correct styling classes', () => {
		render(Navigation, { links: testLinks });

		const nav = document.querySelector('.navigation');
		expect(nav).toHaveClass('navigation');

		const links = document.querySelectorAll('.nav-link');
		links.forEach((link) => {
			expect(link).toHaveClass('nav-link');
		});
	});

	it('handles empty links array', () => {
		render(Navigation, { links: [] });
		const nav = document.querySelector('.navigation');
		expect(nav).toBeInTheDocument();
		const links = document.querySelectorAll('.nav-link');
		expect(links.length).toBe(0);
	});

	it('renders with single link', () => {
		const singleLink = [testLinks[0]];
		render(Navigation, { links: singleLink });

		const link = screen.getByText(singleLink[0].text).closest('a');
		expect(link).toHaveAttribute('href', singleLink[0].href);
		expect(screen.getByText(singleLink[0].icon)).toBeInTheDocument();
	});

	it('applies correct icon and text classes', () => {
		render(Navigation, { links: testLinks });

		const icons = document.querySelectorAll('.nav-icon');
		icons.forEach((icon) => {
			expect(icon).toHaveClass('nav-icon');
		});

		const texts = document.querySelectorAll('.nav-text');
		texts.forEach((text) => {
			expect(text).toHaveClass('nav-text');
		});
	});
});
