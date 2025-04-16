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
		expect(badge.textContent).toBe('ℹ Test Badge');
		expect(badge).toHaveClass('badge', 'info');
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
		expect(badge.textContent).toBe('✓ Success');
		expect(badge).toHaveClass('badge', 'success');
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
		expect(badge.textContent).toBe('⚠ Warning');
		expect(badge).toHaveClass('badge', 'warning');
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
		expect(badge.textContent).toBe('✗ Error');
		expect(badge).toHaveClass('badge', 'error');
	});

	it('has proper CSS classes for styling', () => {
		const { container } = render(Badge, {
			props: {
				children: 'Test'
			}
		});

		const badge = container.querySelector('.badge');
		if (!badge) throw new Error('Badge element not found');
		expect(badge.textContent).toBe('ℹ Test');
		expect(badge).toHaveClass('badge', 'info');
	});

	it('is accessible', () => {
		const { container } = render(Badge, {
			props: {
				children: 'Accessibility Test'
			}
		});

		const badge = container.querySelector('.badge');
		if (!badge) throw new Error('Badge element not found');
		expect(badge.textContent).toBe('ℹ Accessibility Test');
		expect(badge.tagName.toLowerCase()).toBe('span');
	});
});
