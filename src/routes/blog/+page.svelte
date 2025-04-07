<script lang="ts">
	import devToProfile from '$lib/images/dev.to.jpeg?enhanced';
	import { blogPosts, fetchFeed } from '$services/blogService';
	import { onMount } from 'svelte';
	import Box from '$lib/components/Box.svelte';

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
		<div class="header-image">
			<a href={devToUrl} target="_blank" rel="noopener noreferrer">
				<img
					{...devToProfile}
					alt="Russell Jones's DEV.to Profile"
					class="dev-to-screenshot"
					sizes="(min-width: 1280px) 1280px, (min-width: 768px) 768px, 100vw"
					fetchpriority="high"
				/>
			</a>
		</div>
		<h1>Web Developer Blog</h1>
		<p class="subtitle">Open Source Enthusiast</p>
		<p class="source-note">
			This page and <a href={devToUrl} target="_blank" rel="noopener noreferrer"
				>DEV.to</a
			>
			are syndicated from my
			<a
				href="https://jonesrussell.github.io/blog/"
				target="_blank"
				rel="noopener noreferrer">Jekyll-powered blog</a
			>
		</p>
	</header>

	<div class="content">
		<div class="posts">
			{#each $blogPosts as post}
				<Box width={80}>
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
						<a
							href={post.link}
							target="_blank"
							rel="noopener noreferrer"
							class="url-preview"
						>
							<span class="url-icon">→</span>
							<span class="url-text">Read article</span>
						</a>
					</article>
				</Box>
			{/each}
		</div>
	</div>
</div>

<style>


	@media (width <= var(--blog-breakpoint-lg)) {
		.content {
			grid-template-columns: 1fr;
		}

		.sidebar {
			display: none;
		}
	}

	@media (width <= var(--blog-breakpoint-md)) {
		header {
			margin-bottom: var(--ch2);
		}

		h1 {
			font-size: var(--font-size-xl);
		}

		.blog {
			padding: var(--ch) var(--content-padding) var(--ch2);
		}

		.dev-to-screenshot {
			width: var(--blog-image-width-sm);
		}
	}

	:root {
		--blog-url-translate: 0.25ch;
		--blog-image-width-sm: 33.5ch;
		--blog-image-width-lg: 34.75ch;
		--blog-breakpoint-md: 95ch;
		--blog-breakpoint-lg: 150ch;
	}

	.blog {
		width: 100%;
		max-width: var(--content-max-width);
		margin: 0 auto;
		padding: var(--ch2) var(--content-padding) var(--ch4);

		font-family: var(--font-mono);
	}

	header {
		margin-bottom: var(--ch4);
		text-align: center;
	}

	/* Base link styles */
	.post-header a,
	.source-note a {
		text-decoration: none;
		color: var(--link-color);
		transition: color var(--transition-duration) var(--transition-timing);
	}

	/* Header image styles */
	.header-image {
		overflow: hidden;

		width: 100%;
		max-width: var(--blog-image-width-lg);
		margin: 0 auto var(--ch2);
		border-radius: var(--radius-md);
	}

	.header-image a {
		display: block;
		position: relative;
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	/* Hover states */
	.post-header a:hover,
	.source-note a:hover {
		color: var(--accent-color-hover);
	}

	.header-image a:hover {
		transform: scale(1.02);
	}

	.dev-to-screenshot {
		display: block;
		width: 100%;
		height: auto;
		border-radius: var(--radius-md);
	}

	h1 {
		margin: 0;

		font-size: var(--font-size-2xl);
		font-weight: 500;
		line-height: var(--line-height-tight);
		color: var(--accent-color);

		background: linear-gradient(
			to right,
			var(--accent-color),
			var(--accent-color-hover)
		);
		background-clip: text;

		-webkit-text-fill-color: transparent;
	}

	.subtitle {
		margin: var(--ch2) auto 0;
		font-size: var(--font-size-lg);
		color: var(--text-muted);
	}

	.content {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--ch8);
		align-items: start;
	}

	.posts {
		display: grid;
		gap: var(--ch4);
	}

	.post {
		display: grid;
		gap: var(--ch2);
	}

	.post-header {
		display: flex;
		flex-wrap: wrap;
		gap: var(--ch4);
		align-items: baseline;
		justify-content: space-between;
	}

	.post-header h2 {
		margin: 0;
		font-size: var(--font-size-lg);
		line-height: var(--line-height-tight);
	}

	.source-note {
		margin: var(--ch2) auto 0;
		font-size: var(--font-size-base);
		color: var(--text-muted);
	}

	time {
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		white-space: nowrap;
	}

	.description {
		margin: 0;
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
		color: var(--text-muted);
	}

	.url-preview {
		display: flex;

		width: fit-content;
		padding: var(--ch) var(--ch2);

		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		text-decoration: none;
		color: var(--text-muted);

		background: var(--bg-darker);
		border-radius: var(--radius-sm);

		transition: all var(--transition-duration) var(--transition-timing);
		overflow: hidden;
		gap: var(--ch);
		align-items: center;
	}

	.url-preview:hover {
		color: var(--text-color);
		background: color-mix(in srgb, var(--bg-darker) 80%, var(--accent-color));
	}

	.url-icon {
		color: var(--accent-color);
		transition: transform var(--transition-duration) var(--transition-timing);
	}

	.url-preview:hover .url-icon {
		transform: translateX(var(--blog-url-translate));
	}

	.sidebar {
		position: sticky;
		top: var(--ch4);
	}

	.dev-to-link {
		display: block;
		text-decoration: none;
		color: inherit;
	}

	.dev-to-content {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
		align-items: center;

		text-align: center;
	}

	.dev-to-text {
		font-size: var(--font-size-sm);
		color: var(--accent-color);
	}
</style>
