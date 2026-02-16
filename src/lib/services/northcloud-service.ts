import type { NorthCloudArticle, NorthCloudFeedResponse } from '$lib/types/northcloud';

const FEED_BASE_URL = 'https://northcloud.biz/api/v1/feeds';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

interface FeedCache {
	data: NorthCloudArticle[];
	timestamp: number;
	errorCount: number;
	lastError?: string;
}

const feedCache = (() => {
	const cache = new Map<string, FeedCache>();

	const getCache = (key: string): FeedCache | null => {
		const cached = cache.get(key);
		if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
			return cached;
		}
		cache.delete(key);
		return null;
	};

	const updateCache = (
		key: string,
		data: NorthCloudArticle[],
		errorCount: number = 0,
		lastError?: string
	) => {
		cache.set(key, {
			data,
			timestamp: Date.now(),
			errorCount,
			lastError
		});
	};

	const resetCache = () => {
		cache.clear();
	};

	return { getCache, updateCache, resetCache };
})();

function normalizeArticle(
	a: NorthCloudFeedResponse['articles'][number]
): NorthCloudArticle {
	return {
		id: a.id,
		title: a.title,
		url: a.url,
		snippet: a.snippet,
		published: new Date(a.published_at),
		topics: a.topics ?? [],
		source: a.source ?? 'northcloud'
	};
}

/**
 * Fetches a North Cloud topic feed. Uses in-memory cache (30 min TTL).
 * @param fetchFn - SvelteKit fetch for SSR compatibility
 * @param slug - Feed slug: 'pipeline', 'crime', 'mining', 'entertainment'
 * @param limit - Max articles to return (default 10)
 */
export async function fetchNorthCloudFeed(
	fetchFn: typeof fetch,
	slug: string = 'pipeline',
	limit: number = 10
): Promise<NorthCloudArticle[]> {
	const cacheKey = `nc-feed-${slug}-${limit}`;
	const cached = feedCache.getCache(cacheKey);
	if (cached) {
		return cached.data;
	}

	const url = `${FEED_BASE_URL}/${slug}?limit=${limit}`;
	const response = await fetchFn(url, {
		headers: { Accept: 'application/json' }
	});

	if (!response.ok) {
		throw new Error(`NorthCloud feed error: ${response.status}`);
	}

	const data = (await response.json()) as NorthCloudFeedResponse;
	const articles = (data.articles ?? []).map(normalizeArticle);
	feedCache.updateCache(cacheKey, articles);
	return articles;
}
