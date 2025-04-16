import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import NewsletterCTA from './NewsletterCTA.svelte';

describe('NewsletterCTA', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		global.fetch = vi.fn();
	});

	it('renders the component with initial state', () => {
		render(NewsletterCTA);

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
		render(NewsletterCTA);

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
		render(NewsletterCTA);

		const input = screen.getByPlaceholderText('your.email@example.com');
		const button = screen.getByRole('button');

		// Set up mock fetch to delay response
		(global.fetch as any).mockImplementationOnce(() => new Promise(() => {}));

		// Enter email and submit
		await fireEvent.input(input, { target: { value: 'test@example.com' } });
		await fireEvent.submit(screen.getByRole('textbox').closest('form')!);

		// Check loading state
		expect(button).toBeDisabled();
		expect(screen.getByText('Loading')).toBeInTheDocument();
	});

	it('handles successful submission', async () => {
		render(NewsletterCTA);

		const input = screen.getByPlaceholderText('your.email@example.com');
		const button = screen.getByRole('button');

		// Mock successful response
		(global.fetch as any).mockImplementationOnce(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({})
			})
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
		render(NewsletterCTA);

		const input = screen.getByPlaceholderText('your.email@example.com');
		const button = screen.getByRole('button');

		// Mock error response
		(global.fetch as any).mockImplementationOnce(() =>
			Promise.resolve({
				ok: false,
				status: 500
			})
		);

		// Enter email and submit
		await fireEvent.input(input, { target: { value: 'test@example.com' } });
		await fireEvent.submit(screen.getByRole('textbox').closest('form')!);

		// Wait for error state
		await waitFor(() => {
			expect(screen.getByText(/failed to subscribe/i)).toBeInTheDocument();
		});

		// Check if button is re-enabled
		expect(button).not.toBeDisabled();
	});

	it('is accessible', async () => {
		render(NewsletterCTA);

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
