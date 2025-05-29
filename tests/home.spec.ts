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
			expect(page.locator('.section-desc:has-text("Web Development")')).toBeVisible()
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

	test('should have proper page title', async ({ page }) => {
		await expect(page).toHaveTitle(/Russell Jones \| Developing without limits/);
	});
});
