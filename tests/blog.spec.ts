import { test, expect } from '@playwright/test';

const feedUrl = '**/blog/feed.xml';
const feed = (count: number) =>
	`<rss><channel>${Array.from({ length: count }, (_, i) => `<item><title>Published article ${i + 1}</title><link>https://dev.to/jonesrussell/article-${i + 1}</link><pubDate>Tue, 23 Sep 2026 12:00:00 GMT</pubDate><description>Source-backed lessons &amp; practical decisions.</description><category>architecture</category></item>`).join('')}</channel></rss>`;

test.beforeEach(async ({ page }) => {
	await page.route('**/blog/series/index.json', route =>
		route.fulfill({ contentType: 'application/json', body: '{"series":[]}' })
	);
});

test('writing presents feed metadata and paginates without dropping articles', async ({ page }) => {
	await page.route(feedUrl, route =>
		route.fulfill({ contentType: 'application/xml', body: feed(8) })
	);
	await page.goto('/services', { waitUntil: 'networkidle' });
	await page
		.getByRole('navigation', { name: 'Main navigation' })
		.getByRole('link', { name: 'Writing', exact: true })
		.click();
	await expect(page.getByRole('heading', { level: 1 })).toContainText('Notes from');
	await expect(
		page.getByRole('region', { name: 'Published articles' }).locator('.writing-row')
	).toHaveCount(6);
	await expect(
		page
			.getByRole('region', { name: 'Published articles' })
			.locator('.writing-row')
			.first()
			.locator('time')
	).toHaveAttribute('datetime', '2026-09-23T12:00:00.000Z');
	await expect(page.getByRole('link', { name: 'Read on Dev.to' })).toHaveAttribute(
		'href',
		'https://dev.to/jonesrussell'
	);
	await page.getByRole('button', { name: 'Load more articles' }).click();
	await expect(
		page.getByRole('region', { name: 'Published articles' }).locator('.writing-row')
	).toHaveCount(8);
	await expect(page.getByRole('button', { name: 'Load more articles' })).toHaveCount(0);
});

test('failed initial load retries page one', async ({ page }) => {
	let fail = true;
	await page.route(feedUrl, route =>
		route.fulfill(
			fail
				? { status: 503, body: 'Unavailable' }
				: { contentType: 'application/xml', body: feed(2) }
		)
	);
	await page.goto('/services', { waitUntil: 'networkidle' });
	await page
		.getByRole('navigation', { name: 'Main navigation' })
		.getByRole('link', { name: 'Writing', exact: true })
		.click();
	await expect(page.locator('.error-state')).toBeVisible();
	fail = false;
	await page.getByRole('button', { name: 'Try again' }).click();
	await expect(
		page.getByRole('region', { name: 'Published articles' }).locator('.writing-row')
	).toHaveCount(2);
	await expect(page.getByRole('link', { name: 'Published article 1', exact: true })).toBeVisible();
});

test('an empty feed has an honest empty state', async ({ page }) => {
	await page.route(feedUrl, route =>
		route.fulfill({ contentType: 'application/xml', body: feed(0) })
	);
	await page.goto('/services', { waitUntil: 'networkidle' });
	await page
		.getByRole('navigation', { name: 'Main navigation' })
		.getByRole('link', { name: 'Writing', exact: true })
		.click();
	await expect(page.getByText('No published articles are available yet.')).toBeVisible();
});

test('article rendering retains sanitization and an independently scrolling code block', async ({
	page
}) => {
	const articleFeed = `<rss><channel><item><title>Article safety</title><link>https://dev.to/jonesrussell/article-safety</link><pubDate>Tue, 23 Sep 2026 12:00:00 GMT</pubDate><content:encoded><![CDATA[<p>Published body.</p><script>window.unsafeArticle = true</script><pre><code>${'long-code-line-'.repeat(80)}</code></pre>]]></content:encoded></item></channel></rss>`;
	await page.route(feedUrl, route =>
		route.fulfill({ contentType: 'application/xml', body: articleFeed })
	);
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto('/services', { waitUntil: 'networkidle' });
	await page.getByRole('button', { name: 'Menu' }).click();
	await page
		.getByRole('navigation', { name: 'Main navigation' })
		.getByRole('link', { name: 'Writing', exact: true })
		.click();
	await page.getByRole('link', { name: 'Article safety', exact: true }).click();
	await expect(page.getByRole('heading', { name: 'Article safety', level: 1 })).toBeVisible();
	await expect(page.getByText('Published body.')).toBeVisible();
	await expect(page.locator('.prose script')).toHaveCount(0);
	await expect(page.locator('.prose pre')).toHaveAttribute('tabindex', '0');
	expect(
		await page.locator('.prose pre').evaluate(element => getComputedStyle(element).overflowX)
	).toBe('auto');
	expect(
		await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)
	).toBe(true);
});
