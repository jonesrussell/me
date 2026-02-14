<script lang="ts">
	import type { ISeriesEntry, ISeriesCodeFile } from '$lib/types/series';
	import { isCompleted, toggleCompleted } from '$lib/stores/series-progress.svelte';
	import SeriesCodeView from './SeriesCodeView.svelte';
	import { base } from '$app/paths';

	interface CodeData {
		sourceFiles: ISeriesCodeFile[];
		testFiles: ISeriesCodeFile[];
	}

	const { entry, seriesId, repoUrl, codeData, isSuggested } = $props<{
		entry: ISeriesEntry;
		seriesId: string;
		repoUrl: string;
		codeData: CodeData | null;
		isSuggested: boolean;
	}>();

	let showCode = $state(false);
</script>

<article class="entry-card" class:suggested={isSuggested}>
	<div class="entry-header">
		<input
			type="checkbox"
			checked={isCompleted(seriesId, entry.slug)}
			onchange={() => toggleCompleted(seriesId, entry.slug)}
			aria-label="Mark PSR-{entry.psrNumber} as completed"
		/>
		<div class="entry-info">
			<h3>
				<span class="psr-number">PSR-{entry.psrNumber}</span>
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href="{base}/blog/{entry.slug}">{entry.title}</a>
			</h3>
			<p class="summary">{entry.summary}</p>
			{#if entry.prerequisites.length > 0}
				<p class="prerequisites">Requires: PSR-{entry.prerequisites.join(', PSR-')}</p>
			{/if}
		</div>
	</div>

	{#if isSuggested}
		<span class="suggested-badge">Up next</span>
	{/if}

	<button class="toggle-code" onclick={() => (showCode = !showCode)}>
		{showCode ? 'Hide Code' : 'View Code'}
	</button>

	{#if showCode && codeData}
		<SeriesCodeView sourceFiles={codeData.sourceFiles} testFiles={codeData.testFiles} {repoUrl} />
	{/if}
</article>

<style>
	.entry-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding: var(--space-6);
		background: var(--bg-darker);
		border: 0.0625rem solid var(--border-color);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		transition:
			transform var(--transition-base),
			box-shadow var(--transition-base),
			border-color var(--transition-base);
	}

	.entry-card:hover {
		box-shadow: var(--shadow-md);
		transform: translateY(-0.125rem);
		border-color: var(--accent-color);
	}

	.entry-card.suggested {
		border-inline-start: 0.1875rem solid var(--accent-color);
	}

	.entry-header {
		display: flex;
		gap: var(--space-3);
		align-items: flex-start;
	}

	.entry-header input[type='checkbox'] {
		margin-block-start: var(--space-1);
		accent-color: var(--accent-color);
		cursor: pointer;
	}

	.entry-info {
		flex: 1;
	}

	.entry-info h3 {
		margin: 0;
		font-size: var(--font-size-lg);
		font-weight: 700;
		line-height: 1.3;
	}

	.psr-number {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--accent-color);
		margin-inline-end: var(--space-2);
	}

	.entry-info h3 a {
		text-decoration: none;
		color: var(--text-color);
	}

	.entry-info h3 a:hover {
		color: var(--accent-color);
	}

	.summary {
		margin: var(--space-2) 0 0;
		font-size: var(--font-size-base);
		color: var(--text-muted);
	}

	.prerequisites {
		margin: var(--space-2) 0 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-muted);
	}

	.suggested-badge {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		font-size: var(--font-size-xs);
		font-weight: 600;
		color: var(--accent-color);
		background: var(--color-mix-faint, transparent);
		border-radius: var(--radius-sm);
		inline-size: fit-content;
	}

	.toggle-code {
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--accent-color);
		background: transparent;
		border: 0.0625rem solid var(--accent-color);
		border-radius: var(--radius-md);
		cursor: pointer;
		inline-size: fit-content;
		transition:
			background var(--transition-base),
			color var(--transition-base);
	}

	.toggle-code:hover {
		color: var(--bg-darker);
		background: var(--accent-color);
	}

	@media (prefers-reduced-motion: reduce) {
		.entry-card {
			transition: none;
		}

		.entry-card:hover {
			transform: none;
		}

		.toggle-code {
			transition: none;
		}
	}
</style>
