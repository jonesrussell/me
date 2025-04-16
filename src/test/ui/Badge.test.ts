import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Badge from '$lib/components/ui/Badge.svelte';

describe('Badge', () => {
	it('renders with default info type', () => {
		render(Badge, {
			props: {
				children: 'Test Badge'
			}
		});

		const badge = screen.getByText('ℹ Test Badge');
		expect(badge).toBeInTheDocument();
		expect(badge).toHaveClass('badge', 'info');
	});

	it('renders success badge', () => {
		render(Badge, {
			props: {
				type: 'success',
				children: 'Success'
			}
		});

		const badge = screen.getByText('✓ Success');
		expect(badge).toBeInTheDocument();
		expect(badge).toHaveClass('badge', 'success');
	});

	it('renders warning badge', () => {
		render(Badge, {
			props: {
				type: 'warning',
				children: 'Warning'
			}
		});

		const badge = screen.getByText('⚠ Warning');
		expect(badge).toBeInTheDocument();
		expect(badge).toHaveClass('badge', 'warning');
	});

	it('renders error badge', () => {
		render(Badge, {
			props: {
				type: 'error',
				children: 'Error'
			}
		});

		const badge = screen.getByText('✗ Error');
		expect(badge).toBeInTheDocument();
		expect(badge).toHaveClass('badge', 'error');
	});

	it('has proper CSS classes for styling', () => {
		render(Badge, {
			props: {
				children: 'Test'
			}
		});

		const badge = screen.getByText('ℹ Test');
		expect(badge).toBeInTheDocument();
		expect(badge).toHaveClass('badge', 'info');
	});

	it('is accessible', () => {
		render(Badge, {
			props: {
				children: 'Accessibility Test'
			}
		});

		const badge = screen.getByText('ℹ Accessibility Test');
		expect(badge).toBeInTheDocument();
		expect(badge.tagName.toLowerCase()).toBe('span');
	});
});
