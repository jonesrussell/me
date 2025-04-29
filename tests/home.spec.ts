import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
	// Set a longer timeout for this test suite
	test.setTimeout(90000);

	test('should load the home page successfully', async ({ page }) => {
		// Arrange
		await page.goto('/', { waitUntil: 'domcontentloaded' }); // Changed from default to domcontentloaded

		// Act & Assert
		// Check for main sections with longer timeouts
		const hero = page.locator('.hero');
		const terminal = page.locator('.terminal-frame');
		const main = page.locator('main.home');

		await Promise.all([
			expect(hero).toBeVisible({ timeout: 15000 }),
			expect(terminal).toBeVisible({ timeout: 15000 }),
			expect(main).toBeVisible({ timeout: 15000 })
		]);

		// Check terminal components
		await Promise.all([
			expect(terminal.locator('.terminal-header')).toBeVisible({ timeout: 10000 }),
			expect(terminal.locator('.terminal-title')).toContainText('~/developer', { timeout: 10000 })
		]);

		// Check for specialties section
		const specialties = [
			'Modern JavaScript/TS',
			'Golang & PHP',
			'AI Integration',
			'Cloud & DevOps'
		];

		for (const specialty of specialties) {
			await expect(page.locator(`text=${specialty}`)).toBeVisible({ timeout: 10000 });
		}

		// Check for YouTube section
		await Promise.all([
			expect(page.locator('text=Latest Video')).toBeVisible({ timeout: 10000 }),
			expect(page.locator('text=Check out my latest YouTube tutorial')).toBeVisible({
				timeout: 10000
			})
		]);

		// Check for navigation links
		const navLinks = [
			'Read my technical articles',
			'Browse my open source projects',
			'Get in touch'
		];

		for (const link of navLinks) {
			await expect(page.locator(`text=${link}`)).toBeVisible({ timeout: 10000 });
		}
	});

	test('should have proper page title', async ({ page }) => {
		await page.goto('/', { waitUntil: 'domcontentloaded' });
		await expect(page).toHaveTitle(/Russell Jones \| Developing without limits/, {
			timeout: 10000
		});
	});

	test('should have proper meta description', async ({ page }) => {
		await page.goto('/', { waitUntil: 'domcontentloaded' });
		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription).toHaveAttribute(
			'content',
			'Limitless Developer from Canada specializing in JavaScript, Go, Cloud Technologies, and Open Source. Building elegant solutions with modern web technologies.',
			{ timeout: 10000 }
		);
	});
});
