import { writable } from 'svelte/store';
import {
	formatDate,
	sanitizeText,
	truncateDescription,
	extractFirstMeaningfulParagraph
} from './utils';

// Types
export interface BlogPost {
	title: string;
	link: string;
	published: string;
	description: string;
}

interface FetchResult {
	success: boolean;
	data: XMLDocument | null;
	error?: string;
	etag?: string;
	lastModified?: string;
}

interface FeedCache {
	data: BlogPost[];
	timestamp: number;
	etag?: string;
	lastModified?: string;
	errorCount: number;
	lastError?: string;
}

export interface BlogError {
	type: 'FETCH_ERROR' | 'PARSE_ERROR' | 'VALIDATION_ERROR' | 'CACHE_ERROR';
	message: string;
	details?: unknown;
	timestamp: number;
}

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

// Constants
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_ERROR_COUNT = 3;
const ERROR_RESET_TIME = 30 * 60 * 1000; // 30 minutes

// State
let feedCache: FeedCache | null = null;
export const blogErrors = writable<BlogError[]>([]);

// Utility Functions
function addError(error: BlogError) {
	blogErrors.update(errors => {
		const newErrors = [...errors, error];
		return newErrors.slice(-10); // Keep only last 10 errors
	});
}

function validatePost(post: Partial<BlogPost>): post is BlogPost {
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

function shouldInvalidateCache(cache: FeedCache, result: FetchResult): boolean {
	if (cache.errorCount >= MAX_ERROR_COUNT) return true;
	if (result.etag && result.etag !== cache.etag) return true;
	if (result.lastModified && result.lastModified !== cache.lastModified) return true;
	if (Date.now() - cache.timestamp > CACHE_DURATION) return true;

	if (cache.lastError && Date.now() - cache.timestamp > ERROR_RESET_TIME) {
		cache.errorCount = 0;
		cache.lastError = undefined;
	}

	return false;
}

// Core Functions
async function fetchXML(url: string): Promise<FetchResult> {
	try {
		const headers = new Headers();
		if (feedCache?.etag) headers.set('If-None-Match', feedCache.etag);
		if (feedCache?.lastModified) headers.set('If-Modified-Since', feedCache.lastModified);

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
				details: { status: response.status, url },
				timestamp: Date.now()
			};
			addError(error);
			return { success: false, data: null, error: error.message };
		}

		const text = await response.text();
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(text, 'text/xml');

		if (xmlDoc.documentElement.nodeName === 'parsererror') {
			const error: BlogError = {
				type: 'PARSE_ERROR',
				message: 'Failed to parse XML feed',
				details: { text },
				timestamp: Date.now()
			};
			addError(error);
			return { success: false, data: null, error: error.message };
		}

		return {
			success: true,
			data: xmlDoc,
			etag: response.headers.get('etag') || undefined,
			lastModified: response.headers.get('last-modified') || undefined
		};
	} catch (err) {
		const error: BlogError = {
			type: 'FETCH_ERROR',
			message: err instanceof Error ? err.message : 'Unknown error occurred while fetching feed',
			details: err,
			timestamp: Date.now()
		};
		addError(error);
		return { success: false, data: null, error: error.message };
	}
}

function parsePost(entry: Element): BlogPost {
	try {
		const title = entry.querySelector('title')?.textContent?.trim();
		const link =
			entry.querySelector('link')?.getAttribute('href') ||
			entry.querySelector('link')?.textContent?.trim();
		const published =
			entry.querySelector('published')?.textContent?.trim() ||
			entry.querySelector('pubDate')?.textContent?.trim();
		const description =
			entry.querySelector('description')?.textContent?.trim() ||
			entry.querySelector('content')?.textContent?.trim();

		if (!title || !link || !published || !description) {
			throw new Error('Missing required fields in blog post');
		}

		return {
			title,
			link,
			published,
			description: sanitizeText(description)
		};
	} catch (err) {
		const error: BlogError = {
			type: 'VALIDATION_ERROR',
			message: err instanceof Error ? err.message : 'Failed to parse blog post',
			details: { entry: entry.outerHTML },
			timestamp: Date.now()
		};
		addError(error);
		throw error;
	}
}

// Public API
export function formatPostDate(dateString: string): string {
	return formatDate(dateString);
}

export async function fetchFeed(options?: PaginationOptions): Promise<PaginatedResult<BlogPost>> {
	if (feedCache && !shouldInvalidateCache(feedCache, { success: true, data: null })) {
		const { page = 1, pageSize = 10 } = options || {};
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		const items = feedCache.data.slice(start, end);

		return {
			items,
			total: feedCache.data.length,
			page,
			pageSize,
			hasMore: end < feedCache.data.length
		};
	}

	const result = await fetchXML('https://jonesrussell.github.io/blog/feed.xml');

	if (!result.success || !result.data) {
		if (feedCache) {
			return {
				items: feedCache.data,
				total: feedCache.data.length,
				page: 1,
				pageSize: 10,
				hasMore: false
			};
		}
		return {
			items: [],
			total: 0,
			page: 1,
			pageSize: 10,
			hasMore: false
		};
	}

	const entries = Array.from(result.data.querySelectorAll('entry'));
	const posts = entries.map(parsePost);

	feedCache = {
		data: posts,
		timestamp: Date.now(),
		etag: result.etag,
		lastModified: result.lastModified,
		errorCount: 0
	};

	const { page = 1, pageSize = 10 } = options || {};
	const start = (page - 1) * pageSize;
	const end = start + pageSize;
	const items = posts.slice(start, end);

	return {
		items,
		total: posts.length,
		page,
		pageSize,
		hasMore: end < posts.length
	};
}
