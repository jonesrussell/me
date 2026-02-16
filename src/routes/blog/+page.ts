// +page.ts
import { base } from '$app/paths';
import type { PageLoad } from './$types';
import { fetchFeed } from '$lib/services/blog-service';
import { canonicalUrl } from '$lib/config/seo';

const canonicalBlog = canonicalUrl(base, '/blog');

export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
	try {
		const result = await fetchFeed(fetch, {
			page: 1,
			pageSize: 6
		});

		return {
			initialPosts: result.items,
			hasMore: result.hasMore,
			totalPages: result.totalPages || 1,
			currentPage: 1,
			canonicalBlog
		};
	} catch (error) {
		const rawMessage = error instanceof Error ? error.message : 'Failed to load posts';
		const serverError = rawMessage.includes('404')
			? 'Blog feed temporarily unavailable — try again later.'
			: rawMessage;
		return {
			initialPosts: [],
			hasMore: false,
			totalPages: 1,
			currentPage: 1,
			canonicalBlog,
			serverError
		};
	}
};
