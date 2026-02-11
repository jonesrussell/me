import { base } from '$app/paths';
import { canonicalUrl } from '$lib/config/seo';
import { fetchFeed } from '$lib/services/blog-service';

export const prerender = true;

const STATIC_PATHS = ['/', '/blog', '/projects', '/resources', '/contact'] as const;

export async function GET({ fetch }) {
	const urls: { loc: string; lastmod?: string }[] = [];

	for (const path of STATIC_PATHS) {
		urls.push({ loc: canonicalUrl(base, path) });
	}

	try {
		const result = await fetchFeed(fetch, { page: 1, pageSize: 500 });
		for (const post of result.items) {
			urls.push({
				loc: canonicalUrl(base, `/blog/${post.slug}`),
				lastmod: post.published ? new Date(post.published).toISOString().slice(0, 10) : undefined
			});
		}
	} catch {
		// Fall back to static routes only; never 500
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) =>
			`  <url>
    <loc>${escapeXml(u.loc)}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600, public'
		}
	});
}

function escapeXml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}
