import { test, expect } from '@playwright/test';

test.describe('Resources Page', () => {
	test.setTimeout(90000);

	test('should load the resources page successfully', async ({ page }) => {
		await page.goto('/resources', { waitUntil: 'domcontentloaded' });

		await Promise.all([
			expect(page.locator('h1', { hasText: 'Resources' })).toBeVisible({ timeout: 15000 }),
			expect(page.locator('.filter-bar')).toBeVisible({ timeout: 15000 })
		]);

		const sections = page.locator('.category-section');
		const count = await sections.count();
		expect(count).toBeGreaterThanOrEqual(3);
	});

	test('should display resource cards with content', async ({ page }) => {
		await page.goto('/resources', { waitUntil: 'domcontentloaded' });

		await page.waitForSelector('.resource-card', { timeout: 30000 });

		const firstCard = page.locator('.resource-card').first();
		await Promise.all([
			expect(firstCard.locator('h3')).toBeVisible({ timeout: 10000 }),
			expect(firstCard.locator('a')).toBeVisible({ timeout: 10000 })
		]);
	});

	test('should filter by category', async ({ page }) => {
		await page.goto('/resources', { waitUntil: 'domcontentloaded' });

		await page.waitForSelector('.resource-card', { timeout: 30000 });

		const allCount = await page.locator('.resource-card').count();

		await page.getByRole('button', { name: 'Languages & Frameworks' }).click();

		const filteredCount = await page.locator('.resource-card').count();
		expect(filteredCount).toBeLessThan(allCount);
		expect(filteredCount).toBeGreaterThan(0);
	});

	test('should search resources', async ({ page }) => {
		await page.goto('/resources', { waitUntil: 'domcontentloaded' });

		await page.waitForSelector('.resource-card', { timeout: 30000 });

		await page.getByLabel('Search resources').fill('Go');

		const results = page.locator('.resource-card');
		const count = await results.count();
		expect(count).toBeGreaterThan(0);
	});

	test('should initialize filters from URL params', async ({ page }) => {
		await page.goto('/resources?category=Languages+%26+Frameworks', {
			waitUntil: 'domcontentloaded'
		});

		await page.waitForSelector('.resource-card', { timeout: 30000 });

		const sections = page.locator('.category-section');
		const count = await sections.count();
		expect(count).toBe(1);

		const sectionTitle = sections.first().locator('h2');
		await expect(sectionTitle).toHaveText('Languages & Frameworks');
	});

	test('should have proper external links', async ({ page }) => {
		await page.goto('/resources', { waitUntil: 'domcontentloaded' });

		await page.waitForSelector('.resource-card', { timeout: 30000 });

		const links = page.locator('.resource-card h3 a');
		const count = await links.count();
		for (let i = 0; i < Math.min(count, 5); i++) {
			const link = links.nth(i);
			await expect(link).toHaveAttribute('target', '_blank');
			await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
		}
	});
});
