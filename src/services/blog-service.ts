import { writable } from 'svelte/store';
import {
	truncateDescription,
	formatDate,
	extractFirstMeaningfulParagraph
} from './utils';

interface Post {
	title: string;
	published: string;
	link: string;
	description: string;
}

interface FetchResult {
	success: boolean;
	data: XMLDocument | null;
	error?: string;
	etag?: string;
	lastModified?: string;
}

// Enhanced cache interface
interface FeedCache {
	data: Post[];
	timestamp: number;
	etag?: string;
	lastModified?: string;
	errorCount: number;
	lastError?: string;
}

// Error types for better error handling
export interface BlogError {
	type: 'FETCH_ERROR' | 'PARSE_ERROR' | 'VALIDATION_ERROR' | 'CACHE_ERROR';
	message: string;
	details?: unknown;
	timestamp: number;
}

let feedCache: FeedCache | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_ERROR_COUNT = 3; // Maximum number of consecutive errors before forcing a refresh
const ERROR_RESET_TIME = 30 * 60 * 1000; // Reset error count after 30 minutes

// Error store for UI updates
export const blogErrors = writable<BlogError[]>([]);

function addError(error: BlogError) {
	blogErrors.update((errors) => {
		const newErrors = [...errors, error];
		// Keep only the last 10 errors
		return newErrors.slice(-10);
	});
}

async function fetchXML(url: string): Promise<FetchResult> {
	try {
		const headers = new Headers();
		if (feedCache?.etag) {
			headers.set('If-None-Match', feedCache.etag);
		}
		if (feedCache?.lastModified) {
			headers.set('If-Modified-Since', feedCache.lastModified);
		}

		const response = await fetch(url, { headers });

		if (response.status === 304) {
			return {
				success: true,
				data: null,
				etag: response.headers.get('etag') || undefined,
				lastModified: response.headers.get('last-modified') || undefined
			};
		}

		if (!response.ok) {
			const error: BlogError = {
				type: 'FETCH_ERROR',
				message: `Failed to fetch feed: ${response.statusText}`,
				details: { status: response.status },
				timestamp: Date.now()
			};
			addError(error);
			return {
				success: false,
				data: null,
				error: error.message,
				etag: response.headers.get('etag') || undefined,
				lastModified: response.headers.get('last-modified') || undefined
			};
		}

		const text = await response.text();
		const parser = new DOMParser();
		const xml = parser.parseFromString(text, 'application/xml');

		// Validate XML structure
		if (!xml.querySelector('entry')) {
			const error: BlogError = {
				type: 'PARSE_ERROR',
				message: 'Invalid XML format: No entries found',
				timestamp: Date.now()
			};
			addError(error);
			return {
				success: false,
				data: null,
				error: error.message,
				etag: response.headers.get('etag') || undefined,
				lastModified: response.headers.get('last-modified') || undefined
			};
		}

		return {
			success: true,
			data: xml,
			etag: response.headers.get('etag') || undefined,
			lastModified: response.headers.get('last-modified') || undefined
		};
	} catch (error) {
		const blogError: BlogError = {
			type: 'FETCH_ERROR',
			message:
				error instanceof Error ? error.message : 'Unknown error occurred',
			details: error,
			timestamp: Date.now()
		};
		addError(blogError);
		return {
			success: false,
			data: null,
			error: blogError.message
		};
	}
}

// Pagination interface
interface PaginationOptions {
	page: number;
	pageSize: number;
}

interface PaginatedResult<T> {
	items: T[];
	total: number;
	page: number;
	pageSize: number;
	hasMore: boolean;
}

function shouldInvalidateCache(cache: FeedCache, result: FetchResult): boolean {
	// Force refresh if we've had too many errors
	if (cache.errorCount >= MAX_ERROR_COUNT) {
		return true;
	}

	// Check if etag or lastModified has changed
	if (result.etag && result.etag !== cache.etag) {
		return true;
	}
	if (result.lastModified && result.lastModified !== cache.lastModified) {
		return true;
	}

	// Check if cache is too old
	if (Date.now() - cache.timestamp > CACHE_DURATION) {
		return true;
	}

	// Reset error count if it's been a while since the last error
	if (cache.lastError && Date.now() - cache.timestamp > ERROR_RESET_TIME) {
		cache.errorCount = 0;
		cache.lastError = undefined;
	}

	return false;
}

