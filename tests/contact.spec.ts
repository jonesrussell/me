import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
	test.setTimeout(90000);

	test('should load the contact page successfully', async ({ page }) => {
		await page.goto('/contact', { waitUntil: 'domcontentloaded' });

		await Promise.all([
			expect(page.locator('h2').first()).toBeVisible({ timeout: 15000 }),
			expect(page.getByRole('heading', { name: 'Get in Touch' })).toBeVisible({ timeout: 15000 }),
			expect(page.locator('.contact-list')).toBeVisible({ timeout: 15000 })
		]);

		await expect(page.locator('.contact-form')).toBeVisible({ timeout: 5000 });
	});

	test('should display the contact form fields', async ({ page }) => {
		await page.goto('/contact', { waitUntil: 'domcontentloaded' });

		await expect(page.locator('#cf-email')).toBeVisible({ timeout: 5000 });
		await expect(page.locator('#cf-message')).toBeVisible({ timeout: 5000 });
		await expect(page.locator('#cf-referral')).toBeVisible({ timeout: 5000 });
		await expect(page.getByRole('button', { name: /send_message/ })).toBeVisible({ timeout: 5000 });
	});

	test('should display social media links correctly', async ({ page }) => {
		await page.goto('/contact', { waitUntil: 'domcontentloaded' });

		const socialLinks = [
			{ text: 'github @jonesrussell' },
			{ text: 'linkedin jonesrussell42' }
		];

		for (const { text } of socialLinks) {
			const link = page.locator('.contact-list li').filter({ hasText: text }).first();
			await expect(link).toBeVisible({ timeout: 10000 });
		}
	});

	test('should have proper page title and meta description', async ({ page }) => {
		await page.goto('/contact', { waitUntil: 'domcontentloaded' });

		await expect(page).toHaveTitle('Contact Me | Russell Jones', {
			timeout: 10000
		});

		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription).toHaveAttribute(
			'content',
			'Get in touch with me for collaboration, questions, or just to say ahnii!',
			{ timeout: 10000 }
		);
	});
});
