import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import NewsletterCTA from './NewsletterCTA.svelte';

const { getSchema, submitForm } = vi.hoisted(() => ({
	getSchema: vi.fn(),
	submitForm: vi.fn()
}));

vi.mock('$lib/config/env', () => ({
	config: {
		goformsApiUrl: 'https://api.goformx.test',
		formPublicKeys: { contact: '', newsletter: 'gfpk_newsletter_test' },
		isDev: false,
		isProd: true
	}
}));

vi.mock('$lib/services/form-service', () => ({
	createIdempotencyKey: vi.fn(() => 'newsletter-attempt-1'),
	FormService: {
		getInstance: vi.fn(() => ({ getSchema, submitForm }))
	}
}));

vi.mock('$lib/utils/error-handler', () => ({
	createError: vi.fn((message, error, context) => ({
		message,
		context,
		stack: error?.stack
	})),
	logErrorDebounced: vi.fn(),
	withErrorHandling: vi.fn(async operation => {
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
		getSchema.mockResolvedValue({
			version: 1,
			schema: {
				$schema: 'https://json-schema.org/draft/2020-12/schema',
				type: 'object',
				properties: {
					email: { type: 'string', format: 'email' },
					consent: { type: 'boolean', const: true },
					source: { type: 'string' },
					notice_version: { type: 'string', const: '2026-08-28' }
				},
				required: ['email', 'consent', 'source', 'notice_version'],
				additionalProperties: false
			}
		});
		submitForm.mockResolvedValue({ submission: { id: 'submission-1' }, replayed: false });
	});

	it('renders a consent-aware form', () => {
		const { container } = render(NewsletterCTA);
		expect(container.querySelector('input[type="email"]')).toBeTruthy();
		expect(container.querySelector('input[type="checkbox"][required]')).toBeTruthy();
		expect(screen.getByText(/occasional notes from the workbench/i)).toBeTruthy();
	});

	it('requires explicit consent and submits the published schema version', async () => {
		render(NewsletterCTA);
		const submit = screen.getByRole('button', { name: /join the build notes/i });
		await waitFor(() => expect(submit).not.toBeDisabled());

		await fireEvent.input(screen.getByRole('textbox'), {
			target: { value: 'reader@example.com' }
		});
		await fireEvent.submit(submit.closest('form')!);
		expect(submitForm).not.toHaveBeenCalled();
		expect(screen.getByRole('alert')).toHaveTextContent(/please confirm/i);

		await fireEvent.click(screen.getByRole('checkbox'));
		await fireEvent.submit(submit.closest('form')!);

		await waitFor(() =>
			expect(submitForm).toHaveBeenCalledWith(
				'gfpk_newsletter_test',
				{
					email: 'reader@example.com',
					consent: true,
					source: '/',
					notice_version: '2026-08-28'
				},
				'newsletter-attempt-1',
				1
			)
		);
		expect(screen.getByRole('status')).toHaveTextContent(/signup has been recorded/i);
	});

	it('keeps submission disabled when the published schema is incompatible', async () => {
		getSchema.mockResolvedValueOnce({
			version: 1,
			schema: {
				$schema: 'https://json-schema.org/draft/2020-12/schema',
				type: 'object',
				properties: { email: { type: 'string', format: 'email' } },
				required: ['email']
			}
		});
		render(NewsletterCTA);
		const submit = screen.getByRole('button', { name: /join the build notes/i });
		await waitFor(() => expect(screen.getByText(/form configuration unavailable/i)).toBeTruthy());
		expect(submit).toBeDisabled();
	});
});