function validatePost(post: Partial<Post>): post is Post {
	return (
		typeof post.title === 'string' &&
		typeof post.published === 'string' &&
		typeof post.link === 'string' &&
		typeof post.description === 'string' &&
		post.title.length > 0 &&
		post.published.length > 0 &&
		post.link.length > 0
	);
}

function parsePost(entry: Element): Post {
	const defaultPost: Post = {
		title: 'Untitled',
		published: new Date().toISOString(),
		link: '',
		description: 'No description available'
	};

	try {
		const title =
			entry.querySelector('title')?.textContent?.trim() || defaultPost.title;
		const published =
			entry.querySelector('published')?.textContent?.trim() ||
			defaultPost.published;
		const link =
			entry.querySelector('link')?.getAttribute('href') || defaultPost.link;
		const content = entry.querySelector('content')?.textContent || '';
		const description =
			extractFirstMeaningfulParagraph(content) || defaultPost.description;

		const post = {
			title,
			published,
			link,
			description: truncateDescription(description)
		};

		return validatePost(post) ? post : defaultPost;
	} catch (error) {
		console.error('Error parsing post:', error);
		return defaultPost;
	}
}

export async function fetchFeed(
	options?: PaginationOptions
): Promise<PaginatedResult<Post>> {
	// Check cache first
	if (
		feedCache &&
		!shouldInvalidateCache(feedCache, { success: true, data: null })
	) {
		const { page = 1, pageSize = 10 } = options || {};
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		const items = feedCache.data.slice(start, end);

		console.log('Using cached data:', {
			totalPosts: feedCache.data.length,
			page,
			pageSize,
			start,
			end,
			itemsCount: items.length,
			hasMore: end < feedCache.data.length
		});

		return {
			items,
			total: feedCache.data.length,
			page,
			pageSize,
			hasMore: end < feedCache.data.length
		};
	}

	const result = await fetchXML('https://jonesrussell.github.io/blog/feed.xml');

	if (!result.success) {
		if (feedCache) {
			feedCache.errorCount++;
			feedCache.lastError = result.error;
		}
		console.error('Failed to fetch feed:', result.error);
		return {
			items: feedCache?.data || [],
			total: feedCache?.data.length || 0,
			page: options?.page || 1,
			pageSize: options?.pageSize || 10,
			hasMore: false
		};
	}

	// If we got a 304 Not Modified, return cached data
	if (!result.data) {
		const { page = 1, pageSize = 10 } = options || {};
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		const items = feedCache?.data.slice(start, end) || [];

		console.log('Using cached data (304):', {
			totalPosts: feedCache?.data.length || 0,
			page,
			pageSize,
			start,
			end,
			itemsCount: items.length,
			hasMore: end < (feedCache?.data.length || 0)
		});

		return {
			items,
			total: feedCache?.data.length || 0,
			page,
			pageSize,
			hasMore: end < (feedCache?.data.length || 0)
		};
	}

	const entries = Array.from(result.data.querySelectorAll('entry'));
	const posts = entries.map(parsePost).filter(validatePost);

	// Update cache with error count reset
	feedCache = {
		data: posts,
		timestamp: Date.now(),
		etag: result.etag,
		lastModified: result.lastModified,
		errorCount: 0,
		lastError: undefined
	};

	const { page = 1, pageSize = 10 } = options || {};
	const start = (page - 1) * pageSize;
	const end = start + pageSize;
	const items = posts.slice(start, end);

	console.log('Using fresh data:', {
		totalPosts: posts.length,
		page,
		pageSize,
		start,
		end,
		itemsCount: items.length,
		hasMore: end < posts.length
	});

	return {
		items,
		total: posts.length,
		page,
		pageSize,
		hasMore: end < posts.length
	};
}

export const blogPosts = writable<Post[]>([]);

export async function loadBlogPosts(options?: PaginationOptions) {
	try {
		const result = await fetchFeed(options);
		blogPosts.set(result.items);
	} catch (error) {
		const blogError: BlogError = {
			type: 'FETCH_ERROR',
			message:
				error instanceof Error ? error.message : 'Failed to load blog posts',
			details: error,
			timestamp: Date.now()
		};
		addError(blogError);
		blogPosts.set([]);
	}
}

export { formatDate };
