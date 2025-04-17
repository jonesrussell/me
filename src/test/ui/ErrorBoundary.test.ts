import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/svelte';
import ErrorBoundary from '$lib/components/ui/ErrorBoundary.svelte';

describe('ErrorBoundary', () => {
	beforeEach(() => {
		cleanup();
	});

	it('renders children when no error occurs', () => {
		const { getByText } = render(ErrorBoundary, {
			props: {
				children: () => 'Test Content'
			}
		});

		expect(getByText('Test Content')).toBeInTheDocument();
	});

	it('renders error message when error occurs', () => {
		const { getByText } = render(ErrorBoundary, {
			props: {
				children: () => {
					throw new Error('Test Error');
				}
			}
		});

		expect(getByText('Test Error')).toBeInTheDocument();
		expect(getByText('Error')).toBeInTheDocument();
		expect(getByText('Try Again')).toBeInTheDocument();
	});

	it('resets error when Try Again is clicked', async () => {
		let shouldThrow = true;
		const { getByText, queryByText } = render(ErrorBoundary, {
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
		expect(getByText('Test Error')).toBeInTheDocument();

		// Click Try Again
		await fireEvent.click(getByText('Try Again'));

		// Should show recovered content
		expect(getByText('Recovered Content')).toBeInTheDocument();
		expect(queryByText('Test Error')).not.toBeInTheDocument();
	});

	it('is accessible', () => {
		const { getByRole } = render(ErrorBoundary, {
			props: {
				children: () => {
					throw new Error('Test Error');
				}
			}
		});

		// Check that error message is properly announced
		expect(getByRole('alert')).toBeInTheDocument();
		expect(getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
	});
});
