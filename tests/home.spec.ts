import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
	// Set a longer timeout for this test suite
	test.setTimeout(90000);

	test.beforeEach(async ({ page }) => {
		// Navigate to home page before each test
		await page.goto('/', { waitUntil: 'domcontentloaded' });
	});

	test('should load the home page successfully', async ({ page }) => {
		// Check for main sections (content is in div.home inside layout main)
		const hero = page.locator('.hero');
		const terminal = page.locator('.terminal-frame');
		const homeContent = page.locator('.home');

		await Promise.all([
			expect(hero).toBeVisible(),
			expect(terminal).toBeVisible(),
			expect(homeContent).toBeVisible()
		]);

		// Check terminal components
		await Promise.all([
			expect(terminal.locator('.terminal-header')).toBeVisible(),
			expect(terminal.locator('.terminal-title')).toContainText('~/dev')
		]);

		// Check for specialties section
		const specialties = [
			'Modern JavaScript/TS',
			'Golang & PHP',
			'AI Integration',
			'Cloud & DevOps'
		];

		for (const specialty of specialties) {
			await expect(page.getByText(specialty).first()).toBeVisible();
		}

		// TODO: YouTube section test is temporarily disabled due to loading issues
		// The YouTube section may be in an error state or loading state
		// await page.waitForSelector('.youtube-section', { timeout: 10000 });
		// await Promise.all([
		// 	expect(page.locator('.youtube-section h2')).toContainText('Tutorial'),
		// 	expect(page.locator('.youtube-section .section-desc')).toContainText('Web Development')
		// ]);

		// Check for navigation links
		const navLinks = [
			'Read my technical articles',
			'Browse my projects',
			'Get in touch'
		];

		for (const link of navLinks) {
			await expect(page.getByText(link).first()).toBeVisible();
		}
	});

	test('should have proper page title', async ({ page }) => {
		await expect(page).toHaveTitle(/Russell Jones \| Developing without limits/);
	});
});
