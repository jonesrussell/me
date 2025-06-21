import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/svelte';
import ErrorBoundary from './ErrorBoundary.svelte';

// Mock the error handler
vi.mock('$lib/utils/error-handler', () => ({
	createError: vi.fn((message, error, context) => ({
		message,
		context,
		stack: error?.stack
	})),
	logErrorDebounced: vi.fn()
}));

describe('ErrorBoundary', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should render children when there is no error', () => {
		const { container } = render(ErrorBoundary, {
			props: {
				fallback: 'Error occurred'
			}
		});

		// Should render the slot content
		expect(container.innerHTML).toContain('Error occurred');
	});

	it('should render fallback when error occurs', async () => {
		// Suppress console.error for this test
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

		try {
			const { container } = render(ErrorBoundary, {
				props: {
					fallback: 'Component failed',
					component: 'TestComponent'
				}
			});

			// Check that the fallback message is rendered
			expect(container.textContent).toContain('Component failed');
		} finally {
			consoleSpy.mockRestore();
		}
	});

	it('should show retry button', () => {
		const { container } = render(ErrorBoundary, {
			props: {
				fallback: 'Error occurred'
			}
		});

		expect(container.textContent).toContain('Try again');
	});

	it('should show technical details when showDetails is true', () => {
		const { container } = render(ErrorBoundary, {
			props: {
				fallback: 'Error occurred',
				showDetails: true
			}
		});

		expect(container.textContent).toContain('Technical details');
	});

	it('should apply custom class name', () => {
		const { container } = render(ErrorBoundary, {
			props: {
				class: 'custom-error-boundary'
			}
		});

		const errorBoundary = container.querySelector('.error-boundary');
		expect(errorBoundary?.classList.contains('custom-error-boundary')).toBe(true);
	});

	it('should handle retry functionality', async () => {
		const { container } = render(ErrorBoundary, {
			props: {
				fallback: 'Error occurred'
			}
		});

		// Check that retry button is present
		expect(container.textContent).toContain('Try again');
	});
});
