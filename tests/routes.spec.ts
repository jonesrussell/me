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
		// Wait for the blog link to be visible
		const blogLink = page.getByRole('link', { name: '📝 Read my technical articles' });
		await expect(blogLink).toBeVisible();

		// Click the blog link and wait for navigation
		await Promise.all([
			page.waitForURL('**/blog'),
			blogLink.click()
		]);

		// Wait for the blog page structure to be visible
		await expect(page.locator('.blog')).toBeVisible();
		await expect(page.locator('text=Web Developer Blog')).toBeVisible();

		// Wait for loading state to complete and posts to be visible
		await Promise.race([
			page.waitForSelector('.loading', { state: 'hidden' }),
			page.waitForSelector('.blog-post-grid')
		]);

		// Verify posts are visible
		await expect(page.locator('.blog-post-grid')).toBeVisible();
	});

	test('should navigate to projects page', async ({ page }) => {
		// Wait for the projects link to be visible
		const projectsLink = page.getByRole('link', { name: '🚀 Browse my open source projects' });
		await expect(projectsLink).toBeVisible();

		// Click the link and wait for navigation
		await Promise.all([
			page.waitForURL('**/projects'),
			projectsLink.click()
		]);

		// Wait for the projects page structure to be visible
		await expect(page.locator('.projects')).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Open Source Projects' }).first()).toBeVisible();
	});

	test('should navigate to contact page', async ({ page }) => {
		// Arrange - Use a more specific selector for the contact link
		const contactLink = page.getByRole('link', { name: 'Get in touch' });
		await expect(contactLink).toBeVisible();

		// Act & Assert - Add better error handling and logging
		try {
			await Promise.all([
				page.waitForURL('**/contact', { timeout: 10000 }),
				contactLink.click()
			]);

			// Verify we're on the contact page
			await expect(page.locator('.contact')).toBeVisible();
		} catch (error) {
			console.error('Navigation failed:', error);
			throw error;
		}
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
