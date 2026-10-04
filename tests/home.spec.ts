import { test, expect } from '@playwright/test';

test('homepage connects the offer, evidenced work and writing', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(
		'Digital infrastructurethat stays in your hands.'
	);
	await expect(page).toHaveTitle('Founder & Software Architect | Russell Jones');
	for (const name of ['GoFormX', 'Waaseyaa', 'North Cloud']) {
		await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
	}
	await expect(page.getByRole('link', { name: 'Discuss your project' }).first()).toHaveAttribute(
		'href',
		'/contact'
	);
	await expect(page.getByRole('link', { name: 'Explore the experiment' })).toHaveAttribute(
		'href',
		'/blog'
	);
	await expect(page.locator('.newsletter-cta')).toHaveCount(0);
});
