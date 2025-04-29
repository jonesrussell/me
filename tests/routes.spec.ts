import { test, expect } from '@playwright/test';

test.describe('Route Navigation', () => {
	// Set a longer timeout for this test suite
	test.setTimeout(90000);

	test.beforeEach(async ({ page }) => {
		// Navigate to home page before each test with faster load strategy
		await page.goto('/', { waitUntil: 'domcontentloaded' });
	});

	test('navigates to blog page', async ({ page }) => {
		// Wait for the blog link to be visible
		const blogLink = page.getByRole('link', { name: '📝 Read my technical articles' });
		await expect(blogLink).toBeVisible({ timeout: 10000 });

		// Click the blog link and wait for navigation
		await blogLink.click();
		await page.waitForURL('**/blog', { timeout: 20000 });

		// Wait for the blog page structure to be visible
		await expect(page.locator('.blog')).toBeVisible({ timeout: 10000 });
		await expect(page.locator('text=Web Developer Blog')).toBeVisible({ timeout: 10000 });

		// Wait for loading state to complete and posts to be visible
		await Promise.race([
			page.waitForSelector('.loading', { state: 'hidden', timeout: 30000 }),
			page.waitForSelector('.posts', { timeout: 30000 })
		]);

		// Verify posts are visible
		await expect(page.locator('.posts')).toBeVisible({ timeout: 10000 });
	});

	test('should navigate to projects page', async ({ page }) => {
		// Wait for the projects link to be visible
		const projectsLink = page.getByRole('link', { name: '🚀 Browse my open source projects' });
		await expect(projectsLink).toBeVisible({ timeout: 10000 });

		// Click the link and wait for navigation
		await projectsLink.click();

		// Wait for the projects page structure to be visible
		await expect(page.locator('.projects')).toBeVisible({ timeout: 20000 });
		await expect(page.getByRole('heading', { name: 'Open Source Projects' }).first()).toBeVisible({
			timeout: 10000
		});

		// Verify URL after content is loaded
		await expect(page).toHaveURL(/.*projects/, { timeout: 10000 });
	});

	test('should navigate to contact page', async ({ page }) => {
		// Arrange
		const contactLink = page.locator('text=Get in touch');
		await expect(contactLink).toBeVisible({ timeout: 10000 });

		// Act
		await Promise.all([
			page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
			contactLink.click()
		]);

		// Assert
		await expect(page).toHaveURL(/.*contact/, { timeout: 10000 });
		await expect(page.locator('.contact')).toBeVisible({ timeout: 10000 });
	});

	test('should maintain consistent navigation across pages', async ({ page }) => {
		// Arrange
		const routes = [
			{ path: 'blog', text: 'Blog' },
			{ path: 'projects', text: 'Projects' },
			{ path: 'contact', text: 'Contact' }
		];

		// Act & Assert
		for (const route of routes) {
			// Navigate to the route with faster load strategy
			await page.goto(`/${route.path}`, { waitUntil: 'domcontentloaded' });

			// Check desktop navigation
			const desktopNav = page.locator('.desktop-nav');
			await expect(desktopNav).toBeVisible({ timeout: 10000 });

			// Check all navigation links in parallel
			await Promise.all(
				routes.map(async link => {
					const navLink = desktopNav.locator(`a[href="/${link.path}"]`);
					await expect(navLink).toBeVisible({ timeout: 10000 });
					await expect(navLink).toContainText(link.text, { timeout: 10000 });
				})
			);
		}
	});

	test('should handle 404 errors gracefully', async ({ page }) => {
		// Arrange & Act
		const response = await page.goto('/non-existent-page', { waitUntil: 'domcontentloaded' });

		// Assert
		expect(response?.status()).toBe(404);
		await expect(page.locator('.error')).toBeVisible({ timeout: 10000 });
		await expect(page.locator('h1')).toContainText('404', { timeout: 10000 });
		await expect(page.locator('a[href="/me"]')).toBeVisible({ timeout: 10000 });
	});
});
