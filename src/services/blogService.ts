import { writable } from 'svelte/store';

interface Post {
	title: string;
	published: string;
	link: string;
	description: string;
}

async function fetchXML(url: string): Promise<XMLDocument | null> {
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`Failed to fetch feed: ${response.statusText}`);

		const text = await response.text();
		const parser = new DOMParser();
		const xml = parser.parseFromString(text, 'application/xml');

		// Validate XML structure
		if (!xml.querySelector('entry')) {
			throw new Error('Invalid XML format');
		}

		return xml;
	} catch (error) {
		console.error('Error fetching XML:', error);
		return null;
	}
}

function sanitizeText(text: string): string {
	return text.replace(/<[^>]*>/g, '').trim();
}

function truncateDescription(text: string, maxLength = 280): string {
	if (!text || text.length <= maxLength) return text;
	const truncated = text.slice(0, maxLength);
	const lastSentence = truncated.match(/.*[.!?]/) || [truncated.slice(0, truncated.lastIndexOf(' '))];
	return lastSentence[0] + '...';
}

function parsePost(entry: Element): Post {
	return {
		title: entry.querySelector('title')?.textContent?.trim() || 'Untitled',
		published: entry.querySelector('published')?.textContent?.trim() || '',
		link: entry.querySelector('link')?.getAttribute('href') || '',
		description: truncateDescription(sanitizeText(entry.querySelector('summary')?.textContent || ''))
	};
}

export async function fetchFeed(): Promise<Post[]> {
	const doc = await fetchXML('https://jonesrussell.github.io/blog/feed.xml');
	if (!doc) return [];

	const entries = Array.from(doc.querySelectorAll('entry'));
	return entries.map(parsePost);
}

export const blogPosts = writable<Post[]>([]);

export async function loadBlogPosts() {
	blogPosts.set(await fetchFeed());
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
