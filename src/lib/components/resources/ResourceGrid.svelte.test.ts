/// <reference types="@testing-library/jest-dom" />
import { render } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import ResourceGrid from './ResourceGrid.svelte';
import type { Resource } from '$lib/types/resource';

const makeResource = (overrides: Partial<Resource> = {}): Resource => ({
	title: 'Go',
	url: 'https://go.dev',
	category: 'Languages & Frameworks',
	tags: ['backend'],
	description: 'My primary backend language.',
	...overrides
});

const twoCategories = new Map<string, Resource[]>([
	[
		'Languages & Frameworks',
		[
			makeResource({ title: 'Go', url: 'https://go.dev' }),
			makeResource({ title: 'SvelteKit', url: 'https://svelte.dev', tags: ['frontend'] })
		]
	],
	[
		'DevOps & Infrastructure',
		[makeResource({ title: 'Docker', url: 'https://docker.com', category: 'DevOps & Infrastructure', tags: ['containers'] })]
	]
]);

describe('ResourceGrid', () => {
	it('renders category section headings from the map', () => {
		const { getByText } = render(ResourceGrid, {
			props: { groupedResources: twoCategories }
		});
		expect(getByText('Languages & Frameworks')).toBeInTheDocument();
		expect(getByText('DevOps & Infrastructure')).toBeInTheDocument();
	});

	it('renders resource cards within sections', () => {
		const { getByRole } = render(ResourceGrid, {
			props: { groupedResources: twoCategories }
		});
		expect(getByRole('link', { name: 'Go' })).toBeInTheDocument();
		expect(getByRole('link', { name: 'SvelteKit' })).toBeInTheDocument();
		expect(getByRole('link', { name: 'Docker' })).toBeInTheDocument();
	});

	it('shows empty state with "no matches" text when map is empty', () => {
		const { getByText } = render(ResourceGrid, {
			props: { groupedResources: new Map() }
		});
		expect(getByText('→ no matches')).toBeInTheDocument();
	});

	it('shows "clear filters" button in empty state when onClearFilters is provided', () => {
		const onClearFilters = vi.fn();
		const { getByRole } = render(ResourceGrid, {
			props: { groupedResources: new Map(), onClearFilters }
		});
		const btn = getByRole('button', { name: 'clear filters' });
		expect(btn).toBeInTheDocument();
	});

	it('does not show "clear filters" button when onClearFilters is not provided', () => {
		const { queryByRole } = render(ResourceGrid, {
			props: { groupedResources: new Map() }
		});
		expect(queryByRole('button', { name: 'clear filters' })).toBeNull();
	});
});
