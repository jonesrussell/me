import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/svelte';
import NewsletterCTA from '$lib/components/ui/NewsletterCTA.svelte';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('NewsletterCTA', () => {
	beforeEach(() => {
		// Create app container if it doesn't exist
		if (!document.getElementById('app')) {
			const app = document.createElement('div');
			app.id = 'app';
			document.body.appendChild(app);
		}
		// Reset fetch mock before each test
		mockFetch.mockReset();
	});

	afterEach(() => {
		cleanup();
		// Clear the app container
		const app = document.getElementById('app');
		if (app) {
			app.innerHTML = '';
		}
	});

	it('renders the component with initial state', () => {
		render(NewsletterCTA, { target: document.getElementById('app')! });

		// Check if the form elements are present
		const input = document.querySelector('input[type="email"]');
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('placeholder', 'your.email@example.com');

		const button = document.querySelector('button[type="submit"]');
		expect(button).toBeInTheDocument();
		expect(button?.textContent).toBe('Subscribe ⟶');
		expect(button).toBeDisabled();

		// Check initial state
		expect(document.querySelector('.status-message')).not.toBeInTheDocument();
	});

	it('enables the submit button when email is not empty', async () => {
		render(NewsletterCTA, { target: document.getElementById('app')! });

		const input = document.querySelector('input[type="email"]');
		const button = document.querySelector('button[type="submit"]');

		// Initially, button should be disabled
		expect(button).toBeDisabled();

		// Enter email
		await fireEvent.input(input!, { target: { value: 'test@example.com' } });

		// Button should be enabled
		expect(button).not.toBeDisabled();
	});

	it('shows loading state during submission', async () => {
		render(NewsletterCTA, { target: document.getElementById('app')! });

		const input = document.querySelector('input[type="email"]');
		const button = document.querySelector('button[type="submit"]');

		// Set up mock fetch to delay response
		mockFetch.mockImplementationOnce(() => new Promise(() => {}));

		// Enter email and submit
		await fireEvent.input(input!, { target: { value: 'test@example.com' } });
		await fireEvent.submit(input!.closest('form')!);

		// Check loading state
		expect(button).toBeDisabled();
		expect(button?.textContent).toBe('Loading');
	});

	it('handles successful submission', async () => {
		render(NewsletterCTA, { target: document.getElementById('app')! });

		const input = document.querySelector('input[type="email"]');

		// Mock successful response
		mockFetch.mockImplementationOnce(() =>
			Promise.resolve({
				ok: true,
				status: 200,
				json: () => Promise.resolve({})
			} as Response)
		);

		// Enter email and submit
		await fireEvent.input(input!, { target: { value: 'test@example.com' } });
		await fireEvent.submit(input!.closest('form')!);

		// Wait for success state
		await waitFor(() => {
			const successMessage = document.querySelector('.status-message.status-success');
			expect(successMessage).toBeInTheDocument();
			expect(successMessage?.textContent).toBe("Success! You've been subscribed.");
		});

		// Check if email is cleared
		expect(input).toHaveValue('');
	});

	it('handles submission error', async () => {
		render(NewsletterCTA, { target: document.getElementById('app')! });

		const input = document.querySelector('input[type="email"]');
		const button = document.querySelector('button[type="submit"]');

		// Mock error response
		mockFetch.mockImplementationOnce(() =>
			Promise.resolve({
				ok: false,
				status: 500,
				json: () => Promise.reject(new Error('Server error'))
			} as Response)
		);

		// Enter email and submit
		await fireEvent.input(input!, { target: { value: 'test@example.com' } });
		await fireEvent.submit(input!.closest('form')!);

		// Wait for error state
		await waitFor(() => {
			const errorMessage = document.querySelector('.status-message.status-error');
			expect(errorMessage).toBeInTheDocument();
			expect(errorMessage?.textContent).toBe('Failed to subscribe');
		});

		// Check if button is re-enabled
		expect(button).not.toBeDisabled();
	});

	it('is accessible', async () => {
		render(NewsletterCTA, { target: document.getElementById('app')! });

		// Check input accessibility
		const input = document.querySelector('input[type="email"]');
		expect(input).toHaveAttribute('type', 'email');
		expect(input).toHaveAttribute('required');
		expect(input).toHaveAttribute('placeholder', 'your.email@example.com');

		// Check button accessibility
		const button = document.querySelector('button[type="submit"]');
		expect(button).toHaveAttribute('type', 'submit');
		expect(button?.textContent).toBe('Subscribe ⟶');

		// Check form accessibility
		const form = input!.closest('form');
		expect(form).toHaveAttribute('novalidate');
	});
});
