<script lang="ts">
	import ResourceCard from './ResourceCard.svelte';
	import type { Resource } from '$lib/types';

	const { category, resources } = $props<{
		category: string;
		resources: Resource[];
	}>();

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

<section class="category-section">
	<h2>
		{getCategoryIcon(category)}
		{category}
	</h2>
	<div class="resource-grid">
		{#each resources as resource (resource.title)}
			<ResourceCard {resource} />
		{/each}
	</div>
</section>

<style>
	.category-section {
		margin: var(--space-6) 0;
	}

	h2 {
		margin: 0 0 var(--space-3) 0;
		font-size: var(--font-size-base);
		line-height: var(--line-height-tight);
		color: var(--text-color);
	}

	.resource-grid {
		display: grid;
		gap: var(--space-3);
	}

	@media (width >= 48ch) {
		.category-section {
			margin: var(--space-8) 0;
		}

		h2 {
			font-size: var(--font-size-lg);
		}

		.resource-grid {
			gap: var(--space-4);
		}
	}

	@media (width >= 80ch) {
		.resource-grid {
			grid-template-columns: repeat(auto-fit, minmax(45ch, 1fr));
			gap: var(--space-6);
		}
	}

	@media (width >= 120ch) {
		.resource-grid {
			grid-template-columns: repeat(auto-fit, minmax(50ch, 1fr));
			gap: var(--space-8);
		}
	}
</style>
