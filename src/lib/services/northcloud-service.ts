import type { NorthCloudArticle, NorthCloudFeedResponse } from '$lib/types/northcloud';

const FEED_URL = 'https://northcloud.biz/feed.json';
const FEED_CACHE_KEY = 'northcloud-feed-cache';
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
 * Fetches the North Cloud public feed. Uses in-memory cache (30 min TTL).
 * For use in +page.ts load during prerender; keeps "me" static and SEO-friendly.
 */
export async function fetchNorthCloudFeed(
	fetchFn: typeof fetch
): Promise<NorthCloudArticle[]> {
	const cached = feedCache.getCache(FEED_CACHE_KEY);
	if (cached) {
		return cached.data;
	}

	const response = await fetchFn(FEED_URL, {
		headers: { Accept: 'application/json' }
	});

	if (!response.ok) {
		throw new Error(`NorthCloud feed error: ${response.status}`);
	}

	const data = (await response.json()) as NorthCloudFeedResponse;
	const articles = (data.articles ?? []).map(normalizeArticle);
	feedCache.updateCache(FEED_CACHE_KEY, articles);
	return articles;
}
