import { test, expect } from '@playwright/test';

test('release does not offer unqualified newsletter capture', async ({ page }) => {
	for (const path of ['/', '/contact', '/blog']) {
		await page.goto(path, { waitUntil: 'networkidle' });
		await expect(page.locator('.newsletter-cta')).toHaveCount(0);
		await expect(page.locator('form').filter({ hasText: /newsletter|subscribe/i })).toHaveCount(0);
	}
});
