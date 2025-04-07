import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import NewsletterCTA from './NewsletterCTA.svelte';

describe('NewsletterCTA', () => {
	it('renders newsletter form', () => {
		const { container } = render(NewsletterCTA);
		const form = container.querySelector('form');
		expect(form).toBeInTheDocument();
		expect(container.querySelector('input[type="email"]')).toBeInTheDocument();
		expect(container.querySelector('button[type="submit"]')).toBeInTheDocument();
	});

	it('handles empty email submission', () => {
		const { container } = render(NewsletterCTA);
		const form = container.querySelector('form');
		form?.dispatchEvent(new Event('submit', { bubbles: true }));
		expect(container.querySelector('.error-message')).not.toBeInTheDocument();
	});

	it('handles successful submission', async () => {
		const { container } = render(NewsletterCTA);
		const input = container.querySelector('input[type="email"]');
		const form = container.querySelector('form');

		if (input instanceof HTMLInputElement) {
			input.value = 'test@example.com';
			input.dispatchEvent(new Event('input', { bubbles: true }));
		}

		form?.dispatchEvent(new Event('submit', { bubbles: true }));
		await new Promise((resolve) => setTimeout(resolve, 0));
		expect(container.querySelector('.loading')).toBeInTheDocument();
	});

	it('shows loading state during submission', async () => {
		const { container } = render(NewsletterCTA);
		const input = container.querySelector('input[type="email"]');
		const form = container.querySelector('form');

		if (input instanceof HTMLInputElement) {
			input.value = 'test@example.com';
			input.dispatchEvent(new Event('input', { bubbles: true }));
		}

		form?.dispatchEvent(new Event('submit', { bubbles: true }));
		await new Promise((resolve) => setTimeout(resolve, 0));
		expect(container.querySelector('.loading')).toBeInTheDocument();
	});

	it('has proper styling', () => {
		const { container } = render(NewsletterCTA);
		const newsletter = container.querySelector('.newsletter');
		expect(newsletter).toBeInTheDocument();
		expect(newsletter).toHaveClass('newsletter');
	});
});
