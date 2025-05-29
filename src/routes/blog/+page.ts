import type { PageLoad } from './$types';
import { parseXMLFeed } from '$lib/services/blog-service';

export const prerender = false;

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('https://jonesrussell.github.io/blog/feed.xml', {
		headers: { Accept: 'application/xml, text/xml, */*' }
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const text = await response.text();
	const posts = parseXMLFeed(text);

	return {
		initialPosts: posts.slice(0, 10),
		hasMore: posts.length > 10
	};
};
