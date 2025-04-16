<script lang="ts">
	import Box from '$lib/components/layout/Box.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import type { Resource } from '$lib/types';

	const { resource } = $props<{ resource: Resource }>();
</script>

<style>
	.resource {
		width: 100%;
		padding: var(--space-4);
		container-type: inline-size;
		container-name: resource-card;

		& .resource-header {
			display: flex;
			flex-direction: column;
			gap: var(--space-2);
			margin-block-end: var(--space-4);
		}

		& .resource-header h3 {
			margin: 0;
			font-size: var(--font-size-lg);
			line-height: var(--line-height-tight);
			color: var(--text-color);
		}

		& .description {
			margin: var(--space-4) 0;
			font-size: var(--font-size-sm);
			line-height: var(--line-height-relaxed);
			color: var(--text-muted);
		}

		& .category {
			margin-block-start: var(--space-4);
		}

		& a {
			text-decoration: none;
			color: var(--link-color);
			transition: all var(--transition-duration) var(--transition-timing);
		}

		&:has(a:hover) {
			background: var(--bg-darker);
			transform: translateY(-2px);
			box-shadow: var(--shadow-md);
		}

		& a:hover {
			color: var(--link-hover);
		}

		@container resource-card (width >= 48ch) {
			padding: var(--space-6);

			& .resource-header {
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				gap: var(--space-4);
			}

			& .description {
				font-size: var(--font-size-base);
			}
		}
	}
</style>

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
