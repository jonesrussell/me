import { expect, test } from '@playwright/test';

test.describe('Resources page', () => {
    test('should display resources page', async ({ page }) => {
        await page.goto('/resources');
        await expect(page.locator('h1')).toHaveText('Development Resources');
    });

    test('should display Go by Example resource', async ({ page }) => {
        await page.goto('/resources');
        const resource = page.locator('.resource', { hasText: 'Go by Example' });
        await expect(resource).toBeVisible();
        await expect(resource.locator('a')).toHaveAttribute(
            'href',
            'https://github.com/mmcgrana/gobyexample'
        );
        await expect(resource.locator('.stars')).toContainText('7400');
        await expect(resource.locator('.category')).toHaveText('Go');
    });

    test('should have working navigation link', async ({ page }) => {
        await page.goto('/');
        await page.click('nav a[href="/resources"]');
        await expect(page).toHaveURL('/resources');
        await expect(page.locator('h1')).toHaveText('Development Resources');
    });
}); 