import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/svelte';
import NewsletterCTA from './NewsletterCTA.svelte';
import { FormService } from '../../../js/services/form-service';

// Mock the form service
vi.mock('../../../js/services/form-service', () => ({
	FormService: {
		getInstance: vi.fn(() => ({
			getSchema: vi.fn(),
			submitForm: vi.fn()
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

		expect(container.textContent).toContain('Stay Updated');
		expect(container.textContent).toContain('Subscribe');
		expect(container.querySelector('input[type="email"]')).toBeTruthy();
	});

	it('should show schema error when form service fails', async () => {
		// Mock the form service to throw an error
		const mockFormService = {
			baseUrl: 'http://localhost:8090',
			getSchema: vi.fn().mockRejectedValue(new Error('CORS error')),
			submitForm: vi.fn()
		} as unknown as FormService;

		vi.mocked(FormService.getInstance).mockReturnValue(mockFormService);

		const { container } = render(NewsletterCTA);

		// Wait for the component to load and handle the error
		await new Promise(resolve => setTimeout(resolve, 0));

		// Should show schema error message
		expect(container.textContent).toContain('Form configuration unavailable');
	});

	it('should handle network errors gracefully', async () => {
		const { container } = render(NewsletterCTA);

		// Simulate a network error by triggering form submission
		const form = container.querySelector('form');
		const emailInput = container.querySelector('input[type="email"]') as HTMLInputElement;

		if (emailInput && form) {
			emailInput.value = 'test@example.com';

			// Mock form submission to fail
			const mockFormService = {
				baseUrl: 'http://localhost:8090',
				getSchema: vi.fn().mockResolvedValue({}),
				submitForm: vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
			} as unknown as FormService;

			vi.mocked(FormService.getInstance).mockReturnValue(mockFormService);

			// Trigger form submission
			form.dispatchEvent(new Event('submit', { bubbles: true }));

			// Wait for error handling
			await new Promise(resolve => setTimeout(resolve, 0));

			// Should show network error message
			expect(container.textContent).toContain('Network error');
		}
	});

	it('should validate email format', () => {
		const { container } = render(NewsletterCTA);

		const emailInput = container.querySelector('input[type="email"]') as HTMLInputElement;
		const form = container.querySelector('form');

		if (emailInput && form) {
			// Test invalid email
			emailInput.value = 'invalid-email';
			form.dispatchEvent(new Event('submit', { bubbles: true }));

			// Should show validation error
			expect(container.textContent).toContain('Please enter a valid email address');
		}
	});

	it('should show loading state during submission', async () => {
		const { container } = render(NewsletterCTA);

		const emailInput = container.querySelector('input[type="email"]') as HTMLInputElement;
		const form = container.querySelector('form');

		if (emailInput && form) {
			emailInput.value = 'test@example.com';

			// Mock form submission to be slow
			const mockFormService = {
				baseUrl: 'http://localhost:8090',
				getSchema: vi.fn().mockResolvedValue({}),
				submitForm: vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
			} as unknown as FormService;

			vi.mocked(FormService.getInstance).mockReturnValue(mockFormService);

			// Trigger form submission
			form.dispatchEvent(new Event('submit', { bubbles: true }));

			// Should show loading state
			expect(container.textContent).toContain('Subscribing');
		}
	});
});
