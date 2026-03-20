import { describe, it, expect } from 'vitest';
import { filterResources } from './resource-filter';
import type { Resource } from '$lib/types/resource';

const resources: Resource[] = [
	{
		title: 'Go',
		url: 'https://go.dev',
		category: 'Languages & Frameworks',
		tags: ['backend', 'cli'],
		description: 'My primary backend language.',
		dailyDriver: true
	},
	{
		title: 'SvelteKit',
		url: 'https://svelte.dev',
		category: 'Languages & Frameworks',
		tags: ['frontend', 'ssr'],
		description: 'This site is built with it.',
		dailyDriver: true
	},
	{
		title: 'Docker',
		url: 'https://docker.com',
		category: 'DevOps & Infrastructure',
		tags: ['containers', 'cli'],
		description: 'Containerization platform.',
		dailyDriver: false
	}
];

describe('filterResources', () => {
	it('returns all resources with no filters', () => {
		const result = filterResources(resources, null, [], '');
		expect(result).toHaveLength(3);
	});

	it('filters by category', () => {
		const result = filterResources(resources, 'Languages & Frameworks', [], '');
		expect(result).toHaveLength(2);
		expect(result.every((r) => r.category === 'Languages & Frameworks')).toBe(true);
	});

	it('filters by single tag within category', () => {
		const result = filterResources(resources, 'Languages & Frameworks', ['frontend'], '');
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe('SvelteKit');
	});

	it('uses AND logic for multiple tags', () => {
		const result = filterResources(resources, null, ['backend', 'cli'], '');
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe('Go');
	});

	it('filters by search query across title', () => {
		const result = filterResources(resources, null, [], 'docker');
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe('Docker');
	});

	it('filters by search query across description', () => {
		const result = filterResources(resources, null, [], 'primary');
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe('Go');
	});

	it('filters by search query across tags', () => {
		const result = filterResources(resources, null, [], 'ssr');
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe('SvelteKit');
	});

	it('combines category + tags + search', () => {
		const result = filterResources(resources, 'Languages & Frameworks', ['backend'], 'go');
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe('Go');
	});

	it('returns empty array when nothing matches', () => {
		const result = filterResources(resources, null, [], 'nonexistent');
		expect(result).toHaveLength(0);
	});
});
