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

		testLinks.forEach(link => {
			const navLink = screen.getByText(link.text).closest('a');
			expect(navLink).toHaveAttribute('href', link.href);
			expect(screen.getByText(link.icon)).toBeInTheDocument();
		});
	});

	it('applies correct styling classes', () => {
		render(Navigation, { links: testLinks });

		const nav = screen.getByRole('navigation');
		expect(nav).toHaveClass('navigation');

		const links = screen.getAllByRole('link');
		links.forEach(link => {
			expect(link).toHaveClass('nav-link');
			expect(link).toHaveStyle({
				'background': 'var(--bg-darker)',
				'border-radius': 'var(--radius-md)'
			});
		});
	});

	it('handles empty links array', () => {
		render(Navigation, { links: [] });
		const nav = screen.getByRole('navigation');
		expect(nav).toBeInTheDocument();
		expect(screen.queryByRole('link')).not.toBeInTheDocument();
	});

	it('renders with single link', () => {
		const singleLink = [testLinks[0]];
		render(Navigation, { links: singleLink });

		const link = screen.getByText(singleLink[0].text).closest('a');
		expect(link).toHaveAttribute('href', singleLink[0].href);
		expect(screen.getByText(singleLink[0].icon)).toBeInTheDocument();
	});

	it('applies correct icon and text styling', () => {
		render(Navigation, { links: testLinks });

		const icons = screen.getAllByText(/[📝🚀]/u);
		icons.forEach(icon => {
			expect(icon).toHaveClass('nav-icon');
			expect(icon).toHaveStyle({
				'font-size': 'var(--font-size-lg)'
			});
		});

		const texts = screen.getAllByText(/Test Link/);
		texts.forEach(text => {
			expect(text).toHaveClass('nav-text');
			expect(text).toHaveStyle({
				'font-family': 'var(--font-mono)',
				'font-size': 'var(--font-size-base)'
			});
		});
	});
});
