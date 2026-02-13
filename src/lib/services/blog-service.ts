import { formatDate } from './utils';
import type { BlogPost } from '$lib/types/blog';

// Constants
const FEED_URL = 'https://jonesrussell.github.io/blog/feed.xml';
const FEED_CACHE_KEY = 'blog-feed-cache';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

// Types
interface FeedCache {
	data: BlogPost[];
	timestamp: number;
	errorCount: number;
	lastError?: string;
}

interface PaginationOptions {
	page?: number;
	pageSize?: number;
}

type PaginatedResult<T> = {
	items: T[];
	hasMore: boolean;
	totalPages?: number;
};

// Utility Functions
export const formatPostDate = (dateString: string): string => formatDate(dateString) ?? dateString;

export const generateSlug = (title: string): string =>
	title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');

// Caching Module
const feedCache = (() => {
	const cache = new Map<string, FeedCache>();

	const getCache = (key: string): FeedCache | null => {
		const cached = cache.get(key);
		if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
			return cached;
		}
		cache.delete(key); // Remove expired cache
		return null;
	};

	const updateCache = (
		key: string,
		data: BlogPost[],
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

// Export resetCache for testing
export const resetFeedCache = feedCache.resetCache;

// XML Parsing Module
const parseAtomFeed = (xml: string): BlogPost[] => {
	const entries: BlogPost[] = [];
	const entryMatches = xml.match(/<entry[^>]*>([\s\S]*?)<\/entry>/g) || [];

	for (const entryMatch of entryMatches) {
		const titleMatch = entryMatch.match(/<title[^>]*>([\s\S]*?)<\/title>/);
		const linkMatch = entryMatch.match(/<link[^>]*href="([^"]*)"[^>]*rel="alternate"/);
		const contentMatch = entryMatch.match(/<content[^>]*>([\s\S]*?)<\/content>/);
		const publishedMatch = entryMatch.match(/<published[^>]*>([\s\S]*?)<\/published>/);
		const updatedMatch = entryMatch.match(/<updated[^>]*>([\s\S]*?)<\/updated>/);
		const categoryMatches = entryMatch.match(/<category[^>]*term="([^"]*)"[^>]*>/g) || [];

		const title = titleMatch ? titleMatch[1].trim() : '';
		const link = linkMatch ? linkMatch[1] : '';
		const content = contentMatch ? contentMatch[1].trim() : '';
		const published = publishedMatch ? publishedMatch[1] : updatedMatch ? updatedMatch[1] : '';
		const categories = categoryMatches
			.map(match => {
				const termMatch = match.match(/term="([^"]*)"/);
				return termMatch ? termMatch[1] : '';
			})
			.filter(Boolean);

		if (title) {
			entries.push({
				title,
				link,
				content,
				published,
				formattedDate: formatPostDate(published),
				categories,
				slug: generateSlug(title)
			});
		}
	}

	return entries;
};

const parseRSSFeed = (xml: string): BlogPost[] => {
	const entries: BlogPost[] = [];
	const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];

	for (const itemMatch of itemMatches) {
		const titleMatch = itemMatch.match(/<title>([\s\S]*?)<\/title>/);
		const linkMatch = itemMatch.match(/<link>([\s\S]*?)<\/link>/);
		const contentMatch =
			itemMatch.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/) ||
			itemMatch.match(/<description>([\s\S]*?)<\/description>/);
		const pubDateMatch = itemMatch.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
		const categoryMatches = itemMatch.match(/<category>([\s\S]*?)<\/category>/g) || [];

		const title = titleMatch ? titleMatch[1].trim() : '';
		const link = linkMatch ? linkMatch[1].trim() : '';
		const content = contentMatch ? contentMatch[1].trim() : '';
		const published = pubDateMatch ? pubDateMatch[1].trim() : '';
		const categories = categoryMatches
			.map(match => {
				const catMatch = match.match(/<category>([\s\S]*?)<\/category>/);
				return catMatch ? catMatch[1].trim() : '';
			})
			.filter(Boolean);

		if (title) {
			entries.push({
				title,
				link,
				content,
				published,
				formattedDate: formatPostDate(published),
				categories,
				slug: generateSlug(title)
			});
		}
	}

	return entries;
};

const parseXMLFeed = (xml: string): BlogPost[] => {
	// Detect feed format: Atom uses <entry>, RSS 2.0 uses <item>
	if (xml.includes('<entry')) {
		return parseAtomFeed(xml);
	}
	return parseRSSFeed(xml);
};

// API Module - Pure functions (no store updates)
export const fetchFeed = async (
	fetchFn: typeof fetch,
	{ page = 1, pageSize = 5 }: PaginationOptions = {}
): Promise<PaginatedResult<BlogPost>> => {
	const cacheKey = `${FEED_CACHE_KEY}-${page}-${pageSize}`;
	const cached = feedCache.getCache(cacheKey);

	if (cached) {
		const cachedItems = cached.data.slice((page - 1) * pageSize, page * pageSize);
		const totalPages = Math.ceil(cached.data.length / pageSize);
		const hasMore = cached.data.length > page * pageSize;

		return {
			items: cachedItems,
			hasMore,
			totalPages
		};
	}

	try {
		const response = await fetchFn(FEED_URL, {
			headers: { Accept: 'application/xml, text/xml, */*' }
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const text = await response.text();
		const posts = parseXMLFeed(text);
		feedCache.updateCache(cacheKey, posts);

		const paginatedItems = posts.slice((page - 1) * pageSize, page * pageSize);
		const totalPages = Math.ceil(posts.length / pageSize);
		const hasMore = posts.length > page * pageSize;

		return {
			items: paginatedItems,
			hasMore,
			totalPages
		};
	} catch (error) {
		const lastError = error instanceof Error ? error.message : 'Unknown error';
		const cached = feedCache.getCache(cacheKey) as FeedCache | null;
		const errorCount = (cached?.errorCount || 0) + 1;

		feedCache.updateCache(cacheKey, cached?.data || [], errorCount, lastError);

		// Re-throw the error to ensure it propagates
		throw error;
	}
};

// Blog Post Retrieval
export const fetchPost = async (fetchFn: typeof fetch, slug: string): Promise<BlogPost> => {
	const { items } = await fetchFeed(fetchFn);
	const post = items.find(post => generateSlug(post.title) === slug);

	if (!post) {
		throw new Error('Post not found');
	}

	return post;
};
