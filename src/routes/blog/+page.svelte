<script lang="ts">
	import { blogState } from '$lib/stores/blog.svelte';
	import { fetchFeed } from '$lib/services/blog-service';
	import { debounce } from '$lib/utils/debounce';

	import Hero from '$lib/components/ui/Hero.svelte';
	import BlogHeroPost from '$lib/components/blog/BlogHeroPost.svelte';
	import DevTo from '$lib/components/blog/DevTo.svelte';
	import BlogError from '$lib/components/blog/BlogError.svelte';
	import BlogPostsSection from '$lib/components/blog/BlogPostsSection.svelte';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import FeaturedSeriesCard from '$lib/components/series/FeaturedSeriesCard.svelte';
	import { psrSeries, getTotalEntries } from '$lib/data/series/psr';
	import { base } from '$app/paths';

	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();

	const POSTS_PER_PAGE = 6;

	// Initialize state with server data
	$effect(() => {
		blogState.posts = data.initialPosts;
		blogState.loading = false;
		blogState.error = data.serverError
			? {
					type: 'SERVER_ERROR',
					message: data.serverError,
					details: null,
					timestamp: Date.now()
				}
			: null;
		blogState.hasMore = data.hasMore;
		blogState.currentPage = data.currentPage;
		blogState.totalPages = data.totalPages;
	});

	const heroPost = $derived(blogState.posts[0]);
	const gridPosts = $derived(blogState.posts.slice(1));

	// Debounced load more to prevent rapid clicks
	const debouncedLoadMore = debounce(async () => {
		if (blogState.loading || !blogState.hasMore) return;

		blogState.loading = true;
		blogState.error = null;

		try {
			const result = await fetchFeed(fetch, {
				page: blogState.currentPage + 1,
				pageSize: POSTS_PER_PAGE
			});

			blogState.posts = [...blogState.posts, ...result.items];
			blogState.currentPage = blogState.currentPage + 1;
			blogState.hasMore = result.hasMore;
			if (result.totalPages) {
				blogState.totalPages = result.totalPages;
			}
			blogState.loading = false;
		} catch (e) {
			blogState.loading = false;
			blogState.error = {
				type: 'LOAD_MORE_ERROR',
				message: e instanceof Error ? e.message : 'Failed to load more posts',
				details: e,
				timestamp: Date.now()
			};
		}
	}, 300);

	async function retryLoad() {
		blogState.error = null;
		await debouncedLoadMore();
	}
</script>

<style>
	/* Page animation */
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(0.5rem);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes cursor-blink {
		0%,
		100% {
			opacity: 1;
		}

		50% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.blog *,
		.blog *::before,
		.blog *::after {
			transition: none;
			animation: none;
		}
	}

	@container blog-page (min-width: 640px) {
		.container {
			padding-inline: var(--space-8);
		}
	}

	@container blog-page (min-width: 768px) {
		.container {
			padding-inline: var(--space-12);
		}
	}

	.blog {
		container-type: inline-size;
		container-name: blog-page;
		display: grid;
		position: relative;
		width: 100%;
		padding: var(--space-8) 0;
		gap: var(--space-8);
		min-height: 70vh;
	}

	/* Scanline overlay */
	.blog::after {
		content: '';
		position: fixed;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			rgb(255 255 255 / 0.02) 0,
			rgb(255 255 255 / 0.02) 1px,
			transparent 1px,
			transparent 3px
		);
		pointer-events: none;
		z-index: 0;
	}

	.container {
		display: grid;
		width: 100%;
		margin-inline: auto;
		padding-inline: var(--space-4);
		max-width: min(var(--measure), 95cqi);
		gap: var(--space-6);
		animation: fade-in 0.4s ease-out both;
		animation-delay: 0.1s;
	}

	.posts-section {
		display: grid;
		gap: var(--space-6);
		width: 100%;
	}

	/* Load more */
	.load-more {
		display: flex;
		justify-content: center;
		margin-block-start: var(--space-4);
	}

	.load-more-button {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-6);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--accent-color);
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: border-color var(--transition-base);
	}

	.load-more-button:hover:not(:disabled) {
		border-color: var(--accent-color);
	}

	.load-more-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.cursor-blink {
		animation: cursor-blink 1s step-end infinite;
	}

	/* End message */
	.end-message {
		padding: var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		text-align: center;
		color: var(--text-muted);
		margin-block-start: var(--space-4);
	}

	.end-message p {
		margin: var(--space-1) 0;
	}

	/* Loading */
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 15rem;
		gap: var(--space-4);
		padding: var(--space-12);
	}

	.loading-text {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		text-align: center;
		color: var(--text-muted);
	}

	.loading-text p {
		margin: var(--space-1) 0;
	}

	/* Error & empty states */
	.error-state,
	.empty-state {
		margin: var(--space-4) 0;
		padding: var(--space-6);
		font-family: var(--font-mono);
		text-align: center;
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
	}

	.error-state h2,
	.empty-state h2 {
		margin: 0 0 var(--space-3) 0;
		font-size: var(--font-size-base);
		color: var(--accent-color);
	}

	.error-state p,
	.empty-state p {
		margin: var(--space-1) 0;
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.load-more-error {
		padding: var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		text-align: center;
		color: var(--color-error);
		background: color-mix(in srgb, var(--color-error) 10%, var(--bg-darker));
		border: 1px solid var(--color-error);
		border-radius: var(--radius-md);
		margin-block-start: var(--space-4);
	}

	.load-more-error p {
		margin: 0 0 var(--space-3) 0;
	}

	.retry-button {
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--accent-color);
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: border-color var(--transition-base);
	}

	.retry-button:hover {
		border-color: var(--accent-color);
	}

	/* Footer zone */
	.blog-footer {
		display: grid;
		gap: var(--space-4);
	}

	.footer-separator {
		border-block-start: 1px dashed var(--border-color);
	}

	.northcloud-feed {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.northcloud-header {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--accent-color);
	}

	.northcloud-list {
		display: flex;
		margin: 0;
		padding: 0;
		list-style: none;
		flex-direction: column;
		gap: var(--space-1);
	}

	.northcloud-item {
		margin: 0;
	}

	.northcloud-link {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		text-decoration: none;
		color: var(--text-muted);
	}

	.northcloud-link:hover {
		text-decoration: underline;
		color: var(--accent-color);
	}

	.northcloud-more {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		text-decoration: none;
		color: var(--text-muted);
	}

	.northcloud-more:hover {
		text-decoration: underline;
		color: var(--accent-color);
	}

	/* Focus */
	.load-more-button:focus-visible,
	.retry-button:focus-visible {
		outline: 0.125rem solid var(--accent-color);
		outline-offset: 0.125rem;
	}
