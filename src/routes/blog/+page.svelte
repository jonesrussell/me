<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchFeed, blogStore } from '$lib/services/blog-service';
	import { writable } from 'svelte/store';
	import DevTo from '$lib/components/blog/DevTo.svelte';
	import BlogPost from '$lib/components/blog/BlogPost.svelte';
	import BlogError from '$lib/components/blog/BlogError.svelte';
	import type { BlogPost as BlogPostType } from '$lib/types/blog';

	const blogPosts = writable<BlogPostType[]>([]);
	let currentPage = $state(1);
	let hasMore = $state(true);
	const pageSize = 5;

	async function loadMore() {
		if (!$blogStore.loading && hasMore) {
			try {
				const result = await fetchFeed({ page: currentPage, pageSize });
				blogPosts.update((posts: BlogPostType[]) => [...posts, ...result.items]);
				hasMore = result.hasMore;
			} catch (error) {
				console.error('Error loading blog posts:', error);
			} finally {
				currentPage++;
			}
		} else {
			console.log('Skipping loadMore:', { loading: $blogStore.loading, hasMore });
		}
	}

	onMount(() => {
		loadMore();
	});
</script>

<style>
	.blog {
		width: 100%;
		padding: var(--space-16) 0;
		container-type: inline-size;
		container-name: blog-page;
	}

	.container {
		width: 100%;
		max-width: min(40ch, 95cqi);
		margin: 0 auto;
		padding: 0 var(--space-4);
	}

	.posts {
		display: grid;
		grid-template-columns: minmax(min(100%, 30ch), 1fr);
		gap: var(--space-8);
		width: 100%;
	}

	/* Tablet and up */
	@media (width >= 48ch) {
		.container {
			max-width: min(80ch, 95cqi);
		}

		.posts {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 30ch), 1fr));
		}
	}

	/* Desktop */
	@media (width >= 80ch) {
		.container {
			max-width: min(160ch, 95cqi);
		}

		.posts {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 40ch), 1fr));
		}
	}

	.hero {
		width: 100%;
		min-height: 50vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		background: linear-gradient(to bottom, var(--surface-color) 0%, var(--bg-color) 100%);
		border-radius: var(--radius-lg);
		position: relative;
		overflow: hidden;
		padding: var(--space-24) 0;
		margin: calc(-1 * var(--space-24)) 0 0 0;
	}

	.hero::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at center, var(--color-mix-faint) 0%, transparent 70%);
		pointer-events: none;
	}

	h1 {
		font-family: var(--font-mono);
		font-size: var(--font-size-5xl);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-tight);
		color: var(--text-color);
		margin: 0 0 var(--space-6) 0;
		text-shadow: 0 2px 4px var(--color-mix-faint);
		background: linear-gradient(to right, var(--text-color), var(--text-muted));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.subtitle {
		font-family: var(--font-mono);
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-normal);
		line-height: var(--line-height-base);
		letter-spacing: var(--letter-spacing-base);
		color: var(--text-muted);
		margin: 0;
		max-width: var(--measure);
	}

	@media (min-width: 640px) {
		h1 {
			font-size: var(--font-size-6xl);
		}

		.subtitle {
			font-size: var(--font-size-2xl);
		}
	}

	@media (min-width: 1024px) {
		h1 {
			font-size: var(--font-size-7xl);
		}

		.subtitle {
			font-size: var(--font-size-3xl);
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
		transform: translateY(-2px);
		border-color: var(--accent-color);
	}

	.load-more-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--space-8);
		font-family: var(--font-mono);
		color: var(--text-muted);
	}

	@media (prefers-reduced-motion: reduce) {
		.load-more-button {
			transition: none;
		}
	}

	.empty-state {
		text-align: center;
		padding: var(--space-8);
		color: var(--text-muted);
		font-family: var(--font-mono);
	}

	.empty-state p {
		margin: var(--space-2) 0;
	}

	.error-state {
		text-align: center;
		padding: var(--space-8);
		color: var(--text-error);
		font-family: var(--font-mono);
	}

	.error-state p {
		margin: var(--space-2) 0;
	}

	.retry-button {
		padding: var(--space-4) var(--space-8);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-color);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-duration) var(--transition-timing);
		margin-top: var(--space-4);
	}

	.retry-button:hover {
		background: color-mix(in srgb, var(--bg-darker) 80%, var(--accent-color));
		transform: translateY(-2px);
		border-color: var(--accent-color);
	}
</style>

<svelte:head>
	<title>Technical Blog | Russell Jones - Web Development & Open Source</title>
	<meta
		name="description"
		content="Articles and tutorials on web development, Go programming, cloud technologies, and open source software by Russell Jones. Practical insights and best practices."
	/>
</svelte:head>

<div class="blog">
	<div class="hero">
		<h1>Web Developer Blog</h1>
		<p class="subtitle">Open Source Enthusiast</p>
	</div>

	<BlogError />

	<div class="container">
		<div
			class="posts"
			style:visibility={$blogStore.loading && currentPage === 1 ? 'hidden' : 'visible'}
		>
			{#each $blogPosts as post (post.slug)}
				<BlogPost {post} />
			{:else}
				{#if !$blogStore.loading}
					<div class="empty-state">
						<p>No blog posts available at the moment.</p>
						<p>Check back later for new content!</p>
					</div>
				{/if}
			{/each}
		</div>

		{#if $blogStore.loading}
			<div class="loading">Loading posts...</div>
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

	<DevTo />
</div>
