import { test, expect } from '@playwright/test';

test.describe('Projects Page', () => {
	test.setTimeout(90000);

	test('should load the projects page successfully', async ({ page }) => {
		// Navigate to projects page
		await page.goto('/projects', { waitUntil: 'domcontentloaded' });

		// Check main sections
		await Promise.all([
			expect(page.locator('h1')).toBeVisible({ timeout: 15000 }),
			expect(page.locator('h2').first()).toBeVisible({ timeout: 15000 }),
			expect(page.locator('.project-grid')).toBeVisible({ timeout: 15000 })
		]);

		// Wait for projects to load
		await page.waitForSelector('.project-grid > div', { timeout: 30000 });

		// Verify projects are visible
		const projects = page.locator('.project-grid > div');
		const count = await projects.count();
		expect(count).toBeGreaterThan(0);
	});

	test('should display project details correctly', async ({ page }) => {
		await page.goto('/projects', { waitUntil: 'domcontentloaded' });

		// Wait for projects to load
		await page.waitForSelector('.project-grid > div', { timeout: 30000 });

		// Check project content (each card has multiple links; assert first link visible)
		const firstProject = page.locator('.project-grid > div').first();
		await Promise.all([
			expect(firstProject.locator('h3')).toBeVisible({ timeout: 10000 }),
			expect(firstProject.locator('p')).toBeVisible({ timeout: 10000 }),
			expect(firstProject.locator('a').first()).toBeVisible({ timeout: 10000 })
		]);
	});

	test('should handle project links correctly', async ({ page }) => {
		await page.goto('/projects', { waitUntil: 'domcontentloaded' });

		// Wait for projects to load
		await page.waitForSelector('.project-grid > div', { timeout: 30000 });

		// Each project card has multiple links (title, site, GitHub); assert all have target/rel
		const projects = page.locator('.project-grid > div');
		const count = await projects.count();
		for (let i = 0; i < count; i++) {
			const links = projects.nth(i).locator('a');
			const linkCount = await links.count();
			for (let j = 0; j < linkCount; j++) {
				const link = links.nth(j);
				await expect(link).toHaveAttribute('target', '_blank');
				await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
			}
		}
	});
});
