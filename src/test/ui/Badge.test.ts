import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import { tick } from 'svelte';
import Badge from '$lib/components/ui/Badge.svelte';

describe('Badge', () => {
	it('renders with default info type', async () => {
		const { container } = render(Badge, {
			props: {
				children: () => 'Test Badge'
			}
		});

		await tick();
		await tick(); // Double tick to ensure all updates are processed
		const badge = container.querySelector('.badge');
		expect(badge).toBeInTheDocument();
		expect(badge).toHaveClass('info');
		expect(badge?.textContent?.replace(/\s+/g, ' ').trim()).toBe('ℹ Test Badge');
	});

	it('renders success badge', async () => {
		const { container } = render(Badge, {
			props: {
				type: 'success',
				children: () => 'Success'
			}
		});

		await tick();
		await tick(); // Double tick to ensure all updates are processed
		const badge = container.querySelector('.badge');
		expect(badge).toBeInTheDocument();
		expect(badge).toHaveClass('success');
		expect(badge?.textContent?.replace(/\s+/g, ' ').trim()).toBe('✓ Success');
	});

	it('renders warning badge', async () => {
		const { container } = render(Badge, {
			props: {
				type: 'warning',
				children: () => 'Warning'
			}
		});

		await tick();
		await tick(); // Double tick to ensure all updates are processed
		const badge = container.querySelector('.badge');
		expect(badge).toBeInTheDocument();
		expect(badge).toHaveClass('warning');
		expect(badge?.textContent?.replace(/\s+/g, ' ').trim()).toBe('⚠ Warning');
	});

	it('renders error badge', async () => {
		const { container } = render(Badge, {
			props: {
				type: 'error',
				children: () => 'Error'
			}
		});

		await tick();
		await tick(); // Double tick to ensure all updates are processed
		const badge = container.querySelector('.badge');
		expect(badge).toBeInTheDocument();
		expect(badge).toHaveClass('error');
		expect(badge?.textContent?.replace(/\s+/g, ' ').trim()).toBe('✗ Error');
	});

	it('has proper CSS classes for styling', async () => {
		const { container } = render(Badge, {
			props: {
				children: () => 'Test'
			}
		});

		await tick();
		await tick(); // Double tick to ensure all updates are processed
		const badge = container.querySelector('.badge');
		expect(badge).toBeInTheDocument();
		expect(badge).toHaveClass('badge');
		expect(badge).toHaveClass('info');
	});

	it('is accessible', async () => {
		const { container } = render(Badge, {
			props: {
				children: () => 'Accessibility Test'
			}
		});

		await tick();
		await tick(); // Double tick to ensure all updates are processed
		// Check semantic structure
		const badge = container.querySelector('.badge');
		expect(badge).toBeInTheDocument();
		expect(badge?.tagName.toLowerCase()).toBe('span');

		// Check content is readable
		expect(badge?.textContent?.replace(/\s+/g, ' ').trim()).toBe('ℹ Accessibility Test');
	});
});
