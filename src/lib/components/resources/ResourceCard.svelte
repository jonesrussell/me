<script lang="ts">
	import type { Resource } from '$lib/types/resource';

	const { resource, onTagClick } = $props<{
		resource: Resource;
		onTagClick?: (tag: string) => void;
	}>();
</script>

<style>
	.resource-card {
		padding: var(--space-6);
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		transition: border-color var(--transition-base);
	}

	.resource-card[data-daily-driver='true'] {
		border-inline-start: 0.1875rem solid var(--accent-color);
	}

	.resource-card:hover {
		border-color: var(--accent-color);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-2);
	}

	.card-title {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
	}

	.card-title a {
		text-decoration: none;
		color: var(--text-color);
	}

	.card-title a:hover {
		color: var(--accent-color);
	}

	.daily-driver-badge {
		padding: var(--space-1) var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--accent-color);
		background: color-mix(in srgb, var(--accent-color) 10%, transparent);
		border-radius: var(--radius-sm);
		white-space: nowrap;
	}

	.card-description {
		margin: var(--space-3) 0 0 0;
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--text-muted);
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-block-start: var(--space-4);
	}

	.tag-button {
		padding: var(--space-1) var(--space-2);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-muted);
		background: var(--color-mix-light);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: border-color var(--transition-base);
	}

	.tag-button:hover {
		border-color: var(--accent-color);
		color: var(--accent-color);
	}

	.video-embed {
		position: relative;
		margin-block-start: var(--space-4);
		aspect-ratio: 16 / 9;
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.video-embed iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: none;
	}
</style>

<article class="resource-card" data-daily-driver={resource.dailyDriver || undefined}>
	<div class="card-header">
		<h3 class="card-title">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.title}</a>
		</h3>
		{#if resource.dailyDriver}
			<span class="daily-driver-badge">daily driver</span>
		{/if}
	</div>
	<p class="card-description">{resource.description}</p>
	<div class="card-tags">
		{#each resource.tags as tag (tag)}
			<button
				class="tag-button"
				type="button"
				onclick={() => onTagClick?.(tag)}
			>
				{tag}
			</button>
		{/each}
	</div>
	{#if resource.video}
		<div class="video-embed">
			<iframe
				src="https://www.youtube.com/embed/{resource.video}"
				title={resource.title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
	{/if}
</article>
