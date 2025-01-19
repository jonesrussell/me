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

		<div class="sidebar">
			<Box width={32}>
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
			</Box>
		</div>
	</div>
</div>

<style>
	.blog {
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		padding: var(--ch4) var(--content-padding);
		font-family: var(--font-mono);
	}

	header {
		margin-bottom: var(--ch8);
		text-align: center;
	}

	h1 {
		margin: 0;
		font-size: var(--font-size-2xl);
		line-height: var(--line-height-tight);
		color: var(--accent-color);
		font-weight: 500;
		background: linear-gradient(
			to right,
			var(--accent-color),
			var(--accent-color-hover)
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.subtitle {
		margin: var(--ch2) auto 0;
		color: var(--text-muted);
		font-size: var(--font-size-lg);
	}

	.source-note {
		margin: var(--ch2) auto 0;
		color: var(--text-muted);
		font-size: var(--font-size-base);
	}

	.source-note a {
		color: var(--accent-color);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.source-note a:hover {
		color: var(--accent-color-hover);
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
		justify-content: space-between;
		align-items: baseline;
		gap: var(--ch4);
		flex-wrap: wrap;
	}

	.post-header h2 {
		margin: 0;
		font-size: var(--font-size-lg);
		line-height: var(--line-height-tight);
	}

	.post-header h2 a {
		color: var(--accent-color);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.post-header h2 a:hover {
		color: var(--accent-color-hover);
	}

	time {
		color: var(--text-muted);
		font-size: var(--font-size-sm);
		white-space: nowrap;
	}

	.description {
		margin: 0;
		color: var(--text-muted);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
	}

	.url-preview {
		display: flex;
		align-items: center;
		gap: var(--ch);
		padding: var(--ch) var(--ch2);
		background: var(--bg-darker);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		font-family: var(--font-mono);
		overflow: hidden;
		text-decoration: none;
		transition: all 0.2s ease;
		width: fit-content;
	}

	.url-preview:hover {
		background: color-mix(in srgb, var(--bg-darker) 80%, var(--accent-color));
		color: var(--text-color);
	}

	.url-preview:hover .url-icon {
		transform: translateX(2px);
	}

	.url-icon {
		color: var(--accent-color);
		transition: transform 0.2s ease;
	}

	.sidebar {
		position: sticky;
		top: var(--ch4);
	}

	.dev-to-link {
		display: block;
		color: inherit;
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
	}

	.dev-to-text {
		color: var(--accent-color);
		font-size: var(--font-size-sm);
	}

	@media (max-width: 1200px) {
		.content {
			grid-template-columns: 1fr;
		}

		.sidebar {
			display: none;
		}
	}

	@media (max-width: 767px) {
		header {
			margin-bottom: var(--ch4);
		}

		h1 {
			font-size: var(--font-size-xl);
		}

		.blog {
			padding: var(--ch2) var(--content-padding);
		}
	}
</style>
