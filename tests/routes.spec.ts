import { test, expect } from '@playwright/test';

test.describe('Route Navigation', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to home page before each test
		await page.goto('/');
		// Wait for the site container to be visible
		await page.waitForSelector('.site');
	});

	test('should navigate to blog page', async ({ page }) => {
		// Arrange
		const blogLink = page.locator('text=Read my technical articles');
		await expect(blogLink).toBeVisible();

		// Act
		await blogLink.click();

		// Assert
		await expect(page).toHaveURL(/.*blog/);
		await page.waitForSelector('.site');
		await expect(page.locator('.blog')).toBeVisible();
		await expect(page.locator('text=Web Developer Blog')).toBeVisible();
		await expect(page.locator('.posts')).toBeVisible();
	});

	test('should navigate to projects page', async ({ page }) => {
		// Arrange
		const projectsLink = page.locator('text=Browse my open source projects');
		await expect(projectsLink).toBeVisible();

		// Act
		await projectsLink.click();

		// Assert
		await expect(page).toHaveURL(/.*projects/);
		await page.waitForSelector('.site');
		await expect(page.locator('.projects')).toBeVisible();
	});

	test('should navigate to contact page', async ({ page }) => {
		// Arrange
		const contactLink = page.locator('text=Get in touch');
		await expect(contactLink).toBeVisible();

		// Act
		await contactLink.click();

		// Assert
		await expect(page).toHaveURL(/.*contact/);
		await page.waitForSelector('.site');
		await expect(page.locator('.contact')).toBeVisible();
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
			// Navigate to the route
			await page.goto(`/${route.path}`, { waitUntil: 'networkidle' });
			await page.waitForSelector('.site');

			// Check desktop navigation
			const desktopNav = page.locator('.desktop-nav');
			await expect(desktopNav).toBeVisible();

			for (const link of routes) {
				const navLink = desktopNav.locator(`a[href="/${link.path}"]`);
				await expect(navLink).toBeVisible({ timeout: 10000 });
				await expect(navLink).toContainText(link.text);
			}
		}
	});

	test('should handle 404 errors gracefully', async ({ page }) => {
		// Arrange & Act
		const response = await page.goto('/non-existent-page');

		// Assert
		expect(response?.status()).toBe(404);
		await page.waitForSelector('.site');
		await expect(page.locator('.error')).toBeVisible();
		await expect(page.locator('h1')).toContainText('404');
		await expect(page.locator('a[href="/me"]')).toBeVisible();
	});
});
