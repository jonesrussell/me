import type { BlogPost, BlogError } from '$lib/types/blog';

export const blogState = $state<{
	posts: BlogPost[];
	loading: boolean;
	error: BlogError | null;
	hasMore: boolean;
	currentPage: number;
	totalPages: number;
}>({
	posts: [],
	loading: true,
	error: null,
	hasMore: false,
	currentPage: 1,
	totalPages: 1
});
