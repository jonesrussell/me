import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import ErrorBoundary from '$lib/components/ui/ErrorBoundary.svelte';

describe('ErrorBoundary', () => {
	it('renders children when no error occurs', () => {
		const { container } = render(ErrorBoundary, {
			props: {
				children: () => 'Test Content'
			}
		});

		expect(container.textContent).toContain('Test Content');
	});

	it('renders error message when error occurs', () => {
		const { container } = render(ErrorBoundary, {
			props: {
				children: () => {
					throw new Error('Test Error');
				}
			}
		});

		expect(container.textContent).toContain('Something went wrong');
	});
});
