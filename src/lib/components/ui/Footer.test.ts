import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Footer from './Footer.svelte';

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
		expect(footer).toBeInTheDocument();
		expect(footer?.textContent).toContain('Russell Jones');
	});

	it('displays current year', () => {
		const { container } = render(Footer);
		expect(container.textContent).toContain('© 2025');
	});

	it('contains source code link', () => {
		const { container } = render(Footer);
		const sourceLink = container.querySelector('a[href="https://github.com/jonesrussell/me"]');
		expect(sourceLink).toBeInTheDocument();
		expect(sourceLink?.textContent?.trim()).toBe('Source Code');
		expect(sourceLink).toHaveAttribute('target', '_blank');
		expect(sourceLink).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('contains license link', () => {
		const { container } = render(Footer);
		const licenseLink = container.querySelector(
			'a[href="https://github.com/jonesrussell/me/blob/main/LICENSE"]'
		);
		expect(licenseLink).toBeInTheDocument();
		expect(licenseLink?.textContent?.trim()).toBe('MIT');
		expect(licenseLink).toHaveAttribute('target', '_blank');
		expect(licenseLink).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('has proper styling', () => {
		const { container } = render(Footer);
		const footer = container.querySelector('.footer');
		expect(footer).toHaveStyle({
			'text-align': 'center',
			'border-top': '1px solid var(--border-color)'
		});
	});
});
