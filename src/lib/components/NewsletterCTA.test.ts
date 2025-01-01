import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import NewsletterCTA from './NewsletterCTA.svelte';

describe('NewsletterCTA', () => {
	it('renders newsletter form', () => {
		const { container } = render(NewsletterCTA);
		expect(container.querySelector('h3')?.textContent).toContain('Stay Updated');
		expect(container.querySelector('input[type="email"]')).toBeInTheDocument();
		expect(container.querySelector('button[type="submit"]')).toBeInTheDocument();
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
		const { container } = render(NewsletterCTA);
		const input = container.querySelector('input[type="email"]') as HTMLInputElement;
		const form = container.querySelector('form') as HTMLFormElement;

		await fireEvent.input(input, { target: { value: 'test@example.com' } });
		await fireEvent.submit(form);

		// Wait for the simulated API call
		await new Promise(resolve => setTimeout(resolve, 1100));

		expect(container.querySelector('.success-message')).toBeInTheDocument();
		expect(container.querySelector('form')).not.toBeInTheDocument();
		expect(container.textContent).toContain('Thanks for subscribing');
	});

	it('shows loading state during submission', async () => {
		const { container } = render(NewsletterCTA);
		const input = container.querySelector('input[type="email"]') as HTMLInputElement;
		const form = container.querySelector('form') as HTMLFormElement;

		await fireEvent.input(input, { target: { value: 'test@example.com' } });
		await fireEvent.submit(form);

		const button = container.querySelector('button');
		expect(button).toBeDisabled();
		expect(button?.textContent?.trim()).toBe('[ Processing... ]');
		expect(input).toBeDisabled();
	});

	it('has proper styling', () => {
		const { container } = render(NewsletterCTA);
		const cta = container.querySelector('.newsletter-cta');
		const content = container.querySelector('.cta-content');
		
		expect(cta).toHaveStyle({
			width: '100%',
			background: 'var(--bg-alt)'
		});
		
		expect(content).toHaveStyle({
			background: 'var(--bg-color)',
			'box-shadow': '4px 4px 0 var(--border-color)'
		});
	});
}); 