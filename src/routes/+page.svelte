<script lang="ts">
	import Box from '$lib/components/Box.svelte';
	import Grid from '$lib/components/Grid.svelte';
	import { onMount } from 'svelte';
	import { blogPosts, fetchFeed } from '$services/blogService';

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
	<title>Russell Jones | Web Developer</title>
	<meta name="description" content="Personal website of Russell Jones, web developer" />
</svelte:head>

<Grid cols={1} gap={4}>
	<Box width={50}>
		<div class="header-content">
			<h1>Russell Jones</h1>
			<p>Web Developer & Open Source Enthusiast</p>
		</div>
	</Box>

	<Box width={60}>
		<h2>Recent Posts</h2>
		<div class="post-list">
			{#each $blogPosts.slice(0, 3) as post}
			<div class="post-line">
				<span class="title">
					<a href={post.link}>{post.title}</a>
				</span>
				<span class="date">{formatDate(post.published)}</span>
			</div>
			{/each}
			<div class="view-more">
				<a href="/blog">View all posts →</a>
			</div>
		</div>
	</Box>
</Grid>

<style>
	.header-content {
		text-align: center;
		line-height: 1.2;
	}

	h1, p {
		line-height: 1.2;
		margin: 0;
		padding: 0;
	}

	h1 {
		margin-bottom: var(--ch);
	}

	.post-list {
		display: flex;
		flex-direction: column;
		gap: var(--ch);
	}

	.post-line {
		display: flex;
		justify-content: space-between;
		gap: var(--ch2);
		line-height: 1.2;
	}

	.title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.date {
		color: var(--text-muted);
		white-space: nowrap;
	}

	.view-more {
		text-align: right;
		padding-top: var(--ch2);
		line-height: 1.2;
	}
</style>
