<script lang="ts">
	import devToProfile from '$lib/images/dev.to.jpeg?enhanced';
	import { blogPosts, fetchFeed, formatDate } from '$services/blog-service';
	import { onMount } from 'svelte';
	import Box from '$lib/components/Box.svelte';

	const devToUrl = 'https://dev.to/jonesrussell' as const;

	onMount(async () => {
		const result = await fetchFeed();
		blogPosts.set(result.items);
	});
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
				<picture>
					<source
						type="image/webp"
						srcset={devToProfile.sources['image/webp']}
						sizes="(min-width: 1280px) 1280px, (min-width: 768px) 768px, 100vw"
					/>
					<source
						type="image/jpeg"
						srcset={devToProfile.sources['image/jpeg']}
						sizes="(min-width: 1280px) 1280px, (min-width: 768px) 768px, 100vw"
					/>
					<img
						{...devToProfile.img}
						alt="Russell Jones's DEV.to Profile"
						class="dev-to-screenshot"
						sizes="(min-width: 1280px) 1280px, (min-width: 768px) 768px, 100vw"
						fetchpriority="high"
						loading="eager"
						decoding="sync"
					/>
				</picture>
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

	<div class="container">
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
						<div class="post-content">
							<p class="description">{post.description}</p>
						</div>
						<div class="post-footer">
							<a
								href={post.link}
								target="_blank"
								rel="noopener noreferrer"
								class="url-preview"
							>
								<span class="url-icon">→</span>
								<span class="url-text">Read article</span>
							</a>
						</div>
					</article>
				</Box>
			{/each}
		</div>
	</div>
</div>

<style>
	@media (prefers-reduced-motion: reduce) {
		.header-image a,
		.url-preview,
		.url-icon,
		.post-header a,
		.source-note a {
			transition: none;
		}
	}

	@container (width > 48ch) {
		.header-image {
			max-width: 48ch;
		}
	}

	.blog {
		width: 100%;
		padding: var(--space-16) 0;
	}

	header {
		width: 100%;
		max-width: min(var(--measure), 95cqi);
		margin: 0 auto var(--space-16);
		padding: 0 var(--space-4);
		text-align: center;
	}

	.header-image {
		overflow: hidden;
		width: 100%;
		max-width: 34.75ch;
		margin: 0 auto var(--space-8);
		border-radius: var(--radius-md);
		aspect-ratio: 16/9;
		container-type: inline-size;
	}

	.header-image a {
		display: block;
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: var(--radius-md);
		transition: transform var(--transition-duration) var(--transition-timing);
		overflow: hidden;
	}

	.header-image a:hover {
		transform: scale(1.02);
	}

	.dev-to-screenshot {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: var(--radius-md);
	}

	h1 {
		margin: 0;
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-medium);
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
		margin: var(--space-4) auto 0;
		font-size: var(--font-size-lg);
		color: var(--text-muted);
	}

	.source-note {
		margin: var(--space-4) auto 0;
		font-size: var(--font-size-sm);
		color: var(--text-muted);
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

	.post {
		display: grid;
		gap: var(--space-4);
		padding: var(--space-4);
		background: var(--bg-darker);
		border-radius: var(--radius-md);
		transition: transform var(--transition-duration) var(--transition-timing);
	}

	.post:hover {
		transform: translateY(-0.25ch);
	}

	.post-header {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
		align-items: baseline;
		justify-content: space-between;
	}

	.post-header h2 {
		margin: 0;
		font-size: var(--font-size-lg);
		line-height: var(--line-height-tight);
	}

	.post-header a {
		text-decoration: none;
		color: var(--text-color);
		transition: color var(--transition-duration) var(--transition-timing);
	}

	.post-header a:hover {
		color: var(--accent-color);
	}

	time {
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		white-space: nowrap;
	}

	.post-content {
		margin: var(--space-4) 0;
	}

	.description {
		display: -webkit-box;
		margin: 0;
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--text-color);
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.post-footer {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: var(--space-2);
	}

	.url-preview {
		display: flex;
		width: fit-content;
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		text-decoration: none;
		color: var(--text-muted);
		background: var(--bg-color);
		border-radius: var(--radius-sm);
		transition: all var(--transition-duration) var(--transition-timing);
		gap: var(--space-2);
		align-items: center;
	}

	.url-preview:hover {
		color: var(--text-color);
		background: color-mix(in srgb, var(--bg-color) 80%, var(--accent-color));
	}

	.url-icon {
		color: var(--accent-color);
		transition: transform var(--transition-duration) var(--transition-timing);
	}

	.url-preview:hover .url-icon {
		transform: translateX(0.25ch);
	}

	@media (prefers-reduced-motion: reduce) {
		.post,
		.url-preview,
		.url-icon {
			transition: none;
		}
	}
</style>
