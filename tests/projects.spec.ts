import { test, expect } from '@playwright/test';

const base = process.env.RELEASE_BASE_PATH || '';

test('work links to complete evidence-backed project details', async ({ page }) => {
	for (const project of [
		{ name: 'GoFormX', slug: 'goformx' },
		{ name: 'Waaseyaa', slug: 'waaseyaa' },
		{ name: 'North Cloud', slug: 'north-cloud' }
	]) {
		await page.goto(`${base}/projects`);
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
		await expect(
			page.getByText(
				project.slug === 'goformx' ? 'Live homepage / September 30, 2026' : 'Conceptual flow',
				{ exact: true }
			)
		).toBeVisible();
		await expect(
			page.getByRole('navigation', { name: 'Related work' }).getByRole('link')
		).toHaveCount(2);
	}
});

test('GoFormX separates deployment from product acceptance', async ({ page }) => {
	await page.goto(`${base}/projects/goformx`);
	await expect(
		page.getByText(/Deployment checks do not establish production first-use acceptance/)
	).toBeVisible();
	await expect(page.getByRole('link', { name: 'Visit GoFormX' })).toHaveAttribute(
		'href',
		'https://www.goformx.com'
	);
});

test('GoFormX screenshot loads responsively and links to the live site', async ({ page }) => {
	for (const width of [1440, 375]) {
		await page.setViewportSize({ width, height: 1100 });
		for (const route of ['/', '/projects', '/projects/goformx']) {
			await page.goto(`${base}${route}`);
			const image = page.getByRole('img', { name: /GoFormX homepage with the headline/ });
			await image.scrollIntoViewIfNeeded();
			await expect(image).toBeVisible();
			await expect(image.locator('..')).toHaveAttribute('href', 'https://www.goformx.com/');
			await expect
				.poll(() =>
					image.evaluate(element => {
						const img = element as HTMLImageElement;
						return img.complete && img.naturalWidth > 0;
					})
				)
				.toBe(true);
			const source = await image.evaluate(element => (element as HTMLImageElement).currentSrc);
			expect(new URL(source).pathname).toMatch(
				new RegExp(`^${base}/images/projects/goformx-homepage-2026-09-30-\\d+\\.webp$`)
			);
			for (const size of [480, 640, 960, 1240]) {
				const response = await page.request.get(
					`${base}/images/projects/goformx-homepage-2026-09-30-${size}.webp`
				);
				expect(response.status()).toBe(200);
				expect(response.headers()['content-type']).toContain('image/webp');
			}
			expect(
				await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)
			).toBe(true);
		}
	}
});
