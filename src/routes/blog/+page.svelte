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
		<div class="header-content">
			<h1>Web Developer Blog</h1>
			<p class="subtitle">
				<a
					href="https://github.com/jonesrussell"
					target="_blank"
					rel="noopener noreferrer"
				>
					Open Source Enthusiast
				</a>
			</p>
			<p class="source-note">
				This page and
				<a href={devToUrl} target="_blank" rel="noopener noreferrer">
					DEV.to
				</a>
				are syndicated from my
				<a
					href="https://jonesrussell.github.io/blog/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Jekyll-powered blog
				</a>
			</p>
		</div>
		<hr class="divider" />
	</header>

	<div class="content">
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
		padding: var(--ch4) 0;
	}

	.header-content {
		margin-bottom: var(--ch4);
	}

	.divider {
		height: calc(1 * var(--ch) / 16);
		background: var(--border-color);
		margin: 0;
		border: none;
	}

	.content {
		display: grid;
		grid-template-columns: 1fr calc(32 * var(--ch));
		gap: calc(2 * var(--ch));
		align-items: start;
	}

	@media (width <= calc(80 * var(--ch))) {
		.content {
			grid-template-columns: 1fr;
		}
	}

	h1 {
		margin: 0;
		font-size: var(--font-size-3xl);
		line-height: var(--line-height-tight);
		color: var(--accent-color);
	}

	.subtitle {
		margin: var(--ch2) 0 0 0;
		color: var(--text-muted);
		font-size: var(--font-size-lg);
	}

	.subtitle a {
		color: var(--accent-color);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.subtitle a:hover {
		color: var(--link-color);
		text-decoration: underline;
	}

	.posts {
		display: flex;
		flex-direction: column;
		gap: calc(2 * var(--ch));
	}

	.post {
		padding: calc(3 * var(--ch));
		border: calc(1 * var(--ch) / 16) solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--color-mix-light);
	}

	.post:hover {
		background: var(--color-mix-light-hover);
	}

	.post-header {
		display: flex;
		gap: calc(2 * var(--ch));
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: calc(2 * var(--ch));
	}

	.post-header h2 {
		margin: 0;
		font-size: var(--font-size-xl);
		line-height: var(--line-height-tight);
	}

	.post-header h2 a {
		color: var(--text-color);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.post-header h2 a:hover {
		color: var(--accent-color);
		text-decoration: underline;
	}

	time {
		color: var(--text-muted);
		white-space: nowrap;
		font-size: var(--font-size-sm);
		font-family: var(--font-mono);
	}

	.description {
		margin: 0;
		color: var(--text-muted);
		line-height: var(--line-height-relaxed);
	}

	.dev-to-section {
		position: sticky;
		top: calc(4 * var(--ch));
		padding: calc(3 * var(--ch));
		border: calc(1 * var(--ch) / 16) solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--color-mix-faint);
	}

	.dev-to-section:hover {
		background: var(--color-mix-faint-hover);
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

	.dev-to-screenshot:hover {
		transform: scale(1.02);
	}

	.dev-to-text {
		display: block;
		padding: var(--ch2) 0;
		font-size: var(--font-size-sm);
		color: var(--accent-color);
		font-family: var(--font-mono);
	}

	.source-note {
		margin: var(--ch2) 0;
		color: var(--text-muted);
		font-size: var(--font-size-sm);
		text-align: center;
		font-family: var(--font-mono);
	}

	.source-note a {
		color: var(--link-color);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.source-note a:hover {
		color: var(--accent-color);
		text-decoration: underline;
	}

	@media (width <= 40ch) {
		.post-header {
			flex-direction: column;
			gap: var(--ch);
		}

		h1 {
			font-size: var(--font-size-2xl);
		}

		.subtitle {
			font-size: var(--font-size-md);
		}
	}
</style>
