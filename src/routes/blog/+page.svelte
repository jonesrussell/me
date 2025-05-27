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
	/* Tablet and up */
	@container blog-page (width >= 30rem) {
		.container {
			max-width: min(var(--measure), 95%);
		}

		.posts {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 35ch), 1fr));
		}

		.hero {
			margin: calc(-1 * var(--space-20)) 0 0;
			padding: var(--space-20) 0;
			min-height: 45vh;
		}

		h1 {
			font-size: var(--font-size-5xl);
		}

		.subtitle {
			font-size: var(--font-size-xl);
		}
	}

	/* Small desktop and up */
	@container blog-page (width >= 50rem) {
		.container {
			max-width: min(var(--measure), 95%);
		}

		.posts {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 45ch), 1fr));
		}

		.hero {
			margin: calc(-1 * var(--space-24)) 0 0;
			padding: var(--space-24) 0;
			min-height: 50vh;
		}

		h1 {
			font-size: var(--font-size-6xl);
		}

		.subtitle {
			font-size: var(--font-size-2xl);
		}
	}

	/* Large desktop */
	@container blog-page (width >= 75rem) {
		.container {
			max-width: min(var(--measure), 95%);
		}

		.posts {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 50ch), 1fr));
		}

		h1 {
			font-size: var(--font-size-7xl);
		}

		.subtitle {
			font-size: var(--font-size-3xl);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.load-more-button {
			transition: none;
		}
	}

	/* Mobile first */
	.blog {
		container-type: inline-size;
		container-name: blog-page;
		width: 100%;
		padding: var(--space-16) 0;
	}

	.container {
		width: 100%;
		max-width: min(var(--measure), 95%);
		margin: 0 auto;
		padding: 0 var(--space-4);
	}

	.posts {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-8);
		width: 100%;
	}

	.hero {
		display: flex;
		position: relative;
		width: 100%;
		margin: calc(-1 * var(--space-16)) 0 0;
		padding: var(--space-16) 0;
		text-align: center;
		background: linear-gradient(to bottom, var(--surface-color) 0%, var(--bg-color) 100%);
		border-radius: var(--radius-lg);
		min-height: 40vh;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	h1 {
		margin: 0 0 var(--space-4) 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-4xl);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-tight);
		color: var(--text-color);
		background: linear-gradient(to right, var(--text-color), var(--text-muted));
		letter-spacing: var(--letter-spacing-tight);
		text-shadow: 0 0.125rem 0.25rem var(--color-mix-faint);
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.subtitle {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-normal);
		line-height: var(--line-height-base);
		color: var(--text-muted);
		letter-spacing: var(--letter-spacing-base);
		max-width: var(--measure);
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

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--space-8);
		font-family: var(--font-mono);
		color: var(--text-muted);
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
</style>

<svelte:head>
	<title>Technical Blog | Russell Jones - Web Development & Open Source</title>
	<meta
		name="description"
		content="Articles and tutorials on web development, Go programming, cloud technologies, and open source software by Russell Jones. Practical insights and best practices."
	/>
</svelte:head>

<main class="blog">
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

	<div class="dev-to-wrapper">
		<DevTo />
	</div>
</main>
