import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
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
		render(Navigation, { props: { links: testLinks } });

		const navLinks = document.querySelectorAll('.nav-link');
		const navTexts = document.querySelectorAll('.nav-text');
		const navIcons = document.querySelectorAll('.nav-icon');

		expect(navLinks.length).toBe(testLinks.length);
		expect(navTexts.length).toBe(testLinks.length);
		expect(navIcons.length).toBe(testLinks.length);

		testLinks.forEach((link, index) => {
			expect(navLinks[index]).toHaveAttribute('href', link.href);
			expect(navTexts[index].textContent).toBe(link.text);
			expect(navIcons[index].textContent).toBe(link.icon);
		});
	});

	it('applies correct styling classes', () => {
		render(Navigation, { props: { links: testLinks } });

		const nav = document.querySelector('.navigation');
		expect(nav).toHaveClass('navigation');

		const links = document.querySelectorAll('.nav-link');
		links.forEach(link => {
			expect(link).toHaveClass('nav-link');
		});
	});

	it('handles empty links array', () => {
		render(Navigation, { props: { links: [] } });
		const nav = document.querySelector('.navigation');
		expect(nav).toBeInTheDocument();
		const links = document.querySelectorAll('.nav-link');
		expect(links.length).toBe(0);
	});

	it('renders with single link', () => {
		const singleLink = [testLinks[0]];
		render(Navigation, { props: { links: singleLink } });

		const navLink = document.querySelector('.nav-link');
		const navText = document.querySelector('.nav-text');
		const navIcon = document.querySelector('.nav-icon');

		expect(navLink).toHaveAttribute('href', singleLink[0].href);
		expect(navText?.textContent).toBe(singleLink[0].text);
		expect(navIcon?.textContent).toBe(singleLink[0].icon);
	});

	it('applies correct icon and text classes', () => {
		render(Navigation, { props: { links: testLinks } });

		const icons = document.querySelectorAll('.nav-icon');
		icons.forEach(icon => {
			expect(icon).toHaveClass('nav-icon');
		});

		const texts = document.querySelectorAll('.nav-text');
		texts.forEach(text => {
			expect(text).toHaveClass('nav-text');
		});
	});
});
