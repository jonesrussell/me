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
	.blog {
		width: 100%;
		padding: var(--space-16) 0;
		container-type: inline-size;
		container-name: blog-page;

		& .container {
			width: 100%;
			max-width: min(160ch, 95cqi);
			margin: 0 auto;
			padding: 0 var(--space-4);
		}

		& .hero {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
			padding: var(--space-16) 0;
			margin-bottom: var(--space-16);
			background: linear-gradient(to bottom, var(--surface-color) 0%, var(--bg-color) 100%);
			border-radius: var(--radius-lg);
			position: relative;
			overflow: hidden;
		}

		& .hero::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: radial-gradient(circle at 50% 50%, var(--accent-color) 0%, transparent 70%);
			opacity: 0.1;
			z-index: 0;
		}

		& h1 {
			margin: 0;
			font-size: var(--font-size-2xl);
			font-weight: var(--font-weight-bold);
			line-height: var(--line-height-tight);
			text-align: center;
			color: var(--text-color);
			position: relative;
			z-index: 1;
			background: linear-gradient(to right, var(--accent-color), var(--accent-color-hover));
			background-clip: text;
			-webkit-text-fill-color: transparent;
			text-shadow: 0 0 20px color-mix(in srgb, var(--accent-color) 20%, transparent);
		}

		& .subtitle {
			margin: var(--space-4) 0 0 0;
			font-size: var(--font-size-lg);
			line-height: var(--line-height-relaxed);
			text-align: center;
			color: var(--text-muted);
			position: relative;
			z-index: 1;
			max-width: 60ch;
		}

		@container blog-page (width >= 48ch) {
			& .hero {
				padding: var(--space-24) 0;
			}

			& h1 {
				font-size: var(--font-size-3xl);
			}

			& .subtitle {
				font-size: var(--font-size-xl);
				margin: var(--space-6) 0 0 0;
			}
		}

		@container blog-page (width >= 80ch) {
			& h1 {
				font-size: var(--font-size-4xl);
			}
		}
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

	@media (prefers-reduced-motion: reduce) {
		.load-more-button {
			transition: none;
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

<div class="blog">
	<div class="hero">
		<h1>Web Developer Blog</h1>
		<p class="subtitle">Open Source Enthusiast</p>
	</div>

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
