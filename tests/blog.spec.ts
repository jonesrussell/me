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
		await expect(posts).toHaveCount(12);
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

	test('should handle load more functionality', async ({ page }) => {
		// Wait for initial posts to load
		await page.waitForSelector('.blog-post');

		// Get initial post count
		const initialPosts = page.locator('.blog-post');
		const initialCount = await initialPosts.count();

		// Check if load more button is visible
		const loadMoreButton = page.locator('.load-more-button');
		await expect(loadMoreButton).toBeVisible();

		// Click load more and wait for new posts
		await Promise.all([
			page.waitForResponse(response => response.url().includes('/api/posts')),
			loadMoreButton.click()
		]);

		// Wait for new posts to be added
		await expect(async () => {
			const newCount = await page.locator('.blog-post').count();
			expect(newCount).toBeGreaterThan(initialCount);
		}).toPass();

		// Verify the new posts are visible
		const newPosts = page.locator('.blog-post');
		await expect(newPosts).toHaveCount(initialCount + 6); // Assuming 6 posts per load
	});

	test('should handle error state', async ({ page }) => {
		// Wait for posts to load
		await page.waitForSelector('.blog-post');

		// Check if error state is not visible when there's no error
		const errorState = page.locator('.error-state');
		await expect(errorState).not.toBeVisible();
	});

	test('should have proper page metadata', async ({ page }) => {
		// Check page title
		await expect(page).toHaveTitle(
			'Technical Blog | Russell Jones - Web Development & Open Source'
		);

		// Check meta description
		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription).toHaveAttribute(
			'content',
			'Articles and tutorials on web development, Go programming, cloud technologies, and open source software by Russell Jones. Practical insights and best practices.'
		);

		// Check Open Graph metadata
		await Promise.all([
			expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
				'content',
				'Technical Blog | Russell Jones - Web Development & Open Source'
			),
			expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
				'content',
				'Articles and tutorials on web development, Go programming, cloud technologies, and open source software by Russell Jones. Practical insights and best practices.'
			),
			expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website'),
			expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', /.*\/blog/)
		]);

		// Check Twitter Card metadata
		await Promise.all([
			expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image'),
			expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
				'content',
				'Technical Blog | Russell Jones - Web Development & Open Source'
			),
			expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute(
				'content',
				'Articles and tutorials on web development, Go programming, cloud technologies, and open source software by Russell Jones. Practical insights and best practices.'
			)
		]);
	});
});
