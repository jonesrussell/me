import { test, expect } from '@playwright/test';

test.describe('Blog Page', () => {
	test.setTimeout(90000);

	test.beforeEach(async ({ page }) => {
		// Navigate to blog page before each test
		await page.goto('/blog', { waitUntil: 'domcontentloaded' });
	});

	test('should load the blog page successfully', async ({ page }) => {
		// Check page hero (Blog heading) is present
		await expect(page.getByRole('heading', { name: 'Blog', level: 1 })).toBeVisible();

		// Wait for posts to load
		await Promise.race([
			page.waitForSelector('.loading-container', { state: 'hidden' }),
			page.waitForSelector('.hero-post')
		]);

		// Verify hero post is visible
		const heroPost = page.locator('.hero-post');
		await expect(heroPost).toBeVisible();
	});

	test('should display hero post with LATEST badge', async ({ page }) => {
		// Wait for hero post to load
		await page.waitForSelector('.hero-post');

		const heroPost = page.locator('.hero-post');
		await Promise.all([
			expect(heroPost.locator('.hero-post-badge')).toHaveText('[LATEST]'),
			expect(heroPost.locator('.hero-post-title')).toBeVisible(),
			expect(heroPost.locator('.hero-post-meta')).toBeVisible(),
			expect(heroPost.locator('.hero-post-excerpt')).toBeVisible()
		]);
	});

	test('should display post grid with correct details', async ({ page }) => {
		// Wait for cards to load
		await page.waitForSelector('.card');

		// Check post card content
		const firstCard = page.locator('.card').first();
		await Promise.all([
			expect(firstCard.locator('.title')).toBeVisible(),
			expect(firstCard.locator('time')).toBeVisible(),
			expect(firstCard.locator('.excerpt')).toHaveText(/.*/)
		]);

		// Categories are in bracket format now — check meta-tags
		const metaTags = firstCard.locator('.meta-tags');
		const metaTagsCount = await metaTags.count();
		if (metaTagsCount > 0) {
			await expect(metaTags).toBeVisible();
		}
	});

	test('should display featured series as pinned process', async ({ page }) => {
		const pinnedProcess = page.locator('.pinned-process');
		await expect(pinnedProcess).toBeVisible();
		await expect(pinnedProcess.locator('.process-label')).toHaveText('[SERIES]');
	});

	test('should handle error state', async ({ page }) => {
		// Wait for posts to load
		await page.waitForSelector('.hero-post');

		// Check if error state is not visible when there's no error
		const errorState = page.locator('.error-state');
		await expect(errorState).not.toBeVisible();

		// Verify hero post is still visible
		const heroPost = page.locator('.hero-post');
		await expect(heroPost).toBeVisible();
	});

	test('should navigate to on-site blog post when clicking hero post', async ({ page }) => {
		await page.waitForSelector('.hero-post');

		const heroLink = page.locator('a.hero-post');
		await expect(heroLink).toBeVisible();

		// Click should stay on-site (no target="_blank")
		await heroLink.click();

		// URL should be /blog/[slug] on this site, not external
		await expect(page).toHaveURL(/\/blog\/.+/);

		// Article content loads async (fetchPost); allow time in CI
		await expect(page.locator('.blog-post')).toBeVisible({ timeout: 15_000 });
		await expect(page.locator('.blog-post .post-content')).toBeVisible();
	});
});
