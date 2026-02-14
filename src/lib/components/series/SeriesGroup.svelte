<script lang="ts">
	import type { ISeriesGroup, ISeriesCodeFile } from '$lib/types/series';
	import { isCompleted } from '$lib/stores/series-progress.svelte';
	import SeriesEntryCard from './SeriesEntryCard.svelte';

	interface CodeData {
		sourceFiles: ISeriesCodeFile[];
		testFiles: ISeriesCodeFile[];
	}

	const { group, seriesId, repoUrl, codeDataMap, suggestedSlug } = $props<{
		group: ISeriesGroup;
		seriesId: string;
		repoUrl: string;
		codeDataMap: Record<string, CodeData>;
		suggestedSlug: string | null;
	}>();

	const groupCompleted = $derived(
		group.entries.filter((entry) => isCompleted(seriesId, entry.slug)).length
	);
</script>

<details class="series-group" open>
	<summary class="group-header">
		<h2 class="group-name">{group.name}</h2>
		<span class="group-progress">{groupCompleted}/{group.entries.length}</span>
	</summary>
	<div class="group-entries">
		{#each group.entries as entry (entry.slug)}
			<SeriesEntryCard
				{entry}
				{seriesId}
				{repoUrl}
				codeData={codeDataMap[entry.slug] ?? null}
				isSuggested={entry.slug === suggestedSlug}
			/>
		{/each}
	</div>
</details>

<style>
	.series-group {
		border: 0.0625rem solid var(--border-color);
		border-radius: var(--radius-lg);
		background: var(--bg-color);
		overflow: hidden;
	}

	.group-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-4) var(--space-6);
		cursor: pointer;
		user-select: none;
		background: var(--bg-darker);
		transition: background var(--transition-base);
	}

	.group-header:hover {
		background: var(--bg-hover, var(--bg-darker));
	}

	.group-name {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: 700;
		color: var(--text-color);
	}

	.group-progress {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		white-space: nowrap;
	}

	.group-entries {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding: var(--space-6);
	}

	@media (prefers-reduced-motion: reduce) {
		.group-header {
			transition: none;
		}
	}
</style>
