import { writable } from 'svelte/store';

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
let feedCache: {
	data: Post[];
	timestamp: number;
} | null = null;

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchXML(url: string): Promise<FetchResult> {
	try {
		const response = await fetch(url);
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

		return { success: true, data: xml };
	} catch (error) {
		return {
			success: false,
			data: null,
			error: error instanceof Error ? error.message : 'Unknown error occurred'
		};
	}
}

function sanitizeText(text: string): string {
	return text.replace(/<[^>]*>/g, '').trim();
}

function truncateDescription(text: string, maxLength = 280): string {
	if (!text || text.length <= maxLength) return text;

	// Try to find a natural sentence break
	const truncated = text.slice(0, maxLength);
	const sentenceMatch = truncated.match(/(.*?[.!?])\s/);

	if (sentenceMatch) {
		return sentenceMatch[1] + '...';
	}

	// If no sentence break found, try to break at a word boundary
	const wordBoundary = truncated.lastIndexOf(' ');
	if (wordBoundary > maxLength * 0.8) { // Only break if we're keeping most of the text
		return truncated.slice(0, wordBoundary) + '...';
	}

	// If we can't find a good break point, just truncate
	return truncated + '...';
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

		// Get description from content
		const content = entry.querySelector('content')?.textContent || '';

		// Extract meaningful content, skipping greetings and intro text
		let description = '';
		const paragraphs = content.match(/<p>(.*?)<\/p>/g) || [];

		// Find the first non-greeting paragraph
		for (const paragraph of paragraphs) {
			const text = sanitizeText(paragraph.replace(/<p>|<\/p>/g, ''));
			if (!text.match(/^(Ahnii!|Hello|Hi|Hey|Greetings)/i)) {
				description = text;
				break;
			}
		}

		// If no suitable paragraph found, use the first paragraph
		if (!description && paragraphs.length > 0) {
			const firstParagraph = paragraphs[0];
			if (firstParagraph) {
				description = sanitizeText(firstParagraph.replace(/<p>|<\/p>/g, ''));
			}
		}

		return {
			title,
			published,
			link,
			description: truncateDescription(description || defaultPost.description)
		};
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

	if (!result.success || !result.data) {
		console.error('Failed to fetch feed:', result.error);
		return feedCache?.data || []; // Return cached data if available, otherwise empty array
	}

	const entries = Array.from(result.data.querySelectorAll('entry'));
	const posts = entries.map(parsePost);

	// Update cache
	feedCache = {
		data: posts,
		timestamp: Date.now()
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

function formatDate(dateString: string): string {
	try {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			throw new Error('Invalid date');
		}
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	} catch (error) {
		console.error('Error formatting date:', error);
		return dateString;
	}
}

export { formatDate };
