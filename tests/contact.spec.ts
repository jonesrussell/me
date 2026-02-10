import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
	test.setTimeout(90000);

	test('should load the contact page successfully', async ({ page }) => {
		// Navigate to contact page
		await page.goto('/contact', { waitUntil: 'domcontentloaded' });

		// Check main sections
		await Promise.all([
			expect(page.locator('h2').first()).toBeVisible({ timeout: 15000 }),
			expect(page.getByRole('heading', { name: 'Get in Touch' })).toBeVisible({ timeout: 15000 }),
			expect(page.locator('.contact-list')).toBeVisible({ timeout: 15000 })
		]);

		// Contact form is replaced by GoFormX placeholder until integration
		await expect(page.locator('[data-goformx-placeholder]').first()).toBeVisible({ timeout: 5000 });
	});

	test('should display social media links correctly', async ({ page }) => {
		await page.goto('/contact', { waitUntil: 'domcontentloaded' });

		// Define social media platforms and their expected text
		const socialLinks = [
			{ text: 'GitHub: @jonesrussell' },
			{ text: 'LinkedIn: jonesrussell42' }
		];

		// Check each platform's text
		for (const { text } of socialLinks) {
			const link = page.locator('.contact-list li').filter({ hasText: text }).first();
			await expect(link).toBeVisible({ timeout: 10000 });
		}
	});

	test('should have proper page title and meta description', async ({ page }) => {
		await page.goto('/contact', { waitUntil: 'domcontentloaded' });

		// Check page title
		await expect(page).toHaveTitle('Contact Me | Russell Jones', {
			timeout: 10000
		});

		// Check meta description
		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription).toHaveAttribute(
			'content',
			'Get in touch with me for collaboration, questions, or just to say ahnii!',
			{ timeout: 10000 }
		);
	});
});
