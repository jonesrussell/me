// src/services/blogService.ts
import { writable } from 'svelte/store';

type Post = {
	title: string;
	link: string;
	description: string;
};

async function fetchFeed() {
	const response = await fetch('https://jonesrussell.github.io/blog/feed.xml');
	const text = await response.text();
	const parser = new DOMParser();
	const doc = parser.parseFromString(text, 'application/xml');
	const items = Array.from(doc.querySelectorAll('item')).map((item) => ({
		title: item.querySelector('title')?.textContent || '',
		link: item.querySelector('link')?.textContent || '',
		description: item.querySelector('description')?.textContent || ''
	}));
	return items;
}

export const blogPosts = writable<Post[]>([], () => {
	fetchFeed().then((posts) => {
		blogPosts.set(posts);
	});
});
