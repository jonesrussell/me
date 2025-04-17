import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Footer from '$lib/components/ui/Footer.svelte';

// Mock the date store
vi.mock('$lib/stores/date', () => ({
	currentYear: {
		subscribe: (fn: (value: number) => void) => {
			fn(2025);
			return () => {};
		}
	}
}));

describe('Footer', () => {
	afterEach(() => {
		cleanup();
	});

	it('renders footer content', () => {
		const { container } = render(Footer);
		const footer = container.querySelector('.footer');
		if (!footer) throw new Error('Footer element not found');
		expect(footer).toBeInTheDocument();
	});

	it('displays current year', () => {
		const { container } = render(Footer);
		const year = new Date().getFullYear().toString();
		expect(container.textContent).toContain(year);
	});

	it('contains source code link', () => {
		const { container } = render(Footer);
		const sourceLink = container.querySelector('a[href*="github"]');
		expect(sourceLink).toBeInTheDocument();
	});

	it('contains license link', () => {
		const { container } = render(Footer);
		const licenseLink = container.querySelector('a[href*="LICENSE"]');
		expect(licenseLink).toBeInTheDocument();
	});

	it('has proper accessibility attributes', () => {
		const { container } = render(Footer);
		const footer = container.querySelector('footer');
		if (!footer) throw new Error('Footer element not found');
		expect(footer.getAttribute('role')).toBe('contentinfo');
	});
});
