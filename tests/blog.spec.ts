import { test, expect } from '@playwright/test';

test.describe('Blog Page', () => {
	test.setTimeout(90000);

	test.beforeEach(async ({ page }) => {
		// Navigate to blog page before each test
		await page.goto('/blog', { waitUntil: 'domcontentloaded' });
	});

	test('should load the blog page successfully', async ({ page }) => {
		// Check main sections
		await Promise.all([
			expect(page.locator('h1')).toBeVisible(),
			expect(page.locator('text=Web Developer Blog')).toBeVisible(),
			expect(page.locator('.blog-section')).toBeVisible()
		]);

		// Check for loading state
		await Promise.race([
			page.waitForSelector('.loading', { state: 'hidden' }),
			page.waitForSelector('.card')
		]);

		// Verify posts are visible
		const posts = page.locator('.card');
		await expect(posts.first()).toBeVisible();
	});

	test('should display post details correctly', async ({ page }) => {
		// Wait for posts to load
		await page.waitForSelector('.card');

		// Check post content
		const firstPost = page.locator('.card').first();
		await Promise.all([
			expect(firstPost.locator('.title')).toBeVisible(),
			expect(firstPost.locator('time')).toBeVisible(),
			expect(firstPost.locator('.excerpt')).toHaveText(/.*/)
		]);

		// Categories are conditional — only rendered when the post has them
		const categories = firstPost.locator('.categories');
		const categoriesCount = await categories.count();
		if (categoriesCount > 0) {
			await expect(categories).toBeVisible();
		}
	});

	test('should handle error state', async ({ page }) => {
		// Wait for posts to load
		await page.waitForSelector('.card');

		// Check if error state is not visible when there's no error
		const errorState = page.locator('.error-state');
		await expect(errorState).not.toBeVisible();

		// Verify posts are still visible
		const posts = page.locator('.card');
		await expect(posts.first()).toBeVisible();
	});
});
