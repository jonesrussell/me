import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
	test('should load the home page successfully', async ({ page }) => {
		// Arrange
		await page.goto('/');
		await page.waitForSelector('.site');

		// Act & Assert
		// Check for hero section with terminal
		const hero = page.locator('.hero');
		await expect(hero).toBeVisible();

		// Wait for terminal to be visible and initialized
		const terminal = page.locator('.terminal-frame');
		await expect(terminal).toBeVisible();
		await expect(terminal.locator('.terminal-header')).toBeVisible();
		await expect(terminal.locator('.terminal-title')).toContainText('~/developer');

		// Check for main content area
		const main = page.locator('main.home');
		await expect(main).toBeVisible();

		// Check for specialties section
		await expect(page.locator('text=Modern JavaScript/TS')).toBeVisible();
		await expect(page.locator('text=Golang & PHP')).toBeVisible();
		await expect(page.locator('text=AI Integration')).toBeVisible();
		await expect(page.locator('text=Cloud & DevOps')).toBeVisible();

		// Check for YouTube section
		await expect(page.locator('text=Latest Video')).toBeVisible();
		await expect(page.locator('text=Check out my latest YouTube tutorial')).toBeVisible();

		// Check for navigation links
		await expect(page.locator('text=Read my technical articles')).toBeVisible();
		await expect(page.locator('text=Browse my open source projects')).toBeVisible();
		await expect(page.locator('text=Get in touch')).toBeVisible();
	});

	test('should have proper page title', async ({ page }) => {
		// Arrange
		await page.goto('/');
		await page.waitForSelector('.site');

		// Act & Assert
		await expect(page).toHaveTitle(/Russell Jones \| Developing without limits/);
	});

	test('should have proper meta description', async ({ page }) => {
		// Arrange
		await page.goto('/');
		await page.waitForSelector('.site');

		// Act & Assert
		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription).toHaveAttribute(
			'content',
			'Limitless Developer from Canada specializing in JavaScript, Go, Cloud Technologies, and Open Source. Building elegant solutions with modern web technologies.'
		);
	});
});
