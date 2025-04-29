import { writable } from 'svelte/store';
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
	page?: number;
	pageSize?: number;
}

type PaginatedResult<T> = {
	items: T[];
	hasMore: boolean;
};

// Store
export const blogStore = writable<{
	posts: BlogPost[];
	loading: boolean;
	error: BlogError | null;
}>({
	posts: [],
	loading: false,
	error: null
});

export const blogErrors = writable<BlogError[]>([]);

// Cache
const feedCache = new Map<string, FeedCache>();

// Utility Functions
export function formatPostDate(dateString: string): string {
	return formatDate(dateString);
}

export function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

// Core Functions
export async function fetchPost(slug: string): Promise<BlogPost> {
	try {
		const result = await fetchFeed();
		const post = result.items.find(post => generateSlug(post.title) === slug);

		if (!post) {
			throw new Error('Post not found');
		}

		return post;
	} catch {
		throw new Error('Failed to fetch blog post');
	}
}

export async function fetchFeed({ page = 1, pageSize = 5 }: PaginationOptions = {}): Promise<
	PaginatedResult<BlogPost>
> {
	console.log('fetchFeed called with:', { page, pageSize });
	blogStore.update(state => ({ ...state, loading: true, error: null }));

	const cacheKey = `${FEED_CACHE_KEY}-${page}-${pageSize}`;
	const cached = feedCache.get(cacheKey);

	if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
		console.log('Using cached data');
		blogStore.update(state => ({ ...state, loading: false }));
		return {
			items: cached.data.slice((page - 1) * pageSize, page * pageSize),
			hasMore: cached.data.length > page * pageSize
		};
	}

	try {
		console.log('Fetching blog feed from:', FEED_URL);
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 10000);

		const response = await fetch(FEED_URL, {
			headers: {
				'Accept': 'application/xml, text/xml, */*'
			},
			signal: controller.signal
		}).finally(() => clearTimeout(timeoutId));

		if (!response.ok) {
			console.error('Failed to fetch blog feed:', response.status, response.statusText);
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const text = await response.text();
		console.log('Received feed content:', text.substring(0, 200) + '...');

		const parser = new DOMParser();
		const doc = parser.parseFromString(text, 'text/xml');

		// Handle parsing errors
		const parserError = doc.querySelector('parsererror');
		if (parserError) {
			console.error('XML parsing error:', parserError.textContent);
			throw new Error('Failed to parse XML feed');
		}

		// Handle Atom feed format
		const entries = Array.from(doc.querySelectorAll('entry')).map(entry => {
			const title = entry.querySelector('title')?.textContent || '';
			const link = entry.querySelector('link[rel="alternate"]')?.getAttribute('href') || '';
			const content = entry.querySelector('content')?.textContent || '';
			const published = entry.querySelector('published')?.textContent ||
				entry.querySelector('updated')?.textContent || '';
			const categories = Array.from(entry.querySelectorAll('category'))
				.map(cat => cat.getAttribute('term') || '')
				.filter(Boolean);

			console.log('Parsed entry:', { title, link, published, categories });

			return {
				title,
				link,
				content,
				published,
				categories
			};
		});

		console.log('Total entries found:', entries.length);

		const posts: BlogPost[] = entries.map(entry => ({
			title: entry.title,
			link: entry.link,
			content: entry.content,
			published: entry.published,
			categories: entry.categories,
			slug: generateSlug(entry.title)
		}));

		// Update cache
		feedCache.set(cacheKey, {
			data: posts,
			timestamp: Date.now(),
			etag: response.headers.get('etag') || undefined,
			lastModified: response.headers.get('last-modified') || undefined,
			errorCount: 0
		});

		blogStore.update(state => ({ ...state, loading: false, posts }));

		return {
			items: posts.slice((page - 1) * pageSize, page * pageSize),
			hasMore: posts.length > page * pageSize
		};
	} catch (error) {
		console.error('Error fetching blog feed:', error);
		const errorCount = (cached?.errorCount || 0) + 1;
		const lastError = error instanceof Error ? error.message : 'Unknown error';

		// Update cache with error
		feedCache.set(cacheKey, {
			data: cached?.data || [],
			timestamp: Date.now(),
			errorCount,
			lastError
		});

		const blogError: BlogError = {
			type: 'FETCH_ERROR',
			message: lastError,
			details: error,
			timestamp: Date.now()
		};

		blogStore.update(state => ({ ...state, loading: false, error: blogError }));
		blogErrors.update(errors => [...errors, blogError]);

		throw error;
	}
}
