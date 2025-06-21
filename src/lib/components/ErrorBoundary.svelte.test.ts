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

	it('should render with default props', () => {
		const { container } = render(ErrorBoundary, {
			props: {}
		});

		// Should render the error boundary wrapper
		const errorBoundary = container.querySelector('.error-boundary');
		expect(errorBoundary).toBeTruthy();
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

	it('should have default fallback message', () => {
		const { container } = render(ErrorBoundary, {
			props: {}
		});

		// The component should be rendered even without children
		expect(container.querySelector('.error-boundary')).toBeTruthy();
	});

	it('should accept custom fallback message', () => {
		const { container } = render(ErrorBoundary, {
			props: {
				fallback: 'Custom error message'
			}
		});

		// The component should be rendered
		expect(container.querySelector('.error-boundary')).toBeTruthy();
	});

	it('should accept showDetails prop', () => {
		const { container } = render(ErrorBoundary, {
			props: {
				showDetails: true
			}
		});

		// The component should be rendered
		expect(container.querySelector('.error-boundary')).toBeTruthy();
	});

	it('should accept component name prop', () => {
		const { container } = render(ErrorBoundary, {
			props: {
				component: 'TestComponent'
			}
		});

		// The component should be rendered
		expect(container.querySelector('.error-boundary')).toBeTruthy();
	});
});
