/// <reference types="@testing-library/jest-dom" />
import { render } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import ResourceFilter from './ResourceFilter.svelte';

const defaultProps = {
	categories: ['Languages & Frameworks', 'DevOps & Infrastructure'],
	activeCategory: null as string | null,
	activeTags: [] as string[],
	searchQuery: '',
	resultCount: 10,
	totalCount: 10,
	onCategoryChange: vi.fn(),
	onTagRemove: vi.fn(),
	onSearchChange: vi.fn(),
	onClearFilters: vi.fn()
};

describe('ResourceFilter', () => {
	it('renders All button and category buttons', () => {
		const { getByRole } = render(ResourceFilter, { props: defaultProps });
		expect(getByRole('button', { name: 'All' })).toBeInTheDocument();
		expect(getByRole('button', { name: 'Languages & Frameworks' })).toBeInTheDocument();
		expect(getByRole('button', { name: 'DevOps & Infrastructure' })).toBeInTheDocument();
	});

	it('renders search input', () => {
		const { getByPlaceholderText } = render(ResourceFilter, { props: defaultProps });
		expect(getByPlaceholderText('grep -i "..."')).toBeInTheDocument();
	});

	it('shows result count when filtered', () => {
		const { getByText } = render(ResourceFilter, {
			props: { ...defaultProps, resultCount: 3 }
		});
		expect(getByText('3 of 10 resources')).toBeInTheDocument();
	});

	it('shows total count when unfiltered', () => {
		const { getByText } = render(ResourceFilter, { props: defaultProps });
		expect(getByText('10 resources')).toBeInTheDocument();
	});

	it('renders active tag pills with remove buttons', () => {
		const { getByRole } = render(ResourceFilter, {
			props: { ...defaultProps, activeTags: ['backend'] }
		});
		expect(getByRole('button', { name: 'Remove backend filter' })).toBeInTheDocument();
	});
});
