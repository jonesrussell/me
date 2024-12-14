<script lang="ts">
	import { onMount } from 'svelte';
	import { blogPosts, fetchFeed } from '$services/blogService';
	import { alignToGrid } from '$lib/utils/grid';
	import Box from '$lib/components/Box.svelte';

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
	<title>Blog | Russell Jones</title>
	<meta name="description" content="Russell Jones's Blog" />
</svelte:head>

<div class="blog">
	<header>
		<h1>Web Developer Blog</h1>
		<p class="subtitle">Web Developer & Open Source Enthusiast</p>
	</header>

	<div class="posts">
		{#each $blogPosts as post}
			<article class="post">
				<div class="post-header">
					<h2>{post.title}</h2>
					<time>{formatDate(post.published)}</time>
				</div>
				<p class="description">{post.description}</p>
			</article>
		{/each}
	</div>
</div>

<style>
	.blog {
		max-width: min(var(--measure), 95vw);
		margin: 0 auto;
		padding: var(--ch4) var(--ch2);
	}

	header {
		text-align: center;
		margin-bottom: var(--ch4);
	}

	h1 {
		font-size: 2em;
		line-height: 1.2;
		margin: 0;
	}

	.subtitle {
		color: var(--text-muted);
		margin: var(--ch2) 0 0 0;
	}

	.posts {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
	}

	.post {
		padding: var(--ch2);
		border: 1px solid var(--border-color);
		border-radius: 2px;
		background: color-mix(in srgb, var(--text-color) 5%, transparent);
	}

	.post-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--ch2);
		margin-bottom: var(--ch);
	}

	.post-header h2 {
		font-size: 1.2em;
		margin: 0;
		line-height: 1.2;
	}

	time {
		color: var(--text-muted);
		white-space: nowrap;
	}

	.description {
		margin: 0;
		color: var(--text-muted);
	}

	@media (max-width: 40ch) {
		.post-header {
			flex-direction: column;
			gap: var(--ch);
		}
	}
</style>
