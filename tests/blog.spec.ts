import { test, expect } from '@playwright/test';

test.describe('Blog Page', () => {
	test.setTimeout(90000);

	test('should load the blog page successfully', async ({ page }) => {
		// Navigate to blog page
		await page.goto('/blog', { waitUntil: 'domcontentloaded' });

		// Check main sections
		await Promise.all([
			expect(page.locator('h1')).toBeVisible({ timeout: 15000 }),
			expect(page.locator('text=Web Developer Blog')).toBeVisible({ timeout: 15000 }),
			expect(page.locator('.posts')).toBeVisible({ timeout: 15000 })
		]);

		// Check for loading state
		await Promise.race([
			page.waitForSelector('.loading', { state: 'hidden', timeout: 30000 }),
			page.waitForSelector('.blog-post', { timeout: 30000 })
		]);

		// Verify posts are visible
		const posts = page.locator('.blog-post');
		await expect(posts.first()).toBeVisible({ timeout: 10000 });
		await expect(posts).toHaveCount(5, { timeout: 10000 });
	});

	test('should display post details correctly', async ({ page }) => {
		await page.goto('/blog', { waitUntil: 'domcontentloaded' });

		// Wait for posts to load
		await page.waitForSelector('.blog-post', { timeout: 30000 });

		// Check post content
		const firstPost = page.locator('.blog-post').first();
		await Promise.all([
			expect(firstPost.locator('.title')).toBeVisible({ timeout: 10000 }),
			expect(firstPost.locator('.date')).toBeVisible({ timeout: 10000 }),
			expect(firstPost.locator('.description')).toHaveText(/.*/, { timeout: 10000 }),
			expect(firstPost.locator('.tags')).toBeVisible({ timeout: 10000 })
		]);
	});

	test('should handle load more functionality', async ({ page }) => {
		await page.goto('/blog', { waitUntil: 'domcontentloaded' });

		// Wait for posts to load
		await page.waitForSelector('.blog-post', { timeout: 30000 });

		// Check if load more button is visible
		const loadMoreButton = page.locator('.load-more-button');
		await expect(loadMoreButton).toBeVisible({ timeout: 10000 });

		// Click load more
		await loadMoreButton.click();

		// Wait for new posts to load
		await page.waitForSelector('.blog-post', { timeout: 30000 });
	});

	test('should handle error state', async ({ page }) => {
		await page.goto('/blog', { waitUntil: 'domcontentloaded' });

		// Wait for posts to load
		await page.waitForSelector('.blog-post', { timeout: 30000 });

		// Check if error state is not visible when there's no error
		const errorState = page.locator('.error-state');
		await expect(errorState).not.toBeVisible({ timeout: 10000 });
	});

	test('should have proper page title and meta description', async ({ page }) => {
		await page.goto('/blog', { waitUntil: 'domcontentloaded' });

		// Check page title
		await expect(page).toHaveTitle(
			'Technical Blog | Russell Jones - Web Development & Open Source',
			{ timeout: 10000 }
		);

		// Check meta description
		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription).toHaveAttribute(
			'content',
			'Articles and tutorials on web development, Go programming, cloud technologies, and open source software by Russell Jones. Practical insights and best practices.',
			{ timeout: 10000 }
		);
	});
});
