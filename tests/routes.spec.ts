import { test, expect } from '@playwright/test';

const routes = [
	{ path: '/projects', label: 'Work' },
	{ path: '/services', label: 'Services' },
	{ path: '/blog', label: 'Writing' },
	{ path: '/about', label: 'About' },
	{ path: '/contact', label: 'Contact' }
];

test('shared navigation reaches every page and identifies the current route', async ({ page }) => {
	await page.goto('/');
	for (const route of routes) {
		await page
			.getByRole('navigation', { name: 'Main navigation' })
			.getByRole('link', { name: route.label, exact: true })
			.click();
		await expect(page).toHaveURL(new RegExp(`${route.path}$`));
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
		await expect(
			page
				.getByRole('navigation', { name: 'Main navigation' })
				.getByRole('link', { name: route.label, exact: true })
		).toHaveAttribute('aria-current', 'page');
	}
});

test('mobile menu works by keyboard, closes on Escape and after navigation', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto('/', { waitUntil: 'networkidle' });
	const menu = page.getByRole('button', { name: 'Menu' });
	await menu.focus();
	await page.keyboard.press('Enter');
	await expect(menu).toHaveAttribute('aria-expanded', 'true');
	await page.keyboard.press('Escape');
	await expect(menu).toHaveAttribute('aria-expanded', 'false');
	await expect(menu).toBeFocused();
	await menu.click();
	await page
		.getByRole('navigation', { name: 'Main navigation' })
		.getByRole('link', { name: 'About', exact: true })
		.click();
	await expect(page).toHaveURL(/\/about$/);
	await expect(menu).toHaveAttribute('aria-expanded', 'false');
	await expect(page.getByRole('navigation', { name: 'Main navigation' })).not.toBeVisible();
});

test('375px layouts do not overflow across retained and new routes', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 812 });
	for (const path of [
		'/',
		...routes.map(route => route.path),
		'/projects/goformx',
		'/projects/waaseyaa',
		'/projects/north-cloud',
		'/resources'
	]) {
		await page.goto(path, { waitUntil: 'networkidle' });
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
		expect(
			await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
			path
		).toBe(true);
	}
});

test('skip link provides keyboard access to the main content', async ({ page, browserName }) => {
	await page.goto('/services', { waitUntil: 'networkidle' });
	if (browserName === 'webkit')
		await page.getByRole('link', { name: 'Skip to main content' }).focus();
	else await page.keyboard.press('Tab');
	await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
	await page.keyboard.press('Enter');
	await expect(page.locator('#main')).toBeFocused();
});

test('services and about explain scope and principles without placeholder claims', async ({
	page
}) => {
	await page.goto('/services', { waitUntil: 'networkidle' });
	for (const title of [
		'Architecture & technical review',
		'Platform development & modernization',
		'Practical AI workflows',
		'Three steps to momentum.'
	]) {
		await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible();
	}
	await page.goto('/about');
	for (const title of [
		'Start with the problem.',
		'Keep decisions visible.',
		'Build for ownership.'
	]) {
		await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible();
	}
});

test('error route offers home and contact', async ({ page }) => {
	await page.goto('/missing-page');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found.');
	await expect(page.getByRole('link', { name: 'Go home', exact: true })).toHaveAttribute(
		'href',
		'/'
	);
	await expect(page.getByRole('link', { name: 'Contact Russell', exact: true })).toHaveAttribute(
		'href',
		'/contact'
	);
});
