<script lang="ts">
	import ResourceCard from './ResourceCard.svelte';
	import type { Resource } from '$lib/types/resource';

	const { groupedResources, onTagClick, onClearFilters } = $props<{
		groupedResources: Map<string, Resource[]>;
		onTagClick?: (tag: string) => void;
		onClearFilters?: () => void;
	}>();
</script>

<style>
	.resource-grid {
		display: grid;
		gap: var(--space-12);
	}

	.category-section {
		display: grid;
		gap: var(--space-4);
	}

	.category-title {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	.category-cards {
		container-type: inline-size;
		container-name: category-cards;
		display: grid;
		gap: var(--space-4);
	}

	@container category-cards (min-width: 50rem) {
		.category-cards {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.empty-state {
		padding: var(--space-8);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		text-align: center;
		color: var(--text-muted);
	}

	.empty-state p {
		margin: var(--space-1) 0;
	}

	.clear-button {
		margin-block-start: var(--space-4);
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		background: none;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		cursor: pointer;
	}

	.clear-button:hover {
		border-color: var(--accent-color);
		color: var(--accent-color);
	}
</style>

{#if groupedResources.size > 0}
	<div class="resource-grid">
		{#each [...groupedResources] as [category, resources] (category)}
			<section class="category-section" aria-label="{category} resources">
				<h2 class="category-title">{category}</h2>
				<div class="category-cards">
					{#each resources as resource (resource.title)}
						<ResourceCard {resource} {onTagClick} />
					{/each}
				</div>
			</section>
		{/each}
	</div>
{:else}
	<div class="empty-state" role="status">
		<p>$ grep "query" ./resources</p>
		<p>→ no matches</p>
		{#if onClearFilters}
			<button class="clear-button" onclick={onClearFilters}>clear filters</button>
		{/if}
	</div>
{/if}
