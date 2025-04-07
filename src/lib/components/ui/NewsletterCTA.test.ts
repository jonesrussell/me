import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import NewsletterCTA from './NewsletterCTA.svelte';

describe('NewsletterCTA', () => {
	it('renders newsletter form', () => {
		const { container } = render(NewsletterCTA);
		expect(container.querySelector('h3')?.textContent).toBe('Stay Updated');
		expect(container.querySelector('input[type="email"]')).toBeInTheDocument();
		expect(
			container.querySelector('button[type="submit"]')
		).toBeInTheDocument();
	});

	it('handles empty email submission', async () => {
		const { container } = render(NewsletterCTA);
		const form = container.querySelector('form');
		await fireEvent.submit(form as HTMLFormElement);

		// Form should still be visible (not showing success message)
		expect(container.querySelector('form')).toBeInTheDocument();
		expect(container.querySelector('.success-message')).not.toBeInTheDocument();
	});

	it('handles successful submission', async () => {
		global.fetch = vi.fn().mockResolvedValue({ ok: true });
		const { container } = render(NewsletterCTA);
		const input = container.querySelector(
			'input[type="email"]'
		) as HTMLInputElement;
		const form = container.querySelector('form') as HTMLFormElement;

		await fireEvent.input(input, { target: { value: 'test@example.com' } });
		await fireEvent.submit(form);

		// Wait for state updates
		await new Promise((resolve) => setTimeout(resolve, 100));

		expect(container.querySelector('.success-message')).toBeInTheDocument();
		expect(container.querySelector('.success-message')?.textContent).toContain(
			'Message sent successfully'
		);
	});

	it('shows loading state during submission', async () => {
		global.fetch = vi
			.fn()
			.mockImplementation(
				() =>
					new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 100))
			);

		const { container } = render(NewsletterCTA);
		const input = container.querySelector(
			'input[type="email"]'
		) as HTMLInputElement;
		const form = container.querySelector('form') as HTMLFormElement;

		await fireEvent.input(input, { target: { value: 'test@example.com' } });
		await fireEvent.submit(form);

		const button = container.querySelector('button');
		expect(button?.getAttribute('disabled')).toBe('');
		expect(container.querySelector('.loading')).toBeInTheDocument();
	});

	it('has proper styling', () => {
		const { container } = render(NewsletterCTA);
		const newsletter = container.querySelector('.newsletter');

		expect(newsletter).toHaveStyle({
			display: 'flex',
			'flex-direction': 'column',
			gap: 'var(--ch2)',
			width: '100%',
			padding: 'var(--space-8)',
			background: 'var(--color-mix-light) var(--color-mix-light)'
		});
	});
});
