import { test, expect } from '@playwright/test';

test.describe('Resources Page', () => {
	test.setTimeout(90000);

	test('should load the resources page successfully', async ({ page }) => {
		// Navigate to resources page
		await page.goto('/resources', { waitUntil: 'domcontentloaded' });

		// Check main sections
		await Promise.all([
			expect(page.locator('h1')).toBeVisible({ timeout: 15000 }),
			expect(page.locator('text=Developer Resources')).toBeVisible({ timeout: 15000 }),
			expect(page.locator('.sections')).toBeVisible({ timeout: 15000 })
		]);

		// Wait for sections to load
		await page.waitForSelector('.category-section', { timeout: 30000 });

		// Verify sections are visible and there are at least 3 sections
		const sections = page.locator('.category-section');
		const count = await sections.count();
		expect(count).toBeGreaterThanOrEqual(3);
	});

	test('should display resource sections correctly', async ({ page }) => {
		await page.goto('/resources', { waitUntil: 'domcontentloaded' });

		// Wait for sections to load
		await page.waitForSelector('.category-section', { timeout: 30000 });

		// Check section content
		const sections = page.locator('.category-section');
		const count = await sections.count();
		expect(count).toBeGreaterThan(0);

		// Check first section
		const firstSection = sections.first();
		await Promise.all([
			expect(firstSection.locator('h2')).toBeVisible({ timeout: 10000 }),
			expect(firstSection.locator('.resource-grid')).toBeVisible({ timeout: 10000 })
		]);
	});

	test('should display resource details correctly', async ({ page }) => {
		await page.goto('/resources', { waitUntil: 'domcontentloaded' });

		// Wait for sections to load
		await page.waitForSelector('.category-section', { timeout: 30000 });

		// Get first resource from any section
		const firstResource = page.locator('.resource-grid > div').first();
		await expect(firstResource).toBeVisible({ timeout: 10000 });

		// Check resource content
		await Promise.all([
			expect(firstResource.locator('h3')).toBeVisible({ timeout: 10000 }),
			expect(firstResource.locator('p')).toBeVisible({ timeout: 10000 }),
			expect(firstResource.locator('a')).toBeVisible({ timeout: 10000 })
		]);
	});

	test('should handle resource links correctly', async ({ page }) => {
		await page.goto('/resources', { waitUntil: 'domcontentloaded' });

		// Wait for sections to load
		await page.waitForSelector('.category-section', { timeout: 30000 });

		// Check resource links
		const resources = page.locator('.resource-grid > div');
		const count = await resources.count();
		for (let i = 0; i < count; i++) {
			const link = resources.nth(i).locator('a');
			await expect(link).toHaveAttribute('target', '_blank');
			await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
		}
	});
});
