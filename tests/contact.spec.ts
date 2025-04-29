import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
	test.setTimeout(90000);

	test('should load the contact page successfully', async ({ page }) => {
		// Navigate to contact page
		await page.goto('/contact', { waitUntil: 'domcontentloaded' });

		// Check main sections
		await Promise.all([
			expect(page.locator('h1')).toBeVisible({ timeout: 15000 }),
			expect(page.locator('text=Get in Touch')).toBeVisible({ timeout: 15000 }),
			expect(page.locator('.contact-links')).toBeVisible({ timeout: 15000 })
		]);
	});

	test('should display social media links correctly', async ({ page }) => {
		await page.goto('/contact', { waitUntil: 'domcontentloaded' });

		// Define social media platforms
		const socialLinks = ['github', 'linkedin'];

		// Check each platform's main link
		for (const platform of socialLinks) {
			const link = page.locator(`.contact-link[href*="${platform.toLowerCase()}"]`);
			await expect(link).toBeVisible({ timeout: 10000 });
			await expect(link).toHaveAttribute('target', '_blank');
			await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
		}
	});

	test('should have proper page title and meta description', async ({ page }) => {
		await page.goto('/contact', { waitUntil: 'domcontentloaded' });

		// Check page title
		await expect(page).toHaveTitle('Contact | Russell Jones - Web Development & Open Source', {
			timeout: 10000
		});

		// Check meta description
		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription).toHaveAttribute(
			'content',
			'Get in touch with Russell Jones for web development projects, technical consulting, or collaboration opportunities.',
			{ timeout: 10000 }
		);
	});
});
