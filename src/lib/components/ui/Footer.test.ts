import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Footer from './Footer.svelte';
import { currentYear } from '$lib/stores/date';

describe('Footer', () => {
	beforeEach(() => {
		// Mock current year
		currentYear.set(2025);
	});

	afterEach(() => {
		currentYear.set(new Date().getFullYear());
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
		const sourceLink = container.querySelector(
			'a[href="https://github.com/jonesrussell/me"]'
		);
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
