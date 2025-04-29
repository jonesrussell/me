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
		console.log('Fetching feed from:', FEED_URL);
		const response = await fetch(FEED_URL, {
			headers: {
				Accept: 'application/xml'
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const text = await response.text();
		console.log('Feed response received:', {
			length: text.length,
			firstChars: text.substring(0, 100)
		});

		if (!text.trim()) {
			throw new Error('Empty response received from feed');
		}

		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: '@_',
			parseAttributeValue: true,
			textNodeName: '#text',
			htmlEntities: true
		});

		const parsed = parser.parse(text);

		// Handle Atom feed format
		const entries = parsed.feed?.entry || [];
		const posts: BlogPost[] = entries.map((entry: any) => {
			// Extract title text
			const title = typeof entry.title === 'string' ? entry.title : entry.title?.['#text'] || '';

			// Extract link href
			const link = Array.isArray(entry.link)
				? entry.link.find((l: any) => l['@_rel'] === 'alternate')?.['@_href'] || ''
				: entry.link?.['@_href'] || '';

			// Extract content and description
			const content =
				typeof entry.content === 'string' ? entry.content : entry.content?.['#text'] || '';

			// Extract first paragraph for description
			const description = content
				? content
						.replace(/<[^>]*>/g, '') // Remove HTML tags
						.split('\n')[0] // Get first line
						.substring(0, 200) // Limit length
						.trim()
				: '';

			// Extract categories
			const categories = Array.isArray(entry.category)
				? entry.category.map((cat: any) => cat['@_term'] || '')
				: entry.category
					? [entry.category['@_term'] || '']
					: [];

			return {
				title,
				link,
				pubDate: entry.published || entry.updated || '',
				description,
				content,
				categories
			};
		});

		feedCache.set(cacheKey, {
			data: posts,
			timestamp: now,
			errorCount: 0
		});

		return {
			items: posts,
			hasMore: posts.length === pageSize
		};
	} catch (error) {
		console.error('Error fetching blog feed:', {
			error,
			message: error instanceof Error ? error.message : 'Unknown error',
			stack: error instanceof Error ? error.stack : undefined
		});

		const blogError: BlogError = {
			type: 'FETCH_ERROR',
			message: error instanceof Error ? error.message : 'Unknown error occurred',
			details: error,
			timestamp: Date.now()
		};
		blogErrors.update(errors => [...errors, blogError]);
		return {
			items: [],
			hasMore: false
		};
	}
}
