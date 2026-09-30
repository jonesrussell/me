import { fetchFeed } from '$lib/services/blog-service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const result = await fetchFeed(fetch, { page: 1, pageSize: 3 });
		return { posts: result.items };
	} catch {
		return { posts: [] };
	}
};
