import { writable } from 'svelte/store';
import { formatDate } from './utils';
import type { BlogPost } from '$lib/types/blog';
import { XMLParser } from 'fast-xml-parser';

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
		const response = await fetch(FEED_URL, {
			headers: {
				Accept: 'application/xml',
				'Cache-Control': 'no-cache'
			},
			signal: AbortSignal.timeout(5000)
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const text = await response.text();
		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: '@_',
			parseAttributeValue: true
		});

		const parsed = parser.parse(text);
		const items = parsed.rss?.channel?.item || [];

		const posts: BlogPost[] = items.map((item: any) => ({
			title: item.title || '',
			link: item.link || '',
			pubDate: item.pubDate || '',
			description: item.description || '',
			content: item['content:encoded'] || '',
			categories: Array.isArray(item.category) ? item.category : [item.category].filter(Boolean)
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
	} catch (error) {
		console.error('Error fetching blog feed:', error);
		return {
			items: [],
			hasMore: false
		};
	}
}
