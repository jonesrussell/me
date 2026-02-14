import { test, expect } from '@playwright/test';

test.describe('Route Navigation', () => {
	// Set a longer timeout for this test suite
	test.setTimeout(90000);

	test.beforeEach(async ({ page }) => {
		// Clear cookies only, skip localStorage
		await page.context().clearCookies();

		// Navigate to home page with faster load strategy
		await page.goto('/', { waitUntil: 'domcontentloaded' });
	});

	test('navigates to blog page', async ({ page }) => {
		// Wait for the blog link to be visible and actionable
		const blogLink = page.getByRole('link', { name: '📝 Read my technical articles' });
		await expect(blogLink).toBeVisible();
		await expect(blogLink).toBeEnabled();

		// Click the blog link and wait for navigation
		await Promise.all([
			page.waitForURL('**/blog', { timeout: 30000 }),
			blogLink.click()
		]);

		// Wait for the page to be fully loaded
		await page.waitForLoadState('domcontentloaded');

		// Wait for the blog page structure to be visible
		await expect(page.locator('.blog')).toBeVisible();
		await expect(page.locator('.terminal-header')).toBeVisible();

		// Wait for loading state to complete and posts to be visible
		await Promise.race([
			page.waitForSelector('.loading-container', { state: 'hidden' }),
			page.waitForSelector('.hero-post')
		]);

		// Verify hero post is visible
		await expect(page.locator('.hero-post')).toBeVisible();
	});

	test('should navigate to projects page', async ({ page }) => {
		// Wait for the projects link to be visible and actionable
		const projectsLink = page.getByRole('link', { name: '🚀 Browse my projects' });
		await expect(projectsLink).toBeVisible();
		await expect(projectsLink).toBeEnabled();

		// Click the link and wait for navigation
		await Promise.all([
			page.waitForURL('**/projects', { timeout: 30000 }),
			projectsLink.click()
		]);

		// Wait for the page to be fully loaded
		await page.waitForLoadState('domcontentloaded');

		// Wait for the projects page structure to be visible
		await expect(page.locator('.projects')).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Projects' }).first()).toBeVisible();
		await expect(page.getByRole('link', { name: 'North Cloud' }).first()).toBeVisible();
	});

	test('should maintain consistent navigation across pages', async ({ page }) => {
		// Arrange
		const routes = [
			{ path: 'blog', text: 'Blog' },
			{ path: 'projects', text: 'Projects' },
			{ path: 'contact', text: 'Contact' }
		];

		// Act & Assert - Check each route sequentially
		for (const route of routes) {
			// Navigate to the route with faster load strategy
			await page.goto(`/${route.path}`, { waitUntil: 'domcontentloaded' });

			// Check desktop navigation
			const desktopNav = page.locator('.desktop-nav');
			await expect(desktopNav).toBeVisible();

			// Check all navigation links
			for (const link of routes) {
				const navLink = desktopNav.locator(`a[href="/${link.path}"]`);
				await expect(navLink).toBeVisible();
				await expect(navLink).toContainText(link.text);
			}
		}
	});
});
