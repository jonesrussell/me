import { writable } from 'svelte/store';
import { formatDate, sanitizeText } from './utils';

// Types
export interface BlogPost {
	title: string;
	link: string;
	published: string;
	description: string;
	slug: string;
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

type PaginationOptions = {
	page: number;
	pageSize: number;
};

type PaginatedResult<T> = {
	items: T[];
	hasMore: boolean;
};

// Constants
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes
const MAX_ERROR_COUNT = 3;
const ERROR_RESET_TIME = 30 * 60 * 1000; // 30 minutes
const FEED_URL = 'https://dev.to/api/articles?username=fullstackdev42';
const FEED_CACHE_KEY = 'blog-feed-cache';

// State
const feedCache = new Map<
	string,
	{
		data: BlogPost[];
		timestamp: number;
		etag?: string;
		lastModified?: string;
	}
>();
export const blogErrors = writable<BlogError[]>([]);

// Utility Functions
function addError(error: BlogError) {
	blogErrors.update(errors => {
		const newErrors = [...errors, error];
		return newErrors.slice(-10); // Keep only last 10 errors
	});
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
		const cached = feedCache.get('current');
		if (cached?.etag) headers.set('If-None-Match', cached.etag);
		if (cached?.lastModified) headers.set('If-Modified-Since', cached.lastModified);

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

		const post = {
			title,
			link,
			published,
			description: sanitizeText(description),
			slug: generateSlug(title)
		};

		return post;
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

function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

export async function fetchFeed({
	page = 1,
	pageSize = 5
}: PaginationOptions): Promise<PaginatedResult<BlogPost>> {
	const cacheKey = `${FEED_CACHE_KEY}-${page}-${pageSize}`;
	const cached = feedCache.get(cacheKey);
	const now = Date.now();

	if (cached && now - cached.timestamp < CACHE_DURATION) {
		return {
			items: cached.data,
			hasMore: cached.data.length === pageSize
		};
	}

	try {
		const response = await fetch(FEED_URL);
		const data = await response.json();

		if (!Array.isArray(data)) {
			throw new Error('Invalid response format');
		}

		const posts: BlogPost[] = data.map((post: any) => ({
			title: post.title,
			link: post.url,
			pubDate: new Date(post.published_at).toLocaleDateString(),
			description: post.description,
			categories: post.tags,
			published: post.published_at,
			slug: post.slug
		}));

		feedCache.set(cacheKey, {
			data: posts,
			timestamp: now,
			etag: response.headers.get('etag') || undefined,
			lastModified: response.headers.get('last-modified') || undefined
		});

		return {
			items: posts,
			hasMore: posts.length === pageSize
		};
	} catch (err) {
		console.error('Error fetching blog feed:', err);
		return {
			items: [],
			hasMore: false
		};
	}
}

export async function fetchPost(slug: string): Promise<BlogPost> {
	try {
		const result = await fetchXML(FEED_URL);
		if (!result.success || !result.data) {
			throw new Error('Failed to fetch feed');
		}

		const entries = Array.from(result.data.querySelectorAll('entry'));
		const posts = entries.map(parsePost);
		const post = posts.find(post => post.slug === slug);

		if (!post) {
			throw new Error('Post not found');
		}

		return post;
	} catch (error) {
		throw new Error('Failed to fetch blog post');
	}
}
