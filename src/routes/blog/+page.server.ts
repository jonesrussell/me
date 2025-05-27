import type { PageServerLoad } from './$types';
import { fetchFeed } from '$lib/services/blog-service';

export const prerender = false;

export const load: PageServerLoad = async () => {
	try {
		const result = await fetchFeed({ page: 1, pageSize: 6 });
		return {
			initialPosts: result.items,
			hasMore: result.hasMore
		};
	} catch (error) {
		console.error('Error loading initial blog posts:', error);
		return {
			initialPosts: [],
			hasMore: false,
			error: error instanceof Error ? error.message : 'Failed to load posts'
		};
	}
};
