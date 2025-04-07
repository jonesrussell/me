import { writable } from 'svelte/store';
import { truncateDescription, formatDate, extractFirstMeaningfulParagraph } from './utils';

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
}

// Cache for memoization
interface FeedCache {
	data: Post[];
	timestamp: number;
	etag?: string;
}

let feedCache: FeedCache | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchXML(url: string): Promise<FetchResult> {
	try {
		const headers = new Headers();
		if (feedCache?.etag) {
			headers.set('If-None-Match', feedCache.etag);
		}

		const response = await fetch(url, { headers });

		if (response.status === 304) {
			return { success: true, data: null };
		}

		if (!response.ok) {
			return {
				success: false,
				data: null,
				error: `Failed to fetch feed: ${response.statusText}`
			};
		}

		const text = await response.text();
		const parser = new DOMParser();
		const xml = parser.parseFromString(text, 'application/xml');

		// Validate XML structure
		if (!xml.querySelector('entry')) {
			return {
				success: false,
				data: null,
				error: 'Invalid XML format: No entries found'
			};
		}

		return {
			success: true,
			data: xml,
			error: response.headers.get('etag') || undefined
		};
	} catch (error) {
		return {
			success: false,
			data: null,
			error: error instanceof Error ? error.message : 'Unknown error occurred'
		};
	}
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
		const title = entry.querySelector('title')?.textContent?.trim() || defaultPost.title;
		const published = entry.querySelector('published')?.textContent?.trim() || defaultPost.published;
		const link = entry.querySelector('link')?.getAttribute('href') || defaultPost.link;
		const content = entry.querySelector('content')?.textContent || '';
		const description = extractFirstMeaningfulParagraph(content) || defaultPost.description;

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

export async function fetchFeed(): Promise<Post[]> {
	// Check cache first
	if (feedCache && Date.now() - feedCache.timestamp < CACHE_DURATION) {
		return feedCache.data;
	}

	const result = await fetchXML('https://jonesrussell.github.io/blog/feed.xml');

	if (!result.success) {
		console.error('Failed to fetch feed:', result.error);
		return feedCache?.data || [];
	}

	// If we got a 304 Not Modified, return cached data
	if (!result.data) {
		return feedCache?.data || [];
	}

	const entries = Array.from(result.data.querySelectorAll('entry'));
	const posts = entries.map(parsePost).filter(validatePost);

	// Update cache
	feedCache = {
		data: posts,
		timestamp: Date.now(),
		etag: result.error
	};

	return posts;
}

export const blogPosts = writable<Post[]>([]);

export async function loadBlogPosts() {
	try {
		const posts = await fetchFeed();
		blogPosts.set(posts);
	} catch (error) {
		console.error('Error loading blog posts:', error);
		blogPosts.set([]);
	}
}

export { formatDate };
