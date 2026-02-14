<script lang="ts">
	import { completedCount } from '$lib/stores/series-progress.svelte';

	const { title, description, seriesId, totalEntries, href } = $props<{
		title: string;
		description: string;
		seriesId: string;
		totalEntries: number;
		href: string;
	}>();
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a {href} class="featured-series-card">
	<div class="card-content">
		<span class="card-label">Series</span>
		<h2 class="card-title">{title}</h2>
		<p class="card-description">{description}</p>
		{#if completedCount(seriesId) > 0}
			<p class="card-progress">{completedCount(seriesId)} of {totalEntries} completed</p>
		{/if}
	</div>
</a>

<style>
	.featured-series-card {
		display: block;
		padding: var(--space-8);
		background: var(--bg-darker);
		border: 0.0625rem solid var(--border-color);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		text-decoration: none;
		color: inherit;
		transition:
			transform var(--transition-base),
			box-shadow var(--transition-base),
			border-color var(--transition-base);
	}

	.featured-series-card:hover {
		box-shadow: var(--shadow-md);
		transform: translateY(-0.125rem);
		border-color: var(--accent-color);
	}

	.card-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.card-label {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		font-weight: 600;
		color: var(--accent-color);
		text-transform: uppercase;
		letter-spacing: 0.05rem;
	}

	.card-title {
		margin: 0;
		font-size: var(--font-size-2xl);
		font-weight: 700;
		color: var(--text-color);
	}

	.card-description {
		margin: 0;
		font-size: var(--font-size-base);
		color: var(--text-muted);
		line-height: 1.6;
	}

	.card-progress {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--accent-color);
	}

	@media (prefers-reduced-motion: reduce) {
		.featured-series-card {
			transition: none;
		}

		.featured-series-card:hover {
			transform: none;
		}
	}
</style>
