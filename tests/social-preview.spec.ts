import { test, expect } from '@playwright/test';

test('social preview has the approved positioning and can be exported', async ({ page }) => {
	await page.setViewportSize({ width: 1200, height: 630 });
	await page.goto(`${process.env.RELEASE_BASE_PATH || ''}/og.svg`);
	await expect(page.locator('svg')).toHaveAttribute('viewBox', '0 0 1200 630');
	await expect(page.locator('svg')).toContainText('Digital infrastructure');
	if (process.env.UPDATE_SOCIAL_PREVIEW === '1') {
		await page.locator('svg').screenshot({ path: 'static/og.png' });
	}
});
