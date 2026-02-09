<script lang="ts">
	import ResourceCard from './ResourceCard.svelte';
	import type { Resource } from '$lib/types/resource';

	const { category, resources, index = 0 } = $props<{
		category: string;
		resources: Resource[];
		index?: number;
	}>();

	const indexLabel = $derived(String(index + 1).padStart(2, '0'));

	function getCategoryIcon(category: string): string {
		switch (category) {
			case 'Essential Tools & Platforms':
				return '🚀';
			case 'AI':
				return '🤖';
			case 'Documentation':
				return '📚';
			case 'Go':
				return '🏃';
			case 'Web Development':
				return '🌐';
			case 'DevOps':
				return '🛠️';
			case 'Tools':
				return '🔧';
			case 'Learning Paths':
				return '📖';
			default:
				return '📌';
		}
	}
</script>

<style>
	.category-section {
		@container resource-section (width >= 48ch) {
			margin: var(--space-8) 0;

			& h2 {
				font-size: var(--font-size-lg);
			}

			& .resource-grid {
				gap: var(--space-4);
			}
		}

		@container resource-section (width >= 80ch) {
			& .resource-grid {
				grid-template-columns: repeat(2, 1fr);
				gap: var(--space-6);
			}
		}

		@container resource-section (width >= 120ch) {
			& .resource-grid {
				gap: var(--space-8);
			}
		}

		container-type: inline-size;
		container-name: resource-section;
		margin: var(--space-6) 0;

		& h2 {
			display: flex;
			align-items: center;
			gap: var(--space-2);
			margin: 0 0 var(--space-3) 0;
			font-size: var(--font-size-base);
			line-height: var(--line-height-tight);
			color: var(--text-color);
		}

		& .index-marker {
			font-family: var(--font-mono);
			font-size: var(--font-size-xs);
			font-weight: var(--font-weight-normal);
			color: var(--accent-color);
			opacity: 0.6;
		}

		& .resource-grid {
			display: grid;
			gap: var(--space-3);
		}
	}
</style>

<section class="category-section">
	<h2>
		<span class="index-marker">{indexLabel}</span>
		{getCategoryIcon(category)}
		{category}
	</h2>
	<div class="resource-grid">
		{#each resources as resource (resource.title)}
			<ResourceCard {resource} />
		{/each}
	</div>
</section>
