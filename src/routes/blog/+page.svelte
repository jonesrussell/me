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

	const postWidth = alignToGrid(80);
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

	{#each $blogPosts as post}
		<Box
			title={`${post.title} (${formatDate(post.published)})`}
			content={post.description}
			width={postWidth}
		/>
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

	header {
		text-align: center;
		margin-bottom: var(--ch2);
	}

	h1 {
		font-size: var(--ch3);
		font-weight: bold;
		margin: 0;
	}

	.subtitle {
		font-size: var(--ch2);
		color: var(--text-secondary);
		margin: var(--ch1) 0 0 0;
	}
</style>
