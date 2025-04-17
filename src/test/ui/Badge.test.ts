import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Badge from '$lib/components/ui/Badge.svelte';

describe('Badge', () => {
	it('renders with default info type', () => {
		const { container } = render(Badge, {
			props: {
				children: 'Test Badge'
			}
		});

		const badge = container.querySelector('.badge');
		if (!badge) throw new Error('Badge element not found');
		expect(badge.textContent?.trim().replace(/\s+/g, ' ')).toBe('ℹ Test Badge');
		expect(badge.classList.contains('info')).toBe(true);
	});

	it('renders success badge', () => {
		const { container } = render(Badge, {
			props: {
				type: 'success',
				children: 'Success'
			}
		});

		const badge = container.querySelector('.badge');
		if (!badge) throw new Error('Badge element not found');
		expect(badge.textContent?.trim().replace(/\s+/g, ' ')).toBe('✓ Success');
		expect(badge.classList.contains('success')).toBe(true);
	});

	it('renders warning badge', () => {
		const { container } = render(Badge, {
			props: {
				type: 'warning',
				children: 'Warning'
			}
		});

		const badge = container.querySelector('.badge');
		if (!badge) throw new Error('Badge element not found');
		expect(badge.textContent?.trim().replace(/\s+/g, ' ')).toBe('⚠ Warning');
		expect(badge.classList.contains('warning')).toBe(true);
	});

	it('renders error badge', () => {
		const { container } = render(Badge, {
			props: {
				type: 'error',
				children: 'Error'
			}
		});

		const badge = container.querySelector('.badge');
		if (!badge) throw new Error('Badge element not found');
		expect(badge.textContent?.trim().replace(/\s+/g, ' ')).toBe('✗ Error');
		expect(badge.classList.contains('error')).toBe(true);
	});

	it('has required structural elements', () => {
		const { container } = render(Badge, {
			props: {
				children: 'Test'
			}
		});

		const badge = container.querySelector('.badge');
		if (!badge) throw new Error('Badge element not found');
		expect(badge.textContent?.trim().replace(/\s+/g, ' ')).toBe('ℹ Test');
		expect(badge.classList.contains('info')).toBe(true);
	});

	it('is accessible', () => {
		const { container } = render(Badge, {
			props: {
				children: 'Accessibility Test'
			}
		});

		const badge = container.querySelector('.badge');
		if (!badge) throw new Error('Badge element not found');
		expect(badge.textContent?.trim().replace(/\s+/g, ' ')).toBe('ℹ Accessibility Test');
		expect(badge.tagName.toLowerCase()).toBe('span');
	});
});
