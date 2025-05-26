<script lang="ts">
	import Box from '$lib/components/ui/Box.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import type { Resource } from '$lib/types';

	export let resource: Resource;
	export let cta: boolean = false;
</script>

<style>
	.resource {
		container-type: inline-size;
		container-name: resource-card;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding: var(--space-4);
		background: var(--color-surface-2);
		border-radius: var(--radius-2);
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	h3 {
		font-size: var(--font-size-3);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-1);
	}

	.description {
		font-size: var(--font-size-2);
		color: var(--color-text-2);
		max-width: 65ch;
	}

	.cta {
		display: flex;
		gap: var(--space-2);
	}

	@container resource-card (width >= 30rem) {
		.resource {
			flex-direction: row;
			align-items: center;
			gap: var(--space-4);
		}
	}
</style>

<Box>
	<div class="resource">
		<div class="content">
			<h3>
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
		</div>
		<div class="category">
			<Badge type="info" children={() => resource.category} />
		</div>
		{#if cta}
			<div class="cta">
				<slot name="cta" />
			</div>
		{/if}
	</div>
</Box>
