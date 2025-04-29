import { test, expect } from '@playwright/test';

test.describe('Route Navigation', () => {
	// Set a longer timeout for this test suite
	test.setTimeout(90000);

	test.beforeEach(async ({ page }) => {
		// Navigate to home page before each test with faster load strategy
		await page.goto('/', { waitUntil: 'domcontentloaded' });
	});

	test('should navigate to blog page', async ({ page }) => {
		// Arrange
		const blogLink = page.locator('text=Read my technical articles');
		await expect(blogLink).toBeVisible({ timeout: 10000 });

		// Act - Click and wait for navigation
		await blogLink.click();

		// Retry navigation if needed
		await page.waitForURL(/.*blog/, { timeout: 30000 }).catch(async () => {
			console.log('Retrying blog navigation...');
			await blogLink.click();
			await page.waitForURL(/.*blog/, { timeout: 30000 });
		});

		// Assert - First check the basic page structure
		await expect(page.locator('.blog')).toBeVisible({ timeout: 30000 });
		await expect(page.locator('text=Web Developer Blog')).toBeVisible({ timeout: 30000 });

		// Wait for loading state to complete
		const loading = page.locator('.loading');
		if (await loading.isVisible()) {
			await loading.waitFor({ state: 'hidden', timeout: 30000 });
		}

		// Then check for posts container (it should be visible even if empty)
		await expect(page.locator('.posts')).toBeVisible({ timeout: 30000 });

		// Note: We don't check for actual posts since the feed might be empty during testing
	});

	test('should navigate to projects page', async ({ page }) => {
		// Arrange
		const projectsLink = page.locator('text=Browse my open source projects');
		await expect(projectsLink).toBeVisible({ timeout: 10000 });

		// Act
		await Promise.all([
			page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
			projectsLink.click()
		]);

		// Assert
		await expect(page).toHaveURL(/.*projects/, { timeout: 10000 });
		await expect(page.locator('.projects')).toBeVisible({ timeout: 10000 });
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
