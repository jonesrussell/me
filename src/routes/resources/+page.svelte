<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import Hero from '$lib/components/ui/Hero.svelte';
	import ResourceFilter from '$lib/components/resources/ResourceFilter.svelte';
	import ResourceGrid from '$lib/components/resources/ResourceGrid.svelte';
	import { filterResources } from '$lib/services/resource-filter';
	import { groupByCategory, CATEGORY_ORDER } from '$lib/services/resource-loader';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();

	let activeCategory = $state<string | null>(null);
	let activeTags = $state<string[]>([]);
	let searchQuery = $state('');

	// Initialize filter state from URL params (client-side only)
	$effect(() => {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams(window.location.search);
		const cat = params.get('category');
		const tags = params.getAll('tag');
		const q = params.get('q');
		if (cat) activeCategory = cat;
		if (tags.length > 0) activeTags = tags;
		if (q) searchQuery = q;
	});

	const filtered = $derived(filterResources(data.resources, activeCategory, activeTags, searchQuery));
	const grouped = $derived(groupByCategory(filtered));

	function updateUrl() {
		const url = new URL(page.url);
		url.searchParams.delete('category');
		url.searchParams.delete('tag');
		url.searchParams.delete('q');
		if (activeCategory) url.searchParams.set('category', activeCategory);
		for (const tag of activeTags) url.searchParams.append('tag', tag);
		if (searchQuery) url.searchParams.set('q', searchQuery);
		// eslint-disable-next-line svelte/no-navigation-without-resolve -- same-page query param update
		goto(url.toString(), { replaceState: true, noScroll: true, keepFocus: true });
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

<svelte:head>
	<title>Resources | Russell Jones - Curated Developer Toolkit</title>
	<meta
		name="description"
		content="My opinionated picks for languages, tools, libraries, and learning resources. Go, SvelteKit, Docker, Neovim, and more — with context on why I use each one."
	/>
</svelte:head>

<Hero title="Resources" subtitle="// cat bookmarks.md" variant="resources" />

<div class="resources">
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
