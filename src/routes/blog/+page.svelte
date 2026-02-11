<script lang="ts">
	import { blogState } from '$lib/stores/blog.svelte';
	import { fetchFeed } from '$lib/services/blog-service';
	import { debounce } from '$lib/utils/debounce';

	import Hero from '$lib/components/ui/Hero.svelte';
	import DevTo from '$lib/components/blog/DevTo.svelte';
	import BlogError from '$lib/components/blog/BlogError.svelte';
	import BlogPostsSection from '$lib/components/blog/BlogPostsSection.svelte';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';

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
	/* Responsive container */
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

	@container blog-page (min-width: 1024px) {
		.container {
			padding-inline: var(--space-16);
			grid-template-columns: 1fr minmax(16rem, 20rem);
		}
	}

	@keyframes broadcast-pulse {
		0%,
		100% {
			opacity: 0.4;
			transform: translate(-50%, -50%) scale(1);
		}

		50% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1.4);
		}
	}

	/* Accessibility and performance */
	@media (prefers-reduced-motion: reduce) {
		.blog *,
		.blog *::before,
		.blog *::after {
			transition: none;
			animation: none;
			transform: none;
		}

		.blog-hero-wrapper::before {
			animation: none;
			transform: translate(-50%, -50%);
		}
	}

	/* Broadcast pulse on hero */
	.blog-hero-wrapper {
		position: relative;
	}

	.blog-hero-wrapper::before {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 12rem;
		height: 12rem;
		background: radial-gradient(
			circle,
			color-mix(in srgb, var(--accent-color) 15%, transparent) 0%,
			color-mix(in srgb, var(--accent-color) 5%, transparent) 40%,
			transparent 70%
		);
		border-radius: var(--radius-full);
		animation: broadcast-pulse 3s ease-in-out infinite;
		transform: translate(-50%, -50%);
		content: '';
		pointer-events: none;
		z-index: 0;
	}

	.blog {
		container-type: inline-size;
		container-name: blog-page;
		display: grid;
		width: 100%;
		padding: var(--space-16) 0;
		grid-template-rows: auto 1fr auto;
		gap: var(--space-16);
		min-height: 70vh;
	}

	.container {
		display: grid;
		width: 100%;
		margin-inline: auto;
		padding-inline: var(--space-4);
		max-width: min(var(--measure), 95cqi);
		gap: var(--space-8);
	}

	.northcloud-sidebar {
		display: flex;
		flex-direction: column;
		height: fit-content;
		gap: var(--space-2);
		padding: var(--space-4);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
	}

	.northcloud-sidebar-title {
		margin: 0;
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	.northcloud-sidebar-list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.northcloud-sidebar-item {
		margin: 0;
		padding: var(--space-1) 0;
		border-block-end: var(--border-width) solid var(--border-color);
	}

	.northcloud-sidebar-item:last-of-type {
		border-block-end: none;
	}

	.northcloud-sidebar-link {
		font-size: var(--font-size-sm);
		text-decoration: none;
		color: var(--accent-color);
	}

	.northcloud-sidebar-link:hover {
		text-decoration: underline;
	}

	.northcloud-sidebar-more {
		margin-top: var(--space-2);
		font-size: var(--font-size-xs);
		text-decoration: none;
		color: var(--text-muted);
	}

	.northcloud-sidebar-more:hover {
		text-decoration: underline;
		color: var(--accent-color);
	}

	.posts-section {
		display: grid;
		gap: var(--space-8);
		width: 100%;
	}

	/* Load more button */
	.load-more {
		display: flex;
		justify-content: center;
		margin-top: var(--space-8);
	}

	.load-more-button {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-4) var(--space-8);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-color);
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-base);
		min-height: 2.75rem;
	}

	.load-more-button:hover:not(:disabled) {
		background: color-mix(in srgb, var(--bg-darker) 80%, var(--accent-color));
		transform: translateY(-0.125rem);
		border-color: var(--accent-color);
	}

	.load-more-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none;
	}

	/* End message */
	.end-message {
		margin-top: var(--space-8);
		padding: var(--space-8);
		text-align: center;
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
	}

	.end-message p {
		margin: var(--space-2) 0;
		color: var(--text-muted);
	}

	.end-message p:first-child {
		font-size: var(--font-size-lg);
		color: var(--text-color);
	}

	/* Loading states */
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 20rem;
		gap: var(--space-4);
		padding: var(--space-16);
	}

	.loading-text {
		font-family: var(--font-mono);
		text-align: center;
		color: var(--text-muted);
	}

	.loading-text p {
		margin: var(--space-1) 0;
	}

	/* Error states */
	.error-state,
	.empty-state {
		margin: var(--space-8) 0;
		padding: var(--space-8);
		text-align: center;
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
	}

	.error-state h2,
	.empty-state h2 {
		margin: 0 0 var(--space-4) 0;
		font-size: var(--font-size-xl);
		color: var(--text-color);
	}

	.error-state p,
	.empty-state p {
		margin: var(--space-2) 0;
		color: var(--text-muted);
	}

	.load-more-error {
		margin-top: var(--space-4);
		padding: var(--space-6);
		text-align: center;
		color: var(--color-error);
		background: color-mix(in srgb, var(--color-error) 10%, var(--bg-darker));
		border: 1px solid var(--color-error);
		border-radius: var(--radius-md);
	}

	.load-more-error p {
		margin: 0 0 var(--space-4) 0;
	}

	.retry-button {
		padding: var(--space-3) var(--space-6);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-color);
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-base);
		cursor: pointer;
	}

	.retry-button:hover {
		background: color-mix(in srgb, var(--bg-darker) 80%, var(--accent-color));
		transform: translateY(-0.125rem);
		border-color: var(--accent-color);
	}

	/* Dev.to wrapper */
	.dev-to-wrapper {
		margin-top: var(--space-16);
		padding-top: var(--space-16);
		border-top: 1px solid var(--border-color);
	}

	/* Focus management */
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

