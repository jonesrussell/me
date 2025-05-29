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
			expect(page.locator('.blog-post-grid')).toBeVisible()
		]);

		// Check for loading state
		await Promise.race([
			page.waitForSelector('.loading', { state: 'hidden' }),
			page.waitForSelector('.blog-post')
		]);

		// Verify posts are visible
		const posts = page.locator('.blog-post');
		await expect(posts.first()).toBeVisible();
	});

	test('should display post details correctly', async ({ page }) => {
		// Wait for posts to load
		await page.waitForSelector('.blog-post');

		// Check post content
		const firstPost = page.locator('.blog-post').first();
		await Promise.all([
			expect(firstPost.locator('.title')).toBeVisible(),
			expect(firstPost.locator('.date')).toBeVisible(),
			expect(firstPost.locator('.description')).toHaveText(/.*/),
			expect(firstPost.locator('.tags')).toBeVisible()
		]);
	});

	test('should handle error state', async ({ page }) => {
		// Wait for posts to load
		await page.waitForSelector('.blog-post');

		// Check if error state is not visible when there's no error
		const errorState = page.locator('.error-state');
		await expect(errorState).not.toBeVisible();

		// Verify posts are still visible
		const posts = page.locator('.blog-post');
		await expect(posts.first()).toBeVisible();
	});
});
