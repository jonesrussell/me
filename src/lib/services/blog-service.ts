import { writable } from 'svelte/store';
import { formatDate } from './utils';
import type { BlogPost } from '$lib/types/blog';

// Constants
const FEED_URL = 'https://blog.russelljones.dev/feed.xml';
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

function generateSlug(title: string): string {
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
		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

		const text = await response.text();
		const parser = new DOMParser();
		const doc = parser.parseFromString(text, 'text/xml');

		const posts = Array.from(doc.querySelectorAll('item')).map(item => ({
			title: item.querySelector('title')?.textContent || '',
			link: item.querySelector('link')?.textContent || '',
			pubDate: item.querySelector('pubDate')?.textContent || '',
			description: item.querySelector('description')?.textContent || '',
			content: item.querySelector('content:encoded')?.textContent || '',
			categories: Array.from(item.querySelectorAll('category')).map(cat => cat.textContent || '')
		}));

		feedCache.set(cacheKey, {
			data: posts,
			timestamp: now,
			etag: response.headers.get('etag') || undefined,
			lastModified: response.headers.get('last-modified') || undefined,
			errorCount: 0
		});

		return {
			items: posts,
			hasMore: posts.length === pageSize
		};
	} catch {
		console.error('Error fetching blog feed');
		return {
			items: [],
			hasMore: false
		};
	}
}

// ... rest of the file ...