<div class="blog-hero-wrapper">
	<Hero title="Web Developer Blog" subtitle="Open Source Enthusiast" />
</div>

<div class="blog">
	<!-- Global error handling -->
	<BlogError />

	<div class="container">
		<section class="posts-section" aria-label="Blog posts">
			{#if blogState.posts.length > 0}
				<BlogPostsSection posts={blogState.posts} />

				<!-- Load more section -->
				{#if blogState.hasMore}
					<div class="load-more">
						<button
							class="load-more-button"
							onclick={debouncedLoadMore}
							disabled={blogState.loading}
							aria-label={blogState.loading ? 'Loading more posts...' : 'Load more posts'}
						>
							{#if blogState.loading}
								<LoadingSpinner size="sm" />
								Loading...
							{:else}
								Load More Posts
							{/if}
						</button>
					</div>
				{:else if blogState.posts.length > POSTS_PER_PAGE}
					<div class="end-message">
						<p>You've reached the end! 🎉</p>
						<p>Thanks for reading all {blogState.posts.length} posts.</p>
					</div>
				{/if}

				<!-- Load more error (separate from global errors) -->
				{#if blogState.error?.type === 'LOAD_MORE_ERROR'}
					<div class="load-more-error" role="alert">
						<p>Failed to load more posts: {blogState.error.message}</p>
						<button class="retry-button" onclick={retryLoad}> Try Again </button>
					</div>
				{/if}
			{:else if blogState.loading}
				<div class="loading-container" aria-live="polite">
					<LoadingSpinner />
					<div class="loading-text">
						<p>Fetching latest blog posts...</p>
						<p>This may take a moment</p>
					</div>
				</div>
			{:else if blogState.error?.type === 'SERVER_ERROR'}
				<div class="error-state" role="alert">
					<h2>Unable to Load Blog Posts</h2>
					<p>We're experiencing technical difficulties.</p>
					<button class="retry-button" onclick={retryLoad}> Retry Loading </button>
				</div>
			{:else}
				<div class="empty-state">
					<h2>No Posts Yet</h2>
					<p>Check back soon for new content!</p>
					<p>In the meantime, check out my dev.to articles below.</p>
				</div>
			{/if}
		</section>
		{#if data.northCloudArticles?.length}
			<aside class="northcloud-sidebar" aria-label="From the North Cloud pipeline">
				<h2 class="northcloud-sidebar-title">From the North Cloud pipeline</h2>
				<ul class="northcloud-sidebar-list">
					{#each data.northCloudArticles as article (article.id)}
						<li class="northcloud-sidebar-item">
							<!-- eslint-disable svelte/no-navigation-without-resolve -->
							<a
								href={article.url}
								class="northcloud-sidebar-link"
								target="_blank"
								rel="noopener noreferrer"
							>
								{article.title}
							</a>
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
						</li>
					{/each}
				</ul>
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a
					href="https://northcloud.biz"
					class="northcloud-sidebar-more"
					target="_blank"
					rel="noopener noreferrer"
				>
					North Cloud
				</a>
			</aside>
		{/if}
	</div>

	<!-- Dev.to section -->
	<section class="dev-to-wrapper" aria-label="Dev.to articles">
		<DevTo />
	</section>
</div>
