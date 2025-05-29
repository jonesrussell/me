import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
	// Set a longer timeout for this test suite
	test.setTimeout(90000);

	test.beforeEach(async ({ page }) => {
		// Navigate to home page before each test
		await page.goto('/', { waitUntil: 'domcontentloaded' });
	});

	test('should load the home page successfully', async ({ page }) => {
		// Check for main sections
		const hero = page.locator('.hero');
		const terminal = page.locator('.terminal-frame');
		const main = page.locator('main.home');

		await Promise.all([
			expect(hero).toBeVisible(),
			expect(terminal).toBeVisible(),
			expect(main).toBeVisible()
		]);

		// Check terminal components
		await Promise.all([
			expect(terminal.locator('.terminal-header')).toBeVisible(),
			expect(terminal.locator('.terminal-title')).toContainText('~/developer')
		]);

		// Check for specialties section
		const specialties = [
			'Modern JavaScript/TS',
			'Golang & PHP',
			'AI Integration',
			'Cloud & DevOps'
		];

		for (const specialty of specialties) {
			await expect(page.locator(`text=${specialty}`)).toBeVisible();
		}

		// Check for YouTube section
		await Promise.all([
			expect(page.locator('text=Tutorial')).toBeVisible(),
			expect(page.locator('text=Web Development')).toBeVisible()
		]);

		// Check for navigation links
		const navLinks = [
			'Read my technical articles',
			'Browse my open source projects',
			'Get in touch'
		];

		for (const link of navLinks) {
			await expect(page.locator(`text=${link}`)).toBeVisible();
		}
	});

	test('should handle dynamic content loading', async ({ page }) => {
		// Wait for initial content to load
		await page.waitForSelector('.dynamic-content');

		// Get initial content count
		const initialItems = page.locator('.dynamic-content-item');
		const initialCount = await initialItems.count();

		// Check if load more button is visible
		const loadMoreButton = page.locator('.load-more-button');
		await expect(loadMoreButton).toBeVisible();

		// Click load more and wait for new content
		await Promise.all([
			page.waitForResponse(response => response.url().includes('/api/content')),
			loadMoreButton.click()
		]);

		// Wait for new content to be added
		await expect(async () => {
			const newCount = await page.locator('.dynamic-content-item').count();
			expect(newCount).toBeGreaterThan(initialCount);
		}).toPass();

		// Verify the new content is visible
		const newItems = page.locator('.dynamic-content-item');
		await expect(newItems).toHaveCount(initialCount + 3); // Assuming 3 items per load
	});

	test('should have proper page title', async ({ page }) => {
		await expect(page).toHaveTitle(/Russell Jones \| Developing without limits/);
	});

	test('should have proper meta description', async ({ page }) => {
		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription).toHaveAttribute(
			'content',
			'Limitless Developer from Canada specializing in JavaScript, Go, Cloud Technologies, and Open Source. Building elegant solutions with modern web technologies.'
		);

		// Check Open Graph metadata
		await Promise.all([
			expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
				'content',
				'Russell Jones | Developing without limits'
			),
			expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
				'content',
				'Limitless Developer from Canada specializing in JavaScript, Go, Cloud Technologies, and Open Source. Building elegant solutions with modern web technologies.'
			),
			expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website'),
			expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', /.*\/$/)
		]);

		// Check Twitter Card metadata
		await Promise.all([
			expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image'),
			expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
				'content',
				'Russell Jones | Developing without limits'
			),
			expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute(
				'content',
				'Limitless Developer from Canada specializing in JavaScript, Go, Cloud Technologies, and Open Source. Building elegant solutions with modern web technologies.'
			)
		]);
	});
});
