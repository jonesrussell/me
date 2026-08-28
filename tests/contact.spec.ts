import { expect, test, type Page } from '@playwright/test';

const schema = {
	$schema: 'https://json-schema.org/draft/2020-12/schema',
	title: 'Contact Russell',
	type: 'object',
	properties: {
		name: { type: 'string', title: 'Name', minLength: 1, maxLength: 100 },
		email: { type: 'string', title: 'Email', format: 'email' },
		message: { type: 'string', title: 'Message', minLength: 10, maxLength: 5000 },
		company: { type: 'string', title: 'Company', maxLength: 100 },
		referral: {
			type: 'string',
			title: 'How did you find me?',
			enum: ['GitHub', 'LinkedIn', 'Search', 'Referral', 'Other']
		}
	},
	required: ['name', 'email', 'message'],
	additionalProperties: false
};

async function mockPublishedSchema(page: Page) {
	await page.route('**/v1/public/forms/**/schema', route =>
		route.fulfill({
			status: 200,
			contentType: 'application/schema+json',
			headers: {
				'X-GoFormX-Schema-Version': '3',
				'Access-Control-Expose-Headers': 'X-GoFormX-Schema-Version'
			},
			body: JSON.stringify(schema)
		})
	);
}

async function openContactForm(page: Page) {
	await mockPublishedSchema(page);
	await page.goto('/contact', { waitUntil: 'domcontentloaded' });
	await expect(page.locator('.contact-form')).toBeVisible();
}

async function fillValidSubmission(page: Page) {
	await page.locator('#cf-name').fill('Ada Lovelace');
	await page.locator('#cf-email').fill('ada@example.com');
	await page.locator('#cf-message').fill('I would like to discuss a schema-first project.');
}

test.describe('Contact Page', () => {
	test.setTimeout(90000);
	test.describe.configure({ mode: 'serial' });

	test('loads schema-driven fields and page metadata', async ({ page }) => {
		await openContactForm(page);

		await expect(page.getByRole('heading', { name: 'Get in Touch' })).toBeVisible();
		await expect(page.locator('#cf-name')).toHaveAttribute('required', '');
		await expect(page.locator('#cf-email')).toHaveAttribute('type', 'email');
		await expect(page.locator('#cf-message')).toHaveAttribute('minlength', '10');
		await expect(page.locator('#cf-company')).not.toHaveAttribute('required', '');
		await expect(page.locator('#cf-referral')).toHaveRole('combobox');
		await expect(page).toHaveTitle('Contact Me | Russell Jones');
		await expect(page.locator('meta[name="description"]')).toHaveAttribute(
			'content',
			'Get in touch with me for collaboration, questions, or just to say ahnii!'
		);
	});

	test('submits the public v1 envelope without a credential', async ({ page }) => {
		let requestHeaders: Record<string, string> = {};
		let requestBody: unknown;
		await page.route('**/v1/public/forms/**/submissions', async route => {
			requestHeaders = route.request().headers();
			requestBody = route.request().postDataJSON();
			await route.fulfill({
				status: 202,
				contentType: 'application/json',
				body: JSON.stringify({
					data: {
						id: 'submission-id',
						formId: 'form-id',
						schemaVersion: 3,
						status: 'accepted',
						data: {},
						submittedAt: '2026-08-27T00:00:00Z'
					}
				})
			});
		});
		await openContactForm(page);
		await fillValidSubmission(page);

		await page.getByRole('button', { name: /send_message/ }).click();

		await expect(page.getByText('// message transmitted')).toBeVisible();
		expect(requestBody).toEqual({
			data: {
				name: 'Ada Lovelace',
				email: 'ada@example.com',
				message: 'I would like to discuss a schema-first project.'
			}
		});
		expect(requestHeaders['idempotency-key']).toHaveLength(36);
		expect(requestHeaders['x-goformx-schema-version']).toBe('3');
		expect(requestHeaders).not.toHaveProperty('x-api-key');
		expect(requestHeaders).not.toHaveProperty('authorization');
	});

	test('renders path-addressable validation errors at the matching control', async ({ page }) => {
		await page.route('**/v1/public/forms/**/submissions', route =>
			route.fulfill({
				status: 422,
				contentType: 'application/json',
				body: JSON.stringify({
					error: {
						code: 'validation_failed',
						message: 'Submission does not match schema version 3.',
						requestId: 'req_test',
						fields: [{ pointer: '/data/email', code: 'format', message: 'Must be a valid email.' }]
					}
				})
			})
		);
		await openContactForm(page);
		await fillValidSubmission(page);

		await page.getByRole('button', { name: /send_message/ }).click();

		await expect(page.locator('#cf-email')).toBeFocused();
		await expect(page.locator('#cf-email')).toHaveAttribute('aria-invalid', 'true');
		await expect(page.locator('#cf-email-error')).toHaveText('Must be a valid email.');
	});

	test('shows a recoverable rate-limit response', async ({ page }) => {
		await page.route('**/v1/public/forms/**/submissions', route =>
			route.fulfill({
				status: 429,
				headers: { 'Retry-After': '30' },
				contentType: 'application/json',
				body: JSON.stringify({
					error: { code: 'rate_limited', message: 'Slow down.', requestId: 'req_test' }
				})
			})
		);
		await openContactForm(page);
		await fillValidSubmission(page);

		await page.getByRole('button', { name: /send_message/ }).click();

		await expect(page.locator('.contact-form .submit-error')).toContainText(
			'Please wait a moment and try again.'
		);
		await expect(page.getByRole('button', { name: /send_message/ })).toBeEnabled();
	});

	test('shows a recoverable network failure', async ({ page }) => {
		await page.route('**/v1/public/forms/**/submissions', route => route.abort('failed'));
		await openContactForm(page);
		await fillValidSubmission(page);

		await page.getByRole('button', { name: /send_message/ }).click();

		await expect(page.locator('.contact-form .submit-error')).toContainText(
			'Check your connection and try again.'
		);
		await expect(page.getByRole('button', { name: /send_message/ })).toBeEnabled();
	});

	test('reuses the idempotency key when an uncertain submission is replayed', async ({ page }) => {
		const keys: string[] = [];
		let attempt = 0;
		await page.route('**/v1/public/forms/**/submissions', async route => {
			keys.push(route.request().headers()['idempotency-key']);
			attempt += 1;
			if (attempt === 1) return route.abort('failed');
			return route.fulfill({
				status: 202,
				headers: { 'Idempotency-Replayed': 'true' },
				contentType: 'application/json',
				body: JSON.stringify({
					data: {
						id: 'submission-id',
						formId: 'form-id',
						schemaVersion: 3,
						status: 'accepted',
						data: {},
						submittedAt: '2026-08-27T00:00:00Z'
					}
				})
			});
		});
		await openContactForm(page);
		await fillValidSubmission(page);

		await page.getByRole('button', { name: /send_message/ }).click();
		await expect(page.locator('.contact-form .submit-error')).toBeVisible();
		await page.getByRole('button', { name: /send_message/ }).click();

		await expect(page.getByText('// message transmitted')).toBeVisible();
		expect(keys).toHaveLength(2);
		expect(keys[1]).toBe(keys[0]);
	});
});
