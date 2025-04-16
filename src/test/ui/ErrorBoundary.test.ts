import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ErrorBoundary from '$lib/components/ui/ErrorBoundary.svelte';

describe('ErrorBoundary', () => {
	it('renders children when no error occurs', () => {
		render(ErrorBoundary, {
			props: {
				children: () => 'Test Content'
			}
		});

		expect(screen.getByText('Test Content')).toBeInTheDocument();
	});

	it('renders error message when error occurs', () => {
		render(ErrorBoundary, {
			props: {
				children: () => {
					throw new Error('Test Error');
				}
			}
		});

		expect(screen.getByText('Test Error')).toBeInTheDocument();
		expect(screen.getByText('Error')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
	});

	it('resets error when Try Again is clicked', async () => {
		let shouldThrow = true;
		render(ErrorBoundary, {
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
		expect(screen.getByText('Test Error')).toBeInTheDocument();

		// Click Try Again
		const button = screen.getByRole('button', { name: 'Try Again' });
		await button.click();

		// Should show recovered content
		expect(screen.getByText('Recovered Content')).toBeInTheDocument();
		expect(screen.queryByText('Test Error')).not.toBeInTheDocument();
	});

	it('has proper CSS classes for styling', () => {
		render(ErrorBoundary, {
			props: {
				children: () => {
					throw new Error('Test Error');
				}
			}
		});

		const errorBoundary = screen.getByText('Test Error').closest('.error-boundary');
		expect(errorBoundary).toBeInTheDocument();
		expect(screen.getByText('Test Error')).toHaveClass('error-message');
	});
});
