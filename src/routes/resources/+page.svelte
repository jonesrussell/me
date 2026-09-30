<script lang="ts">
	import { onMount } from 'svelte';
	import PageHero from '$lib/components/site/PageHero.svelte';
	import Meta from '$lib/components/site/Meta.svelte';
	import ResourceFilter from '$lib/components/resources/ResourceFilter.svelte';
	import ResourceGrid from '$lib/components/resources/ResourceGrid.svelte';
	import { filterResources } from '$lib/services/resource-filter';
	import { groupByCategory, CATEGORY_ORDER } from '$lib/services/resource-loader';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();

	let activeCategory = $state<string | null>(null);
	let activeTags = $state<string[]>([]);
	let searchQuery = $state('');
	let hydrated = $state(false);

	// Initialize filter state from URL params (client-side only, runs once on mount)
	onMount(() => {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams(window.location.search);
		const cat = params.get('category');
		const tags = params.getAll('tag');
		const q = params.get('q');
		if (cat) activeCategory = cat;
		if (tags.length > 0) activeTags = tags;
		if (q) searchQuery = q;
		hydrated = true;
	});

	const filtered = $derived(
		filterResources(data.resources, activeCategory, activeTags, searchQuery)
	);
	const grouped = $derived(groupByCategory(filtered));

	function updateUrl() {
		if (typeof window === 'undefined') return;
		const url = new URL(window.location.href);
		url.searchParams.delete('category');
		url.searchParams.delete('tag');
		url.searchParams.delete('q');
		if (activeCategory) url.searchParams.set('category', activeCategory);
		for (const tag of activeTags) url.searchParams.append('tag', tag);
		if (searchQuery) url.searchParams.set('q', searchQuery);
		history.replaceState(history.state, '', url.toString());
	}

	function handleCategoryChange(category: string | null) {
		activeCategory = category;
		updateUrl();
	}

	function handleTagClick(tag: string) {
		if (!activeTags.includes(tag)) {
			activeTags = [...activeTags, tag];
			updateUrl();
		}
	}

	function handleTagRemove(tag: string) {
		activeTags = activeTags.filter((t) => t !== tag);
		updateUrl();
	}

	function handleSearchChange(query: string) {
		searchQuery = query;
		updateUrl();
	}

	function handleClearFilters() {
		activeCategory = null;
		activeTags = [];
		searchQuery = '';
		updateUrl();
	}
</script>

<style>
	.resources {
		container-type: inline-size;
		container-name: resources-page;
		display: grid;
		width: 100%;
		padding: var(--space-16) 0;
		gap: var(--space-8);
	}

	.container {
		display: grid;
		width: 100%;
		margin-inline: auto;
		padding-inline: var(--space-4);
		max-width: min(var(--measure), 95cqi);
		gap: var(--space-8);
	}

	@container resources-page (min-width: 40rem) {
		.container {
			padding-inline: var(--space-8);
		}
	}

	@container resources-page (min-width: 48rem) {
		.container {
			padding-inline: var(--space-12);
		}
	}

	@container resources-page (min-width: 64rem) {
		.container {
			padding-inline: var(--space-16);
		}
	}

	@container resources-page (min-width: 80rem) {
		.container {
			padding-inline: var(--space-20);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			transition: none;
			animation: none;
		}
	}
</style>

<Meta
	title="Resources"
	description="Tools, documentation and learning resources for software development, with context on why I use them."
	path="/resources"
/>
<PageHero
	label="Resources"
	title="Useful tools."
	accent="Worth sharing."
	intro="An opinionated collection of documentation, developer tools and places to learn."
/>

<div class="resources" data-hydrated={hydrated || undefined}>
	<div class="container">
		<ResourceFilter
			categories={CATEGORY_ORDER}
			{activeCategory}
			{activeTags}
			{searchQuery}
			resultCount={filtered.length}
			totalCount={data.resources.length}
			onCategoryChange={handleCategoryChange}
			onTagRemove={handleTagRemove}
			onSearchChange={handleSearchChange}
			onClearFilters={handleClearFilters}
		/>

		<ResourceGrid
			groupedResources={grouped}
			onTagClick={handleTagClick}
			onClearFilters={handleClearFilters}
		/>
	</div>
</div>
