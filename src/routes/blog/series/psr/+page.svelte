<script lang="ts">
	import { base } from '$app/paths';
	import SeriesHeader from '$lib/components/series/SeriesHeader.svelte';
	import SeriesGroup from '$lib/components/series/SeriesGroup.svelte';
	import { loadProgress, suggestedNext } from '$lib/stores/series-progress.svelte';
	import { getAllEntries, getTotalEntries } from '$lib/data/series/psr';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();

	// Load progress from localStorage on mount (SSR-safe)
	$effect(() => {
		loadProgress();
	});

	const allEntries = getAllEntries();
	const totalEntries = getTotalEntries();
	const suggested = $derived(suggestedNext(data.series.id, allEntries));
</script>

<svelte:head>
	<title>{data.series.title} | Russell Jones</title>
	<meta name="description" content={data.series.description} />
	<link rel="canonical" href={data.canonical} />
</svelte:head>

<div class="series-page">
	<nav class="breadcrumb" aria-label="Breadcrumb">
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href="{base}/blog">Blog</a>
		<span aria-hidden="true">/</span>
		<span>Series</span>
	</nav>

	<SeriesHeader
		title={data.series.title}
		description={data.series.description}
		repoUrl={data.series.repoUrl}
		seriesId={data.series.id}
		{totalEntries}
	/>

	<div class="series-groups">
		{#each data.series.groups as group (group.name)}
			<SeriesGroup
				{group}
				seriesId={data.series.id}
				repoUrl={data.series.repoUrl}
				codeDataMap={data.codeDataMap}
				suggestedSlug={suggested?.slug ?? null}
			/>
		{/each}
	</div>

	<section class="getting-started" aria-label="Getting started">
		<h2>Getting Started</h2>
		<p>Clone the companion repository to follow along with working examples:</p>
		<pre><code>git clone {data.series.repoUrl}.git
cd php-fig-guide
composer install</code></pre>
		<p>Run the tests:</p>
		<pre><code>composer test
composer test -- --filter=PSR1
composer check-style</code></pre>
		<p class="getting-started-links">
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a href={data.series.repoUrl} target="_blank" rel="noopener noreferrer">
				View on GitHub
			</a>
			<!-- eslint-enable svelte/no-navigation-without-resolve -->
			&middot;
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a href="https://www.php-fig.org/psr/" target="_blank" rel="noopener noreferrer">
				PHP-FIG PSR Index
			</a>
			<!-- eslint-enable svelte/no-navigation-without-resolve -->
		</p>
	</section>
</div>

<style>
	.series-page {
		container-type: inline-size;
		container-name: series-page;
		display: grid;
		width: 100%;
		max-width: min(var(--measure), 95cqi);
		margin-inline: auto;
		padding: var(--space-16) var(--space-4);
		gap: var(--space-12);
	}

	@container series-page (width >= 40rem) {
		.series-page {
			padding-inline: var(--space-8);
		}
	}

	@container series-page (width >= 48rem) {
		.series-page {
			padding-inline: var(--space-12);
		}
	}

	.breadcrumb {
		display: flex;
		gap: var(--space-2);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.breadcrumb a {
		text-decoration: none;
		color: var(--accent-color);
	}

	.breadcrumb a:hover {
		text-decoration: underline;
	}

	.series-groups {
		display: grid;
		gap: var(--space-8);
	}

	.getting-started {
		padding: var(--space-8);
		background: var(--bg-darker);
		border: 0.0625rem solid var(--border-color);
		border-radius: var(--radius-lg);
	}

	.getting-started h2 {
		margin: 0 0 var(--space-4) 0;
		font-size: var(--font-size-xl);
		color: var(--text-color);
	}

	.getting-started p {
		margin: var(--space-4) 0;
		color: var(--text-muted);
	}

	.getting-started pre {
		padding: var(--space-4);
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		background: var(--bg-color);
		border: 0.0625rem solid var(--border-color);
		border-radius: var(--radius-md);
	}

	.getting-started-links a {
		text-decoration: none;
		color: var(--accent-color);
	}

	.getting-started-links a:hover {
		text-decoration: underline;
	}
</style>
