import { describe, expect, it, vi } from 'vitest';
import {
	FormNetworkError,
	FormService,
	FormServiceError,
	FormValidationError
} from './form-service';

const PUBLIC_KEY = 'gfpk_1234567890abcdefghijkl';
const API_URL = 'https://api.goformx.test';

function jsonResponse(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json', ...headers }
	});
}

describe('FormService', () => {
	it('fetches a published schema and captures its immutable version', async () => {
		const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
			jsonResponse(
				{
					$schema: 'https://json-schema.org/draft/2020-12/schema',
					type: 'object',
					properties: {}
				},
				200,
				{ 'X-GoFormX-Schema-Version': '3' }
			)
		);
		const service = new FormService(API_URL, fetcher);

		const result = await service.getSchema(PUBLIC_KEY);

		expect(result.version).toBe(3);
		expect(fetcher).toHaveBeenCalledWith(`${API_URL}/v1/public/forms/${PUBLIC_KEY}/schema`, {
			headers: { Accept: 'application/schema+json' }
		});
	});

	it('submits the v1 envelope with idempotency and schema pinning', async () => {
		const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
			jsonResponse(
				{
					data: {
						id: 'submission-id',
						formId: 'form-id',
						schemaVersion: 3,
						status: 'accepted',
						data: { email: 'ada@example.com' },
						submittedAt: '2026-08-27T00:00:00Z'
					}
				},
				202,
				{ 'Idempotency-Replayed': 'true' }
			)
		);
		const service = new FormService(API_URL, fetcher);

		const result = await service.submitForm(
			PUBLIC_KEY,
			{ email: 'ada@example.com' },
			'contact-submit-0001',
			3
		);

		expect(result.replayed).toBe(true);
		expect(fetcher).toHaveBeenCalledWith(
			`${API_URL}/v1/public/forms/${PUBLIC_KEY}/submissions`,
			expect.objectContaining({
				method: 'POST',
				headers: expect.objectContaining({
					'Idempotency-Key': 'contact-submit-0001',
					'X-GoFormX-Schema-Version': '3'
				}),
				body: JSON.stringify({ data: { email: 'ada@example.com' } })
			})
		);
	});

	it('maps JSON pointers in validation errors to field names', async () => {
		const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
			jsonResponse(
				{
					error: {
						code: 'validation_failed',
						message: 'Submission does not match schema version 3.',
						requestId: 'req_test',
						fields: [{ pointer: '/data/email', code: 'format', message: 'Must be a valid email.' }]
					}
				},
				422
			)
		);
		const service = new FormService(API_URL, fetcher);

		const error = await service
			.submitForm(PUBLIC_KEY, { email: 'bad' }, 'contact-submit-0001', 3)
			.catch((caught: unknown) => caught);

		expect(error).toBeInstanceOf(FormValidationError);
		expect((error as FormValidationError).fieldErrors[0]).toEqual({
			field: 'email',
			pointer: '/data/email',
			code: 'format',
			message: 'Must be a valid email.'
		});
	});

	it('exposes rate-limit retry metadata', async () => {
		const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
			jsonResponse({ error: { code: 'rate_limited', message: 'Slow down.' } }, 429, {
				'Retry-After': '30'
			})
		);
		const service = new FormService(API_URL, fetcher);

		const error = await service
			.submitForm(PUBLIC_KEY, { email: 'ada@example.com' }, 'contact-submit-0001')
			.catch((caught: unknown) => caught);

		expect(error).toBeInstanceOf(FormServiceError);
		expect(error).toMatchObject({ status: 429, code: 'rate_limited', retryAfterSeconds: 30 });
	});

	it('turns fetch failures into a recoverable network error', async () => {
		const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('fetch failed'));
		const service = new FormService(API_URL, fetcher);

		await expect(service.getSchema(PUBLIC_KEY)).rejects.toBeInstanceOf(FormNetworkError);
	});

	it('does not announce success for an unconfirmed submission response', async () => {
		const fetcher = vi
			.fn<typeof fetch>()
			.mockResolvedValue(jsonResponse({ data: { status: 'failed' } }, 202));
		const service = new FormService(API_URL, fetcher);
		await expect(
			service.submitForm(PUBLIC_KEY, { email: 'ada@example.com' }, 'contact-submit-0001', 3)
		).rejects.toMatchObject({ code: 'unconfirmed_submission' });
	});
});
