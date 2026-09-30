import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import AxeBuilder from '@axe-core/playwright';

const base = process.env.RELEASE_BASE_PATH || '';
const routes = [
	'/',
	'/services',
	'/projects',
	'/projects/goformx',
	'/projects/waaseyaa',
	'/projects/north-cloud',
	'/blog',
	'/about',
	'/contact',
	'/resources'
];

test('public pages pass automated WCAG AA accessibility checks', async ({ page }) => {
	test.setTimeout(120000);
	for (const route of [
		...routes,
		'/blog/identity-only-oauth-requests',
		'/blog/series/php-fig-standards'
	]) {
		await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
		const result = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.analyze();
		expect
			.soft(
				result.violations.map(violation => ({
					id: violation.id,
					nodes: violation.nodes.map(node => ({
						target: node.target,
						summary: node.failureSummary
					}))
				})),
				route
			)
			.toEqual([]);
	}
});

test('release routes retain metadata, links and responsive layouts at 200% scale', async ({
	page
}, testInfo) => {
	test.setTimeout(120000);
	const evidence = process.env.RELEASE_EVIDENCE_DIR;
	if (evidence) await mkdir(evidence, { recursive: true });
	for (const route of routes) {
		await page.setViewportSize({ width: 1440, height: 1000 });
		await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
		await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
		await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			'href',
			`https://jonesrussell.github.io${base}${route}`
		);
		const localLinks = await page
			.locator('a[href^="/"]')
			.evaluateAll(elements => elements.map(element => element.getAttribute('href')!));
		expect(
			localLinks.every(href => !base || href.startsWith(`${base}/`)),
			route
		).toBe(true);
		if (evidence)
			await page.screenshot({
				path: join(
					evidence,
					`${testInfo.project.name}-${route.replaceAll('/', '-') || 'home'}-desktop.png`
				),
				fullPage: true
			});
		await page.evaluate(() => {
			document.documentElement.style.zoom = '2';
		});
		expect(
			await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
			`${route} at 200% CSS scale`
		).toBe(true);
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
		await page.evaluate(() => {
			document.documentElement.style.zoom = '';
		});
		await page.setViewportSize({ width: 375, height: 812 });
		await expect
			.poll(
				() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
				{ message: `${route} at 375px` }
			)
			.toBe(true);
		if (evidence)
			await page.screenshot({
				path: join(
					evidence,
					`${testInfo.project.name}-${route.replaceAll('/', '-') || 'home'}-mobile.png`
				),
				fullPage: true
			});
	}
});

test('reduced motion removes decorative and interaction animation', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto(`${base}/`, { waitUntil: 'networkidle' });
	expect(
		await page
			.locator('.button')
			.first()
			.evaluate(element => parseFloat(getComputedStyle(element).transitionDuration))
	).toBeLessThanOrEqual(0.01);
});

test('retained article, series, feed and social preview destinations resolve', async ({
	page,
	request
}) => {
	await page.goto(`${base}/blog`, { waitUntil: 'networkidle' });
	const articles = page.getByRole('region', { name: 'Published articles' });
	const article = articles.locator('h2 a').first();
	await expect(article).toBeVisible();
	await article.click();
	await expect(page.locator('.prose')).toBeVisible();
	await page.goto(`${base}/blog/series/php-fig-standards`, { waitUntil: 'networkidle' });
	await expect(page.getByRole('heading', { name: 'Foundation' })).toBeVisible();
	const social = await request.get(`${base}/og.png`);
	expect(social.ok()).toBe(true);
	expect(social.headers()['content-type']).toContain('image/png');
});
