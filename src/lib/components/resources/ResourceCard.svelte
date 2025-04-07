<script lang="ts">
	import Box from './Box.svelte';
	import Badge from './Badge.svelte';
	import type { Resource } from '$lib/types';

	const { resource } = $props<{ resource: Resource }>();
</script>

<Box>
	<div class="resource">
		<div class="resource-header">
			<h3>
				<a href={resource.url} target="_blank" rel="noopener noreferrer">
					{resource.title}
				</a>
			</h3>
			{#if resource.stars}
				<Badge type="info">
					⭐ {resource.stars.toLocaleString()}
				</Badge>
			{/if}
		</div>
		<p class="description">{resource.description}</p>
		<div class="category">
			<Badge type="info">{resource.category}</Badge>
		</div>
	</div>
</Box>

<style>
	.resource {
		width: 100%;
		padding: var(--space-4);
	}

	.resource-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		margin-bottom: var(--space-4);
	}

	.resource-header h3 {
		margin: 0;
		font-size: var(--font-size-lg);
		line-height: var(--line-height-tight);
		color: var(--text-color);
	}

	.description {
		margin: var(--space-4) 0;
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
		color: var(--text-muted);
	}

	.category {
		margin-top: var(--space-4);
	}

	a {
		text-decoration: none;
		color: var(--link-color);
		transition: all var(--transition-duration) var(--transition-timing);
	}

	a:hover {
		color: var(--link-hover);
	}

	@media (width >= 48ch) {
		.resource {
			padding: var(--space-6);
		}

		.resource-header {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			gap: var(--space-4);
		}

		.description {
			font-size: var(--font-size-base);
		}
	}
</style>
