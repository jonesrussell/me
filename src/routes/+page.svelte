<script lang="ts">
	import Box from '$lib/components/Box.svelte';
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

<div class="home">
	<Box width={50}>
		<h1>Russell Jones</h1>
		<p>Web Developer & Open Source Enthusiast</p>
	</Box>

	<section class="content-section">
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
	</section>
</div>

<style>
	.home {
		display: flex;
		flex-direction: column;
		gap: var(--ch4);
		align-items: center;
	}

	h1 {
		text-align: center;
		margin-bottom: var(--ch2);
	}

	.content-section {
		width: 100%;
		max-width: 60ch;
	}

	h2 {
		margin-bottom: var(--ch2);
		padding-bottom: var(--ch);
		border-bottom: 1px solid var(--border-color);
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
	}
</style>
