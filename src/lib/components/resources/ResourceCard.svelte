<script lang="ts">
	import Box from '$lib/components/ui/Box.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';

	import type { Resource } from '$lib/types/resource';

	const { resource } = $props<{ resource: Resource }>();
</script>

<style>
	.resource {
		container-type: inline-size;
		container-name: resource-card;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding: var(--space-4);
		background: var(--bg-darker);
		border-radius: var(--radius-md);
		border-left: 3px solid transparent;
		transition: border-color var(--transition-base);
	}

	.resource:hover {
		border-left-color: var(--accent-color);
	}

	@media (prefers-reduced-motion: reduce) {
		.resource {
			transition: none;
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	h3 {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	.description {
		font-size: var(--font-size-base);
		color: var(--text-muted);
		max-width: 65ch;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-1);
		margin-top: var(--space-2);
	}

	:global(.tag) {
		--tag-color: var(--text-muted);
		--tag-bg: var(--bg-darker);

		padding: var(--space-1) var(--space-2);
		font-size: var(--font-size-xs);
	}

	:global(.tag:hover) {
		--tag-bg: var(--color-mix-light);
		--tag-color: var(--text-color);
	}

	@container resource-card (width >= 30rem) {
		.resource {
			flex-direction: row;
			align-items: flex-start;
			gap: var(--space-4);
		}

		.content {
			flex: 1;
		}
	}
</style>

<Box>
	<div class="resource">
		<div class="content">
			<h3>
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href={resource.url} target="_blank" rel="noopener noreferrer">
					{resource.title}
				</a>
			</h3>
			{#if resource.description}
				<p class="description">{resource.description}</p>
			{/if}
			{#if resource.stars}
				<div class="stars">
					<span>⭐ {resource.stars}</span>
				</div>
			{/if}
			{#if resource.tags?.length}
				<div class="tags">
					{#each resource.tags as tag (tag)}
						<Tag>{tag}</Tag>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</Box>
