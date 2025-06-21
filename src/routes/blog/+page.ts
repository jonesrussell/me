// +page.ts
import type { PageLoad } from './$types';
import { fetchFeed } from '$lib/services/blog-service';

export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
	try {
		// Load initial posts on the server for better SEO and performance
		const result = await fetchFeed(fetch, {
			page: 1,
			pageSize: 6
		});

		return {
			initialPosts: result.items,
			hasMore: result.hasMore,
			totalPages: result.totalPages || 1,
			currentPage: 1
		};
	} catch (error) {
		console.error('Failed to load initial posts:', error);

		// Return empty state but don't break the page
		return {
			initialPosts: [],
			hasMore: false,
			totalPages: 1,
			currentPage: 1,
			serverError: error instanceof Error ? error.message : 'Failed to load posts'
		};
	}
};
