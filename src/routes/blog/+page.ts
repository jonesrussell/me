import { base } from '$app/paths';
import type { PageLoad } from './$types';
import { fetchFeed } from '$lib/services/blog-service';
import { fetchSeriesIndex } from '$lib/services/series-service';
import { canonicalUrl } from '$lib/config/seo';
import type { BlogPost } from '$lib/types/blog';
import type { SeriesIndex } from '$lib/types/series';

export const prerender = false;

export const load: PageLoad = async ({ fetch }) => {
	const POSTS_PER_PAGE = 6;

	let initialPosts: BlogPost[] = [];
	let serverError: string | null = null;
	let hasMore = false;
	let currentPage = 1;
	let totalPages = 1;
	let seriesIndex: SeriesIndex = { series: [] };

	try {
		const result = await fetchFeed(fetch, { page: 1, pageSize: POSTS_PER_PAGE });
		initialPosts = result.items;
		hasMore = result.hasMore;
		totalPages = result.totalPages ?? 1;
	} catch (e) {
		serverError = e instanceof Error ? e.message : 'Failed to load blog posts';
	}

	try {
		seriesIndex = await fetchSeriesIndex(fetch);
	} catch {
		// Series data is non-critical for blog page; cards just won't show
	}

	return {
		initialPosts,
		serverError,
		hasMore,
		currentPage,
		totalPages,
		seriesIndex,
		canonicalBlog: canonicalUrl(base, '/blog')
	};
};
