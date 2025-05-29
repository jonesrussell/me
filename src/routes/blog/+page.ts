import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
	// Return empty initial state for prerendering
	return {
		initialPosts: [],
		hasMore: false
	};
};
