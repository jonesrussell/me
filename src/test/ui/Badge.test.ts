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
		expect(badge.getAttribute('data-type')).toBe('info');
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
		expect(badge.getAttribute('data-type')).toBe('success');
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
		expect(badge.getAttribute('data-type')).toBe('warning');
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
		expect(badge.getAttribute('data-type')).toBe('error');
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
		expect(badge.getAttribute('data-type')).toBe('info');
	});

	it('is accessible with proper ARIA attributes', () => {
		const { container } = render(Badge, {
			props: {
				children: 'Accessibility Test'
			}
		});

		const badge = container.querySelector('.badge');
		if (!badge) throw new Error('Badge element not found');
		expect(badge.textContent?.trim().replace(/\s+/g, ' ')).toBe('ℹ Accessibility Test');
		expect(badge.tagName.toLowerCase()).toBe('span');
		expect(badge.getAttribute('role')).toBe('status');
		expect(badge.getAttribute('aria-label')).toBe('Accessibility Test');
	});
});
