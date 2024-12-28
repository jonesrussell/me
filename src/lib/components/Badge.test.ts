import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import Badge from './Badge.svelte';

type BadgeType = 'info' | 'success' | 'warning' | 'error';

describe('Badge Component', () => {
	describe('Rendering', () => {
		test('renders with default type (info)', async () => {
			const { container } = render(Badge);
			const badge = container.querySelector('.badge');

			expect(badge).toHaveClass('badge', 'info');
			expect(badge).toHaveTextContent(/ℹ/);
		});

		test('renders success badge', async () => {
			const { container } = render(Badge, {
				props: { type: 'success' }
			});
			const badge = container.querySelector('.badge');

			expect(badge).toHaveClass('badge', 'success');
			expect(badge).toHaveTextContent(/✓/);
		});

		test('renders warning badge', async () => {
			const { container } = render(Badge, {
				props: { type: 'warning' }
			});
			const badge = container.querySelector('.badge');

			expect(badge).toHaveClass('badge', 'warning');
			expect(badge).toHaveTextContent(/⚠/);
		});

		test('renders error badge', async () => {
			const { container } = render(Badge, {
				props: { type: 'error' }
			});
			const badge = container.querySelector('.badge');

			expect(badge).toHaveClass('badge', 'error');
			expect(badge).toHaveTextContent(/✗/);
		});

		test('renders custom content when provided', async () => {
			const { container } = render(Badge, {
				props: {
					type: 'info',
					content: () => 'Custom Content'
				}
			});
			const badge = container.querySelector('.badge');

			expect(badge).toHaveTextContent('Custom Content');
		});
	});

	describe('Accessibility', () => {
		test('has proper ARIA attributes', async () => {
			const { container } = render(Badge, {
				props: { type: 'info' }
			});
			const badge = container.querySelector('.badge');

			expect(badge).toHaveAttribute('role', 'status');
			expect(badge).toBeVisible();
		});

		test('conveys proper status for each type', async () => {
			const types: BadgeType[] = ['info', 'success', 'warning', 'error'];
			const ariaLabels = {
				info: 'Information',
				success: 'Success',
				warning: 'Warning',
				error: 'Error'
			};

			for (const type of types) {
				const { container, unmount } = render(Badge, {
					props: { type }
				});
				const badge = container.querySelector('.badge');

				expect(badge).toHaveAttribute('aria-label', ariaLabels[type]);
				unmount();
			}
		});
	});

	describe('State Management', () => {
		test('updates type reactively', async () => {
			const { container, rerender } = render(Badge, {
				props: { type: 'info' }
			});

			// Initial state
			let badge = container.querySelector('.badge');
			expect(badge).toHaveClass('info');

			// Update props
			await rerender({ type: 'success' });
			badge = container.querySelector('.badge');
			expect(badge).toHaveClass('success');
		});

		test('updates content reactively', async () => {
			const { container, rerender } = render(Badge, {
				props: {
					type: 'info',
					content: () => 'Initial'
				}
			});

			// Initial state
			let badge = container.querySelector('.badge');
			expect(badge).toHaveTextContent('Initial');

			// Update content
			await rerender({
				type: 'info',
				content: () => 'Updated'
			});
			badge = container.querySelector('.badge');
			expect(badge).toHaveTextContent('Updated');
		});
	});
});
