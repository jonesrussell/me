import { test, expect } from '@playwright/test';

test('work links to complete evidence-backed project details', async ({ page }) => {
	for (const project of [
		{ name: 'GoFormX', slug: 'goformx' },
		{ name: 'Waaseyaa', slug: 'waaseyaa' },
		{ name: 'North Cloud', slug: 'north-cloud' }
	]) {
		await page.goto('/projects');
		await page.getByRole('link', { name: `View ${project.name}`, exact: true }).click();
		await expect(page).toHaveURL(new RegExp(`/projects/${project.slug}$`));
		await expect(page).toHaveTitle(`${project.name} | Russell Jones`);
		for (const heading of [
			'The problem',
			'Constraints',
			'My contribution',
			'Decisions & tradeoffs',
			'What is demonstrated',
			'Limitations & current work'
		]) {
			await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
		}
		await expect(page.getByText('Conceptual flow', { exact: true })).toBeVisible();
		await expect(
			page.getByRole('navigation', { name: 'Related work' }).getByRole('link')
		).toHaveCount(2);
	}
});

test('GoFormX separates deployment from product acceptance', async ({ page }) => {
	await page.goto('/projects/goformx');
	await expect(
		page.getByText(/Deployment checks do not establish production first-use acceptance/)
	).toBeVisible();
	await expect(page.getByRole('link', { name: 'Visit GoFormX' })).toHaveAttribute(
		'href',
		'https://www.goformx.com'
	);
});
