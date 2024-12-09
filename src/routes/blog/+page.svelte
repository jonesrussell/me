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

<Grid cols={1} gap={4}>
	<Box width={postWidth}>
		<h1>Web Developer Blog</h1>
	</Box>
	
	{#each $blogPosts as post}
		<Box width={postWidth}>
			<article class="blog-post">
				<h2 class="title">
					<a href={post.link}>{post.title}</a>
				</h2>
				<p class="description">
					{post.description}
				</p>
				<span class="date">{formatDate(post.published)}</span>
			</article>
		</Box>
	{/each}
</Grid>

<style>
	.blog-post {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--ch2);
		line-height: 1.2;
	}

	.title {
		grid-column: 1 / -1;
		margin: 0;
		padding: 0;
	}

	.description {
		margin: 0;
		padding: 0;
	}

	.date {
		color: var(--text-muted);
		white-space: nowrap;
	}
</style>
