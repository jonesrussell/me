<script lang="ts">
	import { base, resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { fetchFeed } from '$lib/services/blog-service';
	import { stripHtmlExcerpt } from '$lib/utils/excerpt';
	import PageHero from '$lib/components/site/PageHero.svelte';
	import Meta from '$lib/components/site/Meta.svelte';
	import type { PageData } from './$types';
	import type { BlogPost } from '$lib/types/blog';
	const { data } = $props<{ data: PageData }>();
	let posts = $state<BlogPost[]>([]);
	let currentPage = $state(1);
	let hasMore = $state(false);
	let loading = $state(false);
	let errorMessage = $state('');
	let initialized = $state(false);
	const visiblePosts = $derived(initialized ? posts : data.initialPosts);
	onMount(() => {
		posts = data.initialPosts;
		currentPage = data.currentPage;
		hasMore = data.hasMore;
		errorMessage = data.serverError ? 'Writing is unavailable right now. Please try again.' : '';
		initialized = true;
	});
	async function loadPosts() {
		if (loading) return;
		loading = true;
		errorMessage = '';
		const nextPage = posts.length ? currentPage + 1 : 1;
		try {
			const result = await fetchFeed(fetch, { page: nextPage, pageSize: 6 });
			posts = nextPage === 1 ? result.items : [...posts, ...result.items];
			currentPage = nextPage;
			hasMore = result.hasMore;
		} catch {
			errorMessage =
				'Writing is unavailable right now. Your loaded articles are still here. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<Meta
	title="Writing"
	description="Practical lessons in software, architecture and AI. Published articles and series by Russell Jones."
	path="/blog"
/>
<PageHero
	label="Writing"
	title="Notes from"
	accent="the work."
	intro="Practical lessons in software, architecture and AI."
/>
<div class="blog site-container section-space">
	<section aria-label="Published articles" aria-busy={loading}>
		<p class="eyebrow">Published writing</p>
		{#each visiblePosts as post (post.slug)}
			<article class="writing-row">
				<div>
					<p class="eyebrow">
						<time datetime={new Date(post.published).toISOString()}>{post.formattedDate}</time
						>{#if post.categories.length}
							/ {post.categories.join(' · ')}{/if}
					</p>
					<h2><a href={resolve('/blog/[slug]', { slug: post.slug })}>{post.title}</a></h2>
					<p>{stripHtmlExcerpt(post.content, 220)}</p>
				</div>
				<a
					class="row-arrow"
					href={resolve('/blog/[slug]', { slug: post.slug })}
					aria-label={`Read ${post.title}`}>→</a
				>
			</article>
		{:else}{#if !errorMessage && !data.serverError}<p class="empty-state">
					No published articles are available yet.
				</p>{/if}{/each}
		{#if errorMessage || (!initialized && data.serverError)}<div class="error-state" role="alert">
				<p>{errorMessage || 'Writing is unavailable right now. Please try again.'}</p>
				<button class="button" onclick={loadPosts} disabled={loading}>Try again</button>
			</div>{/if}
		{#if loading}<p role="status">Loading articles…</p>{/if}
		{#if (hasMore || (!initialized && data.hasMore)) && !errorMessage}<button
				class="button"
				onclick={loadPosts}
				disabled={loading}>{loading ? 'Loading…' : 'Load more articles'}</button
			>{/if}
	</section>
	{#if data.seriesIndex.series.length}<section class="writing-series">
			<p class="eyebrow">Read a series</p>
			{#each data.seriesIndex.series as series (series.id)}<article class="writing-row">
					<div>
						<h2>
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- existing series route resolved with base --><a
								href={`${base}/blog/series/${series.id}`}>{series.title}</a
							>
						</h2>
						<p>{series.description}</p>
						<p class="small-note">{series.postCount} entries</p>
					</div>
				</article>{/each}
		</section>{/if}
	<div class="actions">
		<a class="text-link" href="https://dev.to/jonesrussell"
			>Read on Dev.to <span aria-hidden="true">↗</span></a
		><a class="text-link" href="https://jonesrussell.github.io/blog/feed.xml"
			>Article feed <span aria-hidden="true">↗</span></a
		>
	</div>
</div>