</style>

<svelte:head>
	<title>Technical Blog | Russell Jones - Web Development & Open Source</title>
	<meta
		name="description"
		content="Articles and tutorials on web development, Go programming, cloud technologies, and open source software by Russell Jones. Practical insights and best practices."
	/>
	<link rel="canonical" href={data.canonicalBlog} />
	<meta property="og:title" content="Technical Blog | Russell Jones" />
	<meta property="og:description" content="Web development articles and tutorials" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={data.canonicalBlog} />
</svelte:head>

<div class="blog">
	<Hero title="Blog" subtitle="Latest writing" />

	<BlogError />

	<div class="container">
		{#if heroPost}
			<BlogHeroPost post={heroPost} />
		{/if}

		<FeaturedSeriesCard
			title={psrSeries.title}
			description={psrSeries.description}
			seriesId={psrSeries.id}
			totalEntries={getTotalEntries()}
			href="{base}/blog/series/psr"
		/>

		<section class="posts-section" aria-label="Blog posts">
			{#if gridPosts.length > 0}
				<BlogPostsSection posts={gridPosts} />

				{#if blogState.hasMore}
					<div class="load-more">
						<button
							class="load-more-button"
							onclick={debouncedLoadMore}
							disabled={blogState.loading}
							aria-label={blogState.loading ? 'Loading more posts...' : 'Load more posts'}
						>
							{#if blogState.loading}
								<span class="cursor-blink">$ loading...&#9608;</span>
							{:else}
								$ load --more
							{/if}
						</button>
					</div>
				{:else if blogState.posts.length > POSTS_PER_PAGE}
					<div class="end-message">
						<p>$ echo "end of feed"</p>
						<p>{blogState.posts.length} posts loaded.</p>
					</div>
				{/if}

				{#if blogState.error?.type === 'LOAD_MORE_ERROR'}
					<div class="load-more-error" role="alert">
						<p>Failed to load more posts: {blogState.error.message}</p>
						<button class="retry-button" onclick={retryLoad}>$ retry</button>
					</div>
				{/if}
			{:else if blogState.loading}
				<div class="loading-container" aria-live="polite">
					<LoadingSpinner />
					<div class="loading-text">
						<p>$ fetching posts...</p>
					</div>
				</div>
			{:else if blogState.error?.type === 'SERVER_ERROR'}
				<div class="error-state" role="alert">
					<h2>$ error: connection failed</h2>
					<p>Unable to load blog posts.</p>
					<button class="retry-button" onclick={retryLoad}>$ retry</button>
				</div>
			{:else}
				<div class="empty-state">
					<h2>$ ls ./posts</h2>
					<p>No entries found. Check back soon.</p>
				</div>
			{/if}
		</section>

		<footer class="blog-footer">
			<div class="footer-separator" aria-hidden="true"></div>
			{#if data.northCloudArticles?.length}
				<div class="northcloud-feed">
					<p class="northcloud-header">$ pipe --from northcloud.biz</p>
					<ul class="northcloud-list">
						{#each data.northCloudArticles as article (article.id)}
							<li class="northcloud-item">
								<!-- eslint-disable svelte/no-navigation-without-resolve -->
								<a
									href={article.url}
									class="northcloud-link"
									target="_blank"
									rel="noopener noreferrer"
								>
									&gt; {article.title}
								</a>
								<!-- eslint-enable svelte/no-navigation-without-resolve -->
							</li>
						{/each}
					</ul>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a
						href="https://northcloud.biz"
						class="northcloud-more"
						target="_blank"
						rel="noopener noreferrer"
					>
						... | more
					</a>
				</div>
			{/if}
			<DevTo />
		</footer>
	</div>
</div>
