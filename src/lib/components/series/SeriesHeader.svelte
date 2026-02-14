<script lang="ts">
	import SeriesProgressBar from './SeriesProgressBar.svelte';
	import { completedCount } from '$lib/stores/series-progress.svelte';

	const { title, description, repoUrl, seriesId, totalEntries } = $props<{
		title: string;
		description: string;
		repoUrl: string;
		seriesId: string;
		totalEntries: number;
	}>();
</script>

<header class="series-header">
	<h1 class="series-title">{title}</h1>
	<p class="series-description">{description}</p>
	<div class="series-meta">
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href={repoUrl} target="_blank" rel="noopener noreferrer" class="repo-link">
			Companion Repository
		</a>
	</div>
	<SeriesProgressBar completed={completedCount(seriesId)} total={totalEntries} />
</header>

<style>
	.series-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding-block-end: var(--space-8);
		border-block-end: 0.0625rem solid var(--border-color);
		margin-block-end: var(--space-8);
	}

	.series-title {
		margin: 0;
		font-size: var(--font-size-3xl);
		font-weight: 700;
		line-height: 1.2;
		color: var(--text-color);
	}

	.series-description {
		margin: 0;
		font-size: var(--font-size-lg);
		line-height: 1.6;
		color: var(--text-muted);
		max-inline-size: 60ch;
	}

	.series-meta {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}

	.repo-link {
		display: inline-flex;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		text-decoration: none;
		color: var(--accent-color);
		transition: color var(--transition-base);
		align-items: center;
		gap: var(--space-2);
	}

	.repo-link:hover {
		text-decoration: underline;
	}

	@media (prefers-reduced-motion: reduce) {
		.repo-link {
			transition: none;
		}
	}
</style>
