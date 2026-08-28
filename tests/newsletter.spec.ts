import { expect, test } from '@playwright/test';

const schema = {
	$schema: 'https://json-schema.org/draft/2020-12/schema',
	type: 'object',
	properties: {
		email: { type: 'string', format: 'email', maxLength: 254 },
		consent: { type: 'boolean', const: true },
		source: { type: 'string', minLength: 1, maxLength: 512 },
		notice_version: { type: 'string', const: '2026-08-28' }
	},
	required: ['email', 'consent', 'source', 'notice_version'],
	additionalProperties: false
};

test('records consent-aware build-notes signup through the published schema', async ({ page }) => {
	let requestBody: unknown;
	let requestHeaders: Record<string, string> = {};
	await page.route('**/v1/public/forms/gfpk_newsletter_test/schema', route =>
		route.fulfill({
			status: 200,
			contentType: 'application/schema+json',
			headers: {
				'X-GoFormX-Schema-Version': '1',
				'Access-Control-Expose-Headers': 'X-GoFormX-Schema-Version'
			},
			body: JSON.stringify(schema)
		})
	);
	await page.route('**/v1/public/forms/gfpk_newsletter_test/submissions', route => {
		requestBody = route.request().postDataJSON();
		requestHeaders = route.request().headers();
		return route.fulfill({
			status: 202,
			contentType: 'application/json',
			body: JSON.stringify({
				data: {
					id: 'newsletter-submission-id',
					formId: 'newsletter-form-id',
					schemaVersion: 1,
					status: 'accepted',
					data: {},
					submittedAt: '2026-08-28T00:00:00Z'
				}
			})
		});
	});

	await page.goto('/', { waitUntil: 'domcontentloaded' });
	const form = page.locator('.newsletter form');
	const submit = form.getByRole('button', { name: /join the build notes/i });
	await expect(submit).toBeEnabled();
	await expect(form.getByRole('checkbox')).toHaveAttribute('required', '');

	await form.getByRole('textbox').fill('reader@example.com');
	await form.getByRole('checkbox').check();
	await submit.click();

	await expect(form.getByRole('status')).toContainText('signup has been recorded');
	expect(requestBody).toEqual({
		data: {
			email: 'reader@example.com',
			consent: true,
			source: '/',
			notice_version: '2026-08-28'
		}
	});
	expect(requestHeaders['x-goformx-schema-version']).toBe('1');
	expect(requestHeaders['idempotency-key']).toHaveLength(36);
	expect(requestHeaders).not.toHaveProperty('authorization');
});
