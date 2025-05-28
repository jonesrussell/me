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
		// Arrange
		const contactLink = page.locator('text=Get in touch');
		await expect(contactLink).toBeVisible();

		// Act & Assert - Combine navigation and URL check
		await Promise.all([
			page.waitForURL('**/contact'),
			contactLink.click()
		]);

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
			// Navigate to the route with faster load strategy
			await page.goto(`/${route.path}`, { waitUntil: 'domcontentloaded' });

			// Check desktop navigation
			const desktopNav = page.locator('.desktop-nav');
			await expect(desktopNav).toBeVisible();

			// Check all navigation links in parallel
			await Promise.all(
				routes.map(async link => {
					const navLink = desktopNav.locator(`a[href="/${link.path}"]`);
					await expect(navLink).toBeVisible();
					await expect(navLink).toContainText(link.text);
				})
			);
		}
	});

	test('should handle 404 errors gracefully', async ({ page }) => {
		// Arrange & Act
		const response = await page.goto('/non-existent-page', { waitUntil: 'domcontentloaded' });

		// Assert
		expect(response?.status()).toBe(404);

		// Check error page content
		await expect(page.locator('.error')).toBeVisible();
		await expect(page.locator('h1')).toContainText('404');
		await expect(page.locator('h2')).toContainText('Page Not Found');
		await expect(page.locator('p')).toContainText('The page you are looking for does not exist');

		// Verify navigation options
		const homeLink = page.locator('a[href="/me"]');
		await expect(homeLink).toBeVisible();
		await expect(homeLink).toContainText('Return Home');

		// Verify error page has proper meta tags
		await expect(page).toHaveTitle('404 - Page Not Found');
		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription).toHaveAttribute(
			'content',
			'The page you are looking for could not be found. Return to the homepage.'
		);
	});
});
