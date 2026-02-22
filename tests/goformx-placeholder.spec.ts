import { test, expect } from '@playwright/test';

/**
 * The GoFormX placeholder component is used on the home page CTA section.
 * Other surfaces (layout newsletter slot, contact page) now use live form components.
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
});
