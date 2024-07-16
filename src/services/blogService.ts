// src/services/blogService.ts
import { writable } from 'svelte/store';

type Post = {
	title: string;
	link: string;
	description: string;
};

export async function fetchFeed() {
  console.log('Fetching feed...');
  const response = await fetch('https://jonesrussell.github.io/blog/feed.xml');
  console.log('Feed fetched:', response);
  const text = await response.text();
  console.log('Feed text:', text);
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'application/xml');
  console.log('Parsed XML document:', doc);
  const items = Array.from(doc.querySelectorAll('entry')).map((entry) => {
    const title = entry.querySelector('title')?.textContent || '';
    const link = entry.querySelector('link')?.getAttribute('href') || '';
    // Prioritize 'summary' over 'content'
    const description = entry.querySelector('summary')?.textContent || '';
    console.log('Processed entry:', { title, link, description });
    return { title, link, description };
  });
  console.log('All entries processed:', items);
  return items;
}

export const blogPosts = writable<Post[]>([]);
