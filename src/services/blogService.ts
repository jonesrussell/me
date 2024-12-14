import { writable } from 'svelte/store';

type Post = {
	title: string;
	published: string;
	link: string;
	description: string;
};

type XMLPost = {
	title: string;
	published: string;
	link: string;
	description: string;
};

function truncateDescription(text: string, maxLength = 280): string {
	if (!text || text.length <= maxLength) return text;
	// Try to find the last complete sentence within the limit
	const truncated = text.slice(0, maxLength);
	const lastSentence = truncated.match(/.*[.!?]/);
	if (lastSentence) {
		return lastSentence[0];
	}
	// If no sentence boundary found, truncate at last space to avoid cutting words
	const lastSpace = truncated.lastIndexOf(' ');
	return truncated.slice(0, lastSpace) + '...';
}

async function fetchXML(url: string): Promise<XMLDocument> {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch feed: ${response.statusText}`);
	}
	const text = await response.text();
	const parser = new DOMParser();
	return parser.parseFromString(text, 'application/xml');
}

function parsePost(entry: Element): XMLPost {
	const title = entry.querySelector('title')?.textContent || '';
	const published = entry.querySelector('published')?.textContent || '';
	const link = entry.querySelector('link')?.getAttribute('href') || '';
	const description = entry.querySelector('summary')?.textContent || '';
	return {
		title,
		published,
		link,
		description: truncateDescription(description)
	};
}

export async function fetchFeed(): Promise<Post[]> {
	try {
		const doc = await fetchXML('https://jonesrussell.github.io/blog/feed.xml');
		const entries = Array.from(doc.querySelectorAll('entry'));
		return entries.map(parsePost);
	} catch (error) {
		console.error('Error fetching feed:', error);
		return [];
	}
}

export const blogPosts = writable<Post[]>([]);

export async function loadBlogPosts() {
	const posts = await fetchFeed();
	blogPosts.set(posts);
}
