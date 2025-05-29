import { writable } from 'svelte/store';
import { formatDate } from './utils';
import type { BlogPost, BlogError } from '$lib/types/blog';

// Constants
const FEED_URL = import.meta.env.VITE_BLOG_FEED_URL || 'https://jonesrussell.github.io/blog/feed.xml';
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
};

// Store Management
export const blogStore = writable<{
	posts: BlogPost[];
	loading: boolean;
	error: BlogError | null;
}>({
	posts: [],
	loading: false,
	error: null
});

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
const parseXMLFeed = (xml: string): BlogPost[] => {
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

// API Module
export const fetchFeed = async (
	fetchFn: typeof fetch,
	{ page = 1, pageSize = 5 }: PaginationOptions = {}
): Promise<PaginatedResult<BlogPost>> => {
	// Set loading state immediately
	blogStore.set({ posts: [], loading: true, error: null });

	const cacheKey = `${FEED_CACHE_KEY}-${page}-${pageSize}`;
	const cached = feedCache.getCache(cacheKey);

	if (cached) {
		const cachedItems = cached.data.slice((page - 1) * pageSize, page * pageSize);
		blogStore.set({
			posts: cached.data,
			loading: false,
			error: null
		});
		return {
			items: cachedItems,
			hasMore: cached.data.length > page * pageSize
		};
	}

	try {
		// Handle both remote and local file URLs
		let text: string;
		if (FEED_URL.startsWith('http')) {
			const response = await fetchFn(FEED_URL, {
				headers: { Accept: 'application/xml, text/xml, */*' }
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			text = await response.text();
		} else {
			// For local files, use the fetch function to read the file
			const response = await fetchFn(FEED_URL);
			if (!response.ok) {
				throw new Error(`Failed to read local feed file: ${response.status}`);
			}
			text = await response.text();
		}

		const posts = parseXMLFeed(text);
		feedCache.updateCache(cacheKey, posts);

		const paginatedItems = posts.slice((page - 1) * pageSize, page * pageSize);
		blogStore.set({
			posts,
			loading: false,
			error: null
		});

		return {
			items: paginatedItems,
			hasMore: posts.length > page * pageSize
		};
	} catch (error) {
		const lastError = error instanceof Error ? error.message : 'Unknown error';
		const cached = feedCache.getCache(cacheKey) as FeedCache | null;
		const errorCount = (cached?.errorCount || 0) + 1;

		feedCache.updateCache(cacheKey, cached?.data || [], errorCount, lastError);

		const blogError: BlogError = {
			type: 'FETCH_ERROR',
			message: lastError,
			details: error,
			timestamp: Date.now()
		};

		// Update store with error
		blogStore.set({ posts: [], loading: false, error: blogError });

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
