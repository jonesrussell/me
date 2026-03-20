import matter from 'gray-matter';
import type { Resource } from '$lib/types/resource';

export const CATEGORY_ORDER = [
	'Languages & Frameworks',
	'Dev Environment',
	'DevOps & Infrastructure',
	'Libraries & Packages',
	'Learning'
];

export function parseResource(raw: string): Resource {
	const { data, content } = matter(raw);
	return {
		title: data.title,
		url: data.url,
		category: data.category,
		tags: data.tags,
		dailyDriver: data.dailyDriver ?? false,
		video: data.video,
		description: content.trim()
	};
}

export function loadResources(modules: Record<string, string>): Resource[] {
	return Object.entries(modules).map(([, raw]) => parseResource(raw));
}

export function groupByCategory(resources: Resource[]): Map<string, Resource[]> {
	const grouped = new Map<string, Resource[]>();

	for (const cat of CATEGORY_ORDER) {
		grouped.set(cat, []);
	}

	for (const resource of resources) {
		const existing = grouped.get(resource.category);
		if (existing) {
			existing.push(resource);
		} else {
			grouped.set(resource.category, [resource]);
		}
	}

	for (const [, items] of grouped) {
		items.sort((a, b) => {
			if (a.dailyDriver && !b.dailyDriver) return -1;
			if (!a.dailyDriver && b.dailyDriver) return 1;
			return a.title.localeCompare(b.title);
		});
	}

	for (const [cat, items] of grouped) {
		if (items.length === 0) grouped.delete(cat);
	}

	return grouped;
}
