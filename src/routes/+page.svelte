<script lang="ts">
	import { onMount } from 'svelte';
	import { blogPosts, fetchFeed } from '$services/blogService';
	import Box from '$components/Box.svelte';

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
	<title>Russell Jones | Home</title>
	<meta name="description" content="Russell Jones" />
</svelte:head>

<h1>Home of dev.</h1>

<div class="content">
	<Box title="About" width={30}>
		Me dev.
	</Box>

	<Box title="Blog" width={60}>
		Latest posts and thoughts.
		{#each $blogPosts as post}
			<div class="post-line">
				<a href={post.link}>{post.title}</a>
				<span class="date">{formatDate(post.published)}</span>
			</div>
		{/each}
		<a href="/blog" class="view-more">View all posts →</a>
	</Box>

	<Box title="Projects" width={40}>
		Current work and experiments.
	</Box>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2ch;
		margin: 0 auto;
		padding: 2ch;
	}

	h1 {
		text-align: center;
		margin-bottom: 4ch;
	}

	.post-line {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 2ch;
		padding: 0.5ch 0;
		text-align: left;
	}
	
	.date {
		color: var(--text-muted);
		white-space: nowrap;
	}
	
	.view-more {
		display: block;
		margin-top: 2ch;
		text-align: right;
	}

	:global(.box) {
		text-align: center;
	}
</style>
