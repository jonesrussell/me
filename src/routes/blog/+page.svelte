<script lang="ts">
	import devToProfile from '$lib/images/dev.to.jpeg?enhanced';
	import { blogPosts, fetchFeed } from '$services/blogService';
	import { onMount } from 'svelte';

	const devToUrl = 'https://dev.to/jonesrussell' as const;

	onMount(async () => {
		const fetchedPosts = await fetchFeed();
		blogPosts.set(fetchedPosts);
	});

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US');
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
	<header>
		<h1>Web Developer Blog</h1>
		<p class="subtitle">Web Developer & Open Source Enthusiast</p>
		<p class="source-note">
			This page and
			<a href={devToUrl} target="_blank" rel="noopener noreferrer"> DEV.to </a>
			are syndicated from my
			<a
				href="https://jonesrussell.github.io/blog/"
				target="_blank"
				rel="noopener noreferrer"
			>
				Jekyll-powered blog
			</a>
		</p>
	</header>

	<div class="dev-to-section">
		<a
			href={devToUrl}
			class="dev-to-link"
			target="_blank"
			rel="noopener noreferrer"
		>
			<div class="dev-to-content">
				<enhanced:img
					src={devToProfile}
					alt="Russell Jones's DEV.to Profile"
					class="dev-to-screenshot"
					sizes="(min-width: 1280px) 1280px, (min-width: 768px) 768px, 100vw"
					fetchpriority="high"
				/>
				<span class="dev-to-text"
					>Read more articles on DEV.to/jonesrussell</span
				>
			</div>
		</a>
	</div>

	<div class="posts">
		{#each $blogPosts as post}
			<article class="post">
				<div class="post-header">
					<h2>
						<a href={post.link} target="_blank" rel="noopener noreferrer">
							{post.title}
						</a>
					</h2>
					<time>{formatDate(post.published)}</time>
				</div>
				<p class="description">{post.description}</p>
			</article>
		{/each}
	</div>
</div>

<style>
	.blog {
		max-width: min(var(--measure), calc(95 * var(--ch)));
		margin: 0 auto;
		padding: var(--ch4) var(--ch2);
	}

	header {
		margin-bottom: var(--ch4);
		text-align: center;
	}

	h1 {
		margin: 0;
		font-size: var(--font-size-2xl);
		line-height: var(--line-height-tight);
	}

	.subtitle {
		margin: var(--ch2) 0 0 0;
		color: var(--text-muted);
	}

	.posts {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
	}

	.post {
		padding: var(--ch2);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--color-mix-light);
	}

	.post-header {
		display: flex;
		gap: var(--ch2);
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: var(--ch);
	}

	.post-header h2 {
		margin: 0;
		font-size: var(--font-size-lg);
		line-height: var(--line-height-tight);
	}

	time {
		color: var(--text-muted);
		white-space: nowrap;
	}

	.description {
		margin: 0;
		color: var(--text-muted);
	}

	@media (width <= 40ch) {
		.post-header {
			flex-direction: column;
			gap: var(--ch);
		}
	}

	.dev-to-section {
		margin: var(--ch4) 0;
		padding: var(--ch2);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--color-mix-faint);
	}

	.dev-to-link {
		display: block;
		width: 100%;
		color: var(--link-color);
		text-decoration: none;
	}

	.dev-to-content {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
		align-items: center;
		text-align: center;
	}

	.dev-to-screenshot {
		width: 100%;
		height: auto;
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-md);
	}

	.dev-to-text {
		display: block;
		padding: var(--ch) 0;
		font-size: var(--font-size-sm);
	}

	@media (width >= 60ch) {
		.dev-to-text {
			font-size: var(--font-size-md);
		}
	}

	.source-note {
		margin: var(--ch2) 0;
		color: var(--text-muted);
		font-size: var(--font-size-sm);
	}

	.source-note a {
		color: var(--link-color);
		text-decoration: none;
	}

	.source-note a:hover {
		text-decoration: underline;
	}

	.blog-title {
		color: var(--accent-color);
		font-size: var(--font-size-2xl);
		line-height: var(--line-height-tight);
	}

	.blog-meta {
		color: var(--text-muted);
		font-size: var(--font-size-lg);
		line-height: var(--line-height-tight);
	}

	.blog-date {
		font-size: var(--font-size-sm);
	}

	.blog-excerpt {
		font-size: var(--font-size-md);
	}

	.blog-tag {
		font-size: var(--font-size-sm);
	}
</style>
