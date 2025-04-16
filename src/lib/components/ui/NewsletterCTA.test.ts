import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/svelte';
import NewsletterCTA from './NewsletterCTA.svelte';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('NewsletterCTA', () => {
	beforeEach(() => {
		// Reset fetch mock before each test
		mockFetch.mockReset();
		// Clear the app container
		document.getElementById('app')!.innerHTML = '';
	});

	afterEach(() => {
		cleanup();
	});

	it('renders the component with initial state', () => {
		render(NewsletterCTA, { target: document.getElementById('app')! });

		// Check if the form elements are present
		expect(screen.getByRole('textbox', { name: '' })).toBeInTheDocument();
		expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Subscribe ⟶' })).toBeInTheDocument();

		// Check if the initial state is correct
		expect(screen.getByRole('button')).toBeDisabled();
		expect(screen.queryByText('Loading')).not.toBeInTheDocument();
		expect(screen.queryByText(/success/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
	});

	it('enables the submit button when email is not empty', async () => {
		render(NewsletterCTA, { target: document.getElementById('app')! });

		const input = screen.getByPlaceholderText('your.email@example.com');
		const button = screen.getByRole('button');

		// Initially, button should be disabled
		expect(button).toBeDisabled();

		// Enter email
		await fireEvent.input(input, { target: { value: 'test@example.com' } });

		// Button should be enabled
		expect(button).not.toBeDisabled();
	});

	it('shows loading state during submission', async () => {
		render(NewsletterCTA, { target: document.getElementById('app')! });

		const input = screen.getByPlaceholderText('your.email@example.com');

		// Set up mock fetch to delay response
		mockFetch.mockImplementationOnce(() => new Promise(() => {}));

		// Enter email and submit
		await fireEvent.input(input, { target: { value: 'test@example.com' } });
		await fireEvent.submit(screen.getByRole('textbox').closest('form')!);

		// Check loading state
		expect(screen.getByRole('button')).toBeDisabled();
		expect(screen.getByText('Loading')).toBeInTheDocument();
	});

	it('handles successful submission', async () => {
		render(NewsletterCTA, { target: document.getElementById('app')! });

		const input = screen.getByPlaceholderText('your.email@example.com');

		// Mock successful response
		mockFetch.mockImplementationOnce(() =>
			Promise.resolve({
				ok: true,
				status: 200,
				json: () => Promise.resolve({})
			} as Response)
		);

		// Enter email and submit
		await fireEvent.input(input, { target: { value: 'test@example.com' } });
		await fireEvent.submit(screen.getByRole('textbox').closest('form')!);

		// Wait for success state
		await waitFor(() => {
			expect(screen.getByText(/success/i)).toBeInTheDocument();
		});

		// Check if email is cleared
		expect(input).toHaveValue('');
	});

	it('handles submission error', async () => {
		render(NewsletterCTA, { target: document.getElementById('app')! });

		const input = screen.getByPlaceholderText('your.email@example.com');

		// Mock error response
		mockFetch.mockImplementationOnce(() =>
			Promise.resolve({
				ok: false,
				status: 500,
				json: () => Promise.reject(new Error('Server error'))
			} as Response)
		);

		// Enter email and submit
		await fireEvent.input(input, { target: { value: 'test@example.com' } });
		await fireEvent.submit(screen.getByRole('textbox').closest('form')!);

		// Wait for error state
		await waitFor(() => {
			expect(screen.getByText(/failed to subscribe/i)).toBeInTheDocument();
		});

		// Check if button is re-enabled
		expect(screen.getByRole('button')).not.toBeDisabled();
	});

	it('is accessible', async () => {
		render(NewsletterCTA, { target: document.getElementById('app')! });

		// Check input accessibility
		const input = screen.getByRole('textbox');
		expect(input).toHaveAttribute('type', 'email');
		expect(input).toHaveAttribute('required');
		expect(input).toHaveAttribute('placeholder', 'your.email@example.com');

		// Check button accessibility
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('type', 'submit');
		expect(button).toHaveTextContent('Subscribe ⟶');

		// Check form accessibility
		const form = input.closest('form');
		expect(form).toHaveAttribute('novalidate');
	});
});
