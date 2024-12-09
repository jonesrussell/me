<script lang="ts">
	import Grid from '$lib/components/Grid.svelte';
	import Box from '$lib/components/Box.svelte';
	import { onMount } from 'svelte';
	import { blogPosts, fetchFeed } from '$services/blogService';
	import { alignToGrid } from '$lib/utils/grid';

	onMount(async () => {
		const fetchedPosts = await fetchFeed();
		blogPosts.set(fetchedPosts);
	});

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US');
	}

	const postWidth = alignToGrid(80);
</script>

<svelte:head>
	<title>Blog | Russell Jones</title>
	<meta name="description" content="Russell Jones's Blog" />
</svelte:head>

<div class="blog">
	<Box width={postWidth} title="Web Developer Blog">
		<div class="blog-header">
			Web Developer & Open Source Enthusiast
		</div>
	</Box>

	{#each $blogPosts as post}
		<Box width={postWidth}>
			<div class="blog-post">
				<a href={post.link} class="post-title">{post.title}</a>
				<div class="post-meta">
					<span class="date">{formatDate(post.published)}</span>
				</div>
				<div class="post-description">
					{post.description}
				</div>
			</div>
		</Box>
	{/each}
</div>

<style>
	.blog {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
		align-items: center;
		width: 100%;
	}

	.blog-header {
		text-align: center;
		line-height: 1.2;
		color: var(--text-muted);
	}

	.blog-post {
		display: flex;
		flex-direction: column;
		gap: var(--ch);
		line-height: 1.2;
	}

	.post-title {
		font-weight: bold;
		color: var(--link-color);
		text-decoration: none;
	}

	.post-meta {
		color: var(--text-muted);
		font-size: 0.9em;
	}

	.post-description {
		color: var(--text-color);
		white-space: pre-wrap;
	}

	:global(.blog > :global(.box)) {
		margin: 0;
		width: var(--measure);
	}
</style>
