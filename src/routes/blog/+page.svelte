<script lang="ts">
	import { blogPosts, fetchFeed } from '$services/blog-service';
	import { onMount } from 'svelte';
	import BlogHeader from '$lib/components/blog/BlogHeader.svelte';
	import BlogPost from '$lib/components/blog/BlogPost.svelte';

	let currentPage = $state(1);
	let hasMore = $state(false);
	let isLoading = $state(false);
	const pageSize = 5;

	onMount(async () => {
		const result = await fetchFeed({ page: currentPage, pageSize });
		console.log('Initial fetch result:', result);
		blogPosts.set(result.items);
		hasMore = result.hasMore;
	});

	async function loadMore() {
		if (isLoading || !hasMore) return;

		isLoading = true;
		currentPage++;

		const result = await fetchFeed({ page: currentPage, pageSize });
		console.log('Load more result:', result);
		blogPosts.update((posts) => [...posts, ...result.items]);
		hasMore = result.hasMore;
		isLoading = false;
	}
</script>

<svelte:head>
	<title>Technical Blog | Russell Jones - Web Development & Open Source</title>
	<meta
		name="description"
		content="Articles and tutorials on web development, Go programming, cloud technologies, and open source software by Russell Jones. Practical insights and best practices."
	/>
</svelte:head>

<div class="blog">
	<BlogHeader />

	<div class="container">
		<div class="posts">
			{#each $blogPosts as post (post.link)}
				<BlogPost {post} />
			{/each}
		</div>

		{#if hasMore}
			<div class="load-more">
				<button
					onclick={loadMore}
					disabled={isLoading}
					class="load-more-button"
				>
					{#if isLoading}
						Loading...
					{:else}
						Load More
					{/if}
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
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
