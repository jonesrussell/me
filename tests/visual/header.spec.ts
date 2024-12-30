import { test, expect } from '@playwright/test';

test.describe('Header Visual Tests', () => {
    test('header maintains monospace alignment', async ({ page }) => {
        await page.goto('/');

        // Take a screenshot of the header
        const header = await page.locator('header');
        await expect(header).toBeVisible();

        // Compare with baseline
        expect(await header.screenshot()).toMatchSnapshot('header.png');

        // Check specific monospace properties
        const nav = await page.locator('nav');
        const computedStyle = await nav.evaluate((el) => {
            const style = window.getComputedStyle(el);
            return {
                fontFamily: style.fontFamily,
                whiteSpace: style.whiteSpace,
                gap: style.gap
            };
        });

        expect(computedStyle.fontFamily).toContain('Fira Code');
        expect(computedStyle.whiteSpace).toBe('pre');

        // Check nav items alignment
        const navItems = await page.locator('nav a').all();
        const widths = await Promise.all(
            navItems.map(item => item.evaluate(el => el.getBoundingClientRect().width))
        );

        // All nav items should have the same width
        const firstWidth = widths[0];
        widths.forEach(width => {
            expect(width).toBe(firstWidth);
        });
    });
}); 