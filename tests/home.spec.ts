import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
	// Set a longer timeout for this test suite
	test.setTimeout(90000);

	test.beforeEach(async ({ page }) => {
		// Navigate to home page before each test
		await page.goto('/', { waitUntil: 'domcontentloaded' });
	});

	test('should load the home page successfully', async ({ page }) => {
		// Check for the founder-led homepage and ecosystem.
		const hero = page.locator('.hero');
		const homeContent = page.locator('.landing');

		await Promise.all([expect(hero).toBeVisible(), expect(homeContent).toBeVisible()]);
		await expect(page.getByRole('heading', { level: 1 })).toContainText(
			'Digital infrastructure that stays in your hands.'
		);
		for (const project of ['Waaseyaa', 'Anokii', 'North Cloud']) {
			await expect(page.getByText(project).first()).toBeVisible();
		}
		await expect(page.getByRole('link', { name: 'Work with me' })).toBeVisible();
	});

	test('should have proper page title', async ({ page }) => {
		await expect(page).toHaveTitle(/Russell Jones \| Founder & Software Architect/);
	});
});
