import { test, expect } from '@playwright/test';

test.describe('Blog Series - PSR', () => {
	test.setTimeout(90000);

	test('should navigate to series page from blog', async ({ page }) => {
		await page.goto('/blog', { waitUntil: 'domcontentloaded' });
		const seriesCard = page.locator('text=PHP-FIG Standards Guide');
		await expect(seriesCard).toBeVisible();
		await seriesCard.click();
		await expect(page).toHaveURL(/\/blog\/series\/psr/);
	});

	test('should render all 5 groups', async ({ page }) => {
		await page.goto('/blog/series/psr', { waitUntil: 'domcontentloaded' });
		await expect(page.locator('text=Foundation')).toBeVisible();
		await expect(page.locator('text=Core Infrastructure')).toBeVisible();
		await expect(page.locator('text=HTTP Stack')).toBeVisible();
		await expect(page.locator('text=Data & Caching')).toBeVisible();
		await expect(page.locator('text=Specialized')).toBeVisible();
	});

	test('should render PSR entry cards', async ({ page }) => {
		await page.goto('/blog/series/psr', { waitUntil: 'domcontentloaded' });
		await expect(page.getByText('PSR-1', { exact: true }).first()).toBeVisible();
		await expect(
			page.getByRole('link', { name: 'PSR-1: Basic Coding Standard' })
		).toBeVisible();
	});

	test('should have completion checkboxes for each entry', async ({ page }) => {
		await page.goto('/blog/series/psr', { waitUntil: 'domcontentloaded' });

		// All 14 PSR entries should have checkboxes
		const checkboxes = page.locator('input[type="checkbox"]');
		await expect(checkboxes).toHaveCount(14);

		// First checkbox should have accessible label
		const firstCheckbox = checkboxes.first();
		await expect(firstCheckbox).toHaveAttribute('aria-label', /Mark PSR-\d+ as completed/);
		await expect(firstCheckbox).not.toBeChecked();
	});

	test('should show progress bar', async ({ page }) => {
		await page.goto('/blog/series/psr', { waitUntil: 'domcontentloaded' });
		const progressBar = page.locator('[role="progressbar"]');
		await expect(progressBar).toBeVisible();
	});

	test('should expand View Code section', async ({ page }) => {
		await page.goto('/blog/series/psr', { waitUntil: 'domcontentloaded' });
		const viewCodeButton = page.locator('text=View Code').first();
		await viewCodeButton.click();

		await expect(page.locator('pre code').first()).toBeVisible();
	});

	test('should have getting started section', async ({ page }) => {
		await page.goto('/blog/series/psr', { waitUntil: 'domcontentloaded' });
		await expect(page.locator('text=Getting Started')).toBeVisible();
		await expect(page.locator('text=composer install')).toBeVisible();
	});
});
