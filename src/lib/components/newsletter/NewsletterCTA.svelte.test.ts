import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/svelte';
import NewsletterCTA from './NewsletterCTA.svelte';

// Mock the form service
vi.mock('../../../js/services/form-service', () => ({
	FormService: {
		getInstance: vi.fn(() => ({
			getSchema: vi.fn().mockResolvedValue({}),
			submitForm: vi.fn().mockResolvedValue({})
		}))
	}
}));

// Mock the error handler
vi.mock('$lib/utils/error-handler', () => ({
	createError: vi.fn((message, error, context) => ({
		message,
		context,
		stack: error?.stack
	})),
	logErrorDebounced: vi.fn(),
	withErrorHandling: vi.fn(async (operation) => {
		try {
			return await operation();
		} catch {
			return null;
		}
	})
}));

describe('NewsletterCTA', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should render newsletter form', () => {
		const { container } = render(NewsletterCTA);

		// Check for basic form elements
		expect(container.querySelector('form')).toBeTruthy();
		expect(container.querySelector('input[type="email"]')).toBeTruthy();
	});

	it('should render with default props', () => {
		const { container } = render(NewsletterCTA);

		// The component should be rendered
		expect(container.querySelector('form')).toBeTruthy();
	});

	it('should have email input field', () => {
		const { container } = render(NewsletterCTA);

		const emailInput = container.querySelector('input[type="email"]');
		expect(emailInput).toBeTruthy();
	});

	it('should have submit button', () => {
		const { container } = render(NewsletterCTA);

		const submitButton = container.querySelector('button[type="submit"]');
		expect(submitButton).toBeTruthy();
	});

	it('should render form with proper structure', () => {
		const { container } = render(NewsletterCTA);

		// Check for form structure
		const form = container.querySelector('form');
		expect(form).toBeTruthy();

		// Check for input and button
		expect(form?.querySelector('input[type="email"]')).toBeTruthy();
		expect(form?.querySelector('button[type="submit"]')).toBeTruthy();
	});
});
