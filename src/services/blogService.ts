// src/services/blogService.ts
import { writable } from 'svelte/store';

type Post = {
	title: string;
	link: string;
	description: string;
};

export async function fetchFeed() {
  const response = await fetch('https://jonesrussell.github.io/blog/feed.xml');
  const text = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'application/xml');
  const items = Array.from(doc.querySelectorAll('entry')).map((entry) => {
    const title = entry.querySelector('title')?.textContent || '';
    const link = entry.querySelector('link')?.getAttribute('href') || '';
    const description = entry.querySelector('summary')?.textContent || '';
    return { title, link, description };
  });
  return items;
}

export const blogPosts = writable<Post[]>([]);
