<script lang="ts">
	import { fetchFeed } from '$lib/services/blog-service';
	import { writable } from 'svelte/store';
	import DevTo from '$lib/components/blog/DevTo.svelte';
	import BlogPost from '$lib/components/blog/BlogPost.svelte';
	import BlogError from '$lib/components/blog/BlogError.svelte';
	import type { BlogPost as BlogPostType } from '$lib/services/blog-service';

	const blogPosts = writable<BlogPostType[]>([]);
	let currentPage = $state(1);
	let isLoading = $state(false);
	const pageSize = 5;
	let hasMore = $derived(false);

	$effect(() => {
		async function loadInitial() {
			const result = await fetchFeed({ page: currentPage, pageSize });
			blogPosts.set(result.items);
			hasMore = result.hasMore;
		}
		loadInitial();
	});

	async function loadMore() {
		if (isLoading || !hasMore) return;

		isLoading = true;
		currentPage++;

		const result = await fetchFeed({ page: currentPage, pageSize });
		blogPosts.update((posts: BlogPostType[]) => [...posts, ...result.items]);
		hasMore = result.hasMore;
		isLoading = false;
	}
</script>

<style>
	h1 {
		margin: 0;
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-tight);
		color: var(--accent-color);
		background: linear-gradient(to right, var(--accent-color), var(--accent-color-hover));
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.subtitle {
		margin: var(--space-4) auto 0;
		font-size: var(--font-size-lg);
		color: var(--text-muted);
	}

	.blog {
		width: 100%;
		padding: var(--space-16) 0;
	}

	.container {
		width: 100%;
		max-width: min(var(--measure), 95cqi);
		margin: 0 auto;
		padding: 0 var(--space-4);
	}

	.posts {
		display: grid;
		gap: var(--space-8);
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
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-duration) var(--transition-timing);
	}

	.load-more-button:hover:not(:disabled) {
		background: color-mix(in srgb, var(--bg-darker) 80%, var(--accent-color));
	}

	.load-more-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
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
	<h1>Web Developer Blog</h1>
	<p class="subtitle">Open Source Enthusiast</p>

	<BlogError />

	<div class="container">
		<div class="posts">
			{#each $blogPosts as post (post.link)}
				<BlogPost {post} />
			{/each}
		</div>

		{#if hasMore}
			<div class="load-more">
				<button onclick={loadMore} disabled={isLoading} class="load-more-button">
					{#if isLoading}
						Loading...
					{:else}
						Load More
					{/if}
				</button>
			</div>
		{/if}
	</div>

	<DevTo />
</div>
