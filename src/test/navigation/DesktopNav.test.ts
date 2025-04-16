import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import DesktopNav from '$lib/components/navigation/DesktopNav.svelte';

vi.mock('$app/state', () => ({
	page: {
		url: new URL('http://localhost/')
	}
}));

describe('DesktopNav', () => {
	it('renders navigation links', () => {
		const { getByText } = render(DesktopNav);
		expect(getByText('Blog')).toBeTruthy();
		expect(getByText('Projects')).toBeTruthy();
		expect(getByText('Resources')).toBeTruthy();
		expect(getByText('Contact')).toBeTruthy();
	});

	it('marks active navigation item', () => {
		const { getByText } = render(DesktopNav, {
			url: new URL('http://localhost/blog')
		});
		const blogLink = getByText('Blog');
		expect(blogLink.classList.contains('active')).toBe(true);
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
