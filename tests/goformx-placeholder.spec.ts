import { test, expect } from '@playwright/test';

/**
 * Integration test: all three form surfaces (layout newsletter slot,
 * contact page form column, home CTA container) must render the same
 * GoFormX placeholder component. Prevents drift between surfaces.
 */
test.describe('GoFormX placeholder surfaces', () => {
	test.setTimeout(30000);

	const PLACEHOLDER_SELECTOR = '[data-goformx-placeholder]';
	const CORE_TEXT = 'GoFormX (Coming Soon)';

	test('home page shows placeholder in CTA section', async ({ page }) => {
		await page.goto('/', { waitUntil: 'domcontentloaded' });

		const ctaContainer = page.locator('#cta-form-container');
		await expect(ctaContainer).toBeVisible();
		const placeholder = ctaContainer.locator(PLACEHOLDER_SELECTOR);
		await expect(placeholder).toBeVisible();
		await expect(placeholder).toContainText(CORE_TEXT);
	});

	test('layout newsletter slot shows placeholder on every page', async ({ page }) => {
		await page.goto('/projects', { waitUntil: 'domcontentloaded' });

		const placeholder = page.locator(PLACEHOLDER_SELECTOR).first();
		await expect(placeholder).toBeVisible();
		await expect(placeholder).toContainText(CORE_TEXT);
	});

	test('contact page shows placeholder in form column', async ({ page }) => {
		await page.goto('/contact', { waitUntil: 'domcontentloaded' });

		const placeholder = page.locator(PLACEHOLDER_SELECTOR);
		await expect(placeholder).toBeVisible();
		await expect(placeholder).toContainText(CORE_TEXT);
	});

	test('all three surfaces render same placeholder content', async ({ page }) => {
		const urls = ['/', '/contact', '/projects'];
		const seenTexts: string[] = [];

		for (const url of urls) {
			await page.goto(url, { waitUntil: 'domcontentloaded' });
			const placeholder = page.locator(PLACEHOLDER_SELECTOR).first();
			await expect(placeholder).toBeVisible();
			const subline = await placeholder.locator('text=A unified form engine').textContent();
			if (subline) seenTexts.push(subline);
		}

		expect(seenTexts.length).toBeGreaterThanOrEqual(1);
		expect(seenTexts.every((t) => t.includes('unified form engine'))).toBe(true);
	});
});
