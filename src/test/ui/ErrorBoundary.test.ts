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

		const content = container.querySelector('.error-boundary-content');
		if (!content) throw new Error('Content element not found');
		expect(content.textContent).toBe('Test Content');
	});

	it('renders error message when error occurs', () => {
		const { container } = render(ErrorBoundary, {
			props: {
				children: () => {
					throw new Error('Test Error');
				}
			}
		});

		const errorMessage = container.querySelector('.error-message');
		const errorTitle = container.querySelector('.error-title');
		const retryButton = container.querySelector('button');

		if (!errorMessage) throw new Error('Error message element not found');
		if (!errorTitle) throw new Error('Error title element not found');
		if (!retryButton) throw new Error('Retry button not found');

		expect(errorMessage.textContent).toBe('Test Error');
		expect(errorTitle.textContent).toBe('Error');
		expect(retryButton.textContent).toBe('Try Again');
	});

	it('resets error when Try Again is clicked', async () => {
		let shouldThrow = true;
		const { container } = render(ErrorBoundary, {
			props: {
				children: () => {
					if (shouldThrow) {
						shouldThrow = false;
						throw new Error('Test Error');
					}
					return 'Recovered Content';
				}
			}
		});

		// Initially shows error
		const errorMessage = container.querySelector('.error-message');
		if (!errorMessage) throw new Error('Error message element not found');
		expect(errorMessage.textContent).toBe('Test Error');

		// Click Try Again
		const button = container.querySelector('button');
		if (!button) throw new Error('Retry button not found');
		await button.click();

		// Should show recovered content
		const content = container.querySelector('.error-boundary-content');
		if (!content) throw new Error('Content element not found');
		expect(content.textContent).toBe('Recovered Content');
		expect(container.querySelector('.error-message')).not.toBeInTheDocument();
	});

	it('has proper CSS classes for styling', () => {
		const { container } = render(ErrorBoundary, {
			props: {
				children: () => {
					throw new Error('Test Error');
				}
			}
		});

		const errorBoundary = container.querySelector('.error-boundary');
		const errorMessage = container.querySelector('.error-message');

		if (!errorBoundary) throw new Error('Error boundary element not found');
		if (!errorMessage) throw new Error('Error message element not found');

		expect(errorBoundary).toBeInTheDocument();
		expect(errorMessage).toHaveClass('error-message');
	});
});
