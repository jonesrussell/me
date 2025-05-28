import { fetchFeed } from '$lib/services/blog-service';

import type { PageLoad } from './$types';
import type { BlogPost } from '$lib/types/blog';

export const prerender = true;

export const load: PageLoad = async (): Promise<{
	initialPosts: BlogPost[];
	hasMore: boolean;
}> => {
	const { items: initialPosts, hasMore } = await fetchFeed({ page: 1, pageSize: 12 });
	return { initialPosts, hasMore };
};
