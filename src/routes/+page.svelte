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
		<div class="blog-content">
			Latest posts and thoughts.
			{#each $blogPosts as post}
				<div class="post-line">
					<span class="title">{post.title.padEnd(40)}</span>
					<span class="date">{formatDate(post.published)}</span>
				</div>
			{/each}
			<div class="view-more-line">
				<span>View all posts →</span>
			</div>
		</div>
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
		display: flex;
		justify-content: space-between;
		padding: 0.5ch 0;
	}

	.title {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.date {
		color: var(--text-muted);
	}

	.view-more-line {
		text-align: right;
		padding-top: 1ch;
	}

	:global(.box) {
		text-align: center;
	}

	.blog-content {
		text-align: left;
		width: 100%;
		white-space: pre;
		line-height: 1.5;
	}
</style>
