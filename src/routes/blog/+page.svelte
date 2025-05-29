<script lang="ts">
	import { onMount } from 'svelte';
	import { blogStore, fetchFeed } from '$lib/services/blog-service';

	import Hero from '$lib/components/ui/Hero.svelte';
	import DevTo from '$lib/components/blog/DevTo.svelte';
	import BlogError from '$lib/components/blog/BlogError.svelte';
	import BlogPostsSection from '$lib/components/blog/BlogPostsSection.svelte';

	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();

	// Constants
	const POSTS_PER_PAGE = 6;
	const INITIAL_PAGE = 1;

	let error = $state<string | null>(null);
	let currentPage = $state(INITIAL_PAGE);
	let hasMore = $state(false);

	// Initial load
	onMount(() => {
		loadMore();
	});

	async function loadMore() {
		console.log('loadMore called', {
			currentPage,
			loading: $blogStore.loading,
			hasMore,
			postsCount: $blogStore.posts.length
		});
		if ($blogStore.loading) return;

		try {
			const currentPosts = $blogStore.posts;
			const result = await fetchFeed(fetch, {
				page: Math.floor(currentPosts.length / POSTS_PER_PAGE) + 1,
				pageSize: POSTS_PER_PAGE
			});

			console.log('fetchFeed result', {
				itemsCount: result.items.length,
				hasMore: result.hasMore,
				totalPosts: currentPosts.length + result.items.length
			});

			hasMore = result.hasMore;
			currentPage += 1;
			console.log('State after update', {
				currentPage,
				hasMore,
				postsCount: $blogStore.posts.length
			});
		} catch (e) {
			console.error('Error in loadMore', e);
			error = e instanceof Error ? e.message : 'Failed to load more posts';
		}
	}

	// Debug store changes
	$effect(() => {
		console.log('Store updated', {
			postsCount: $blogStore.posts.length,
			loading: $blogStore.loading,
			error: $blogStore.error
		});
	});

	// Debug local state changes
	$effect(() => {
		console.log('Local state updated', {
			loading: $blogStore.loading,
			error,
			currentPage,
			hasMore
		});
	});
</script>

<style>
	.blog {
		container-type: inline-size;
		container-name: blog-page;
		display: grid;
		width: 100%;
		padding: var(--space-16) 0;
		grid-template-rows: auto 1fr;
		gap: var(--space-16);
	}

	.container {
		display: grid;
		width: 100%;
		margin-inline: auto;
		padding-inline: var(--space-4);
		max-width: min(var(--measure), 95cqi);
		gap: var(--space-16);
		grid-template-columns: minmax(0, 1fr);
	}

	.sections {
		display: grid;
		grid-template-columns: minmax(min(100%, 30rem), 1fr);
		gap: var(--space-8);
		width: 100%;
		justify-content: center;
	}

	@container blog-page (min-width: 640px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-8);
		}
	}

	@container blog-page (min-width: 768px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-12);
		}
	}

	@container blog-page (min-width: 1024px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-16);
		}
	}

	@container blog-page (min-width: 1280px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-20);
		}
	}

	.load-more {
		display: flex;
		justify-content: center;
		margin-top: var(--space-8);
	}

	.load-more-button {
		padding: var(--space-4) var(--space-8);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-color);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-duration) var(--transition-timing);
	}

	.load-more-button:hover:not(:disabled) {
		background: color-mix(in srgb, var(--bg-darker) 80%, var(--accent-color));
		transform: translateY(-0.125rem);
		border-color: var(--accent-color);
	}

	.load-more-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 20rem;
		gap: var(--space-8);
		padding: var(--space-16);
	}

	.loading-spinner {
		width: var(--space-12);
		height: var(--space-12);
		border: var(--border-width) solid var(--border-color);
		border-top-color: var(--accent-color);
		border-radius: var(--radius-full);
		animation: spin 1s linear infinite;
	}

	.loading-text {
		font-family: var(--font-mono);
		text-align: center;
		color: var(--text-muted);
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.empty-state {
		padding: var(--space-8);
		font-family: var(--font-mono);
		text-align: center;
		color: var(--text-muted);
	}

	.empty-state p {
		margin: var(--space-2) 0;
	}

	.error-state {
		padding: var(--space-8);
		font-family: var(--font-mono);
		text-align: center;
		color: var(--text-error);
	}

	.error-state p {
		margin: var(--space-2) 0;
	}

	.retry-button {
		margin-top: var(--space-4);
		padding: var(--space-4) var(--space-8);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-color);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
		cursor: pointer;
	}

	.retry-button:hover {
		background: color-mix(in srgb, var(--bg-darker) 80%, var(--accent-color));
		transform: translateY(-0.125rem);
		border-color: var(--accent-color);
	}

	.dev-to-wrapper {
		margin-top: var(--space-16);
		padding-top: var(--space-16);
		border-top: var(--border-width) solid var(--border-color);
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			transition: none;
			animation: none;
		}
	}
</style>

<svelte:head>
	<title>Technical Blog | Russell Jones - Web Development & Open Source</title>
	<meta
		name="description"
		content="Articles and tutorials on web development, Go programming, cloud technologies, and open source software by Russell Jones. Practical insights and best practices."
	/>
</svelte:head>

<Hero title="Web Developer Blog" subtitle="Open Source Enthusiast" />

<main class="blog">
	<BlogError />

	<div class="container">
		<div class="sections">
			{#if $blogStore.loading && $blogStore.posts.length === 0}
				<div class="loading-container">
					<div class="loading-spinner"></div>
					<div class="loading-text">
						<p>Fetching latest blog posts...</p>
						<p>This may take a moment</p>
					</div>
				</div>
			{:else if $blogStore.posts.length > 0}
				<BlogPostsSection posts={$blogStore.posts} />
			{:else if !$blogStore.loading}
				<div class="empty-state">
					<p>No blog posts available at the moment.</p>
					<p>Check back later for new content!</p>
				</div>
			{/if}

			{#if $blogStore.error}
				<div class="error-state">
					<p>Error loading blog posts: {$blogStore.error.message}</p>
					<button class="retry-button" onclick={() => loadMore()}>Retry</button>
				</div>
			{/if}

			{#if hasMore && !$blogStore.loading && !$blogStore.error}
				<div class="load-more">
					<button class="load-more-button" onclick={loadMore}>Load More</button>
				</div>
			{/if}
		</div>
	</div>

	<div class="dev-to-wrapper">
		<DevTo />
	</div>
</main>
