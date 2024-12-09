<script lang="ts">
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
	<title>Russell Jones | Home</title>
	<meta name="description" content="Russell Jones" />
</svelte:head>

<section>
	<h1>Home of dev.</h1>

	<div class="grid">
		<Box title="About" width={30}>
			Me dev.
		</Box>

		<Box title="Blog" width={50}>
			Latest posts and thoughts.

			{#each posts as post}
				<div class="post-line">
					<a href={post.link}>{post.title}</a>
					<span class="date">{post.date}</span>
				</div>
			{/each}

			<a href="/blog" class="view-more">View all posts →</a>
		</Box>

		<Box title="Projects" width={40}>
			Current work and experiments.
		</Box>
	</div>
</section>

<style>
	.post-line {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 2ch;
		padding: 0.5ch 0;
	}
	
	.date {
		color: var(--text-muted);
	}
	
	.view-more {
		display: block;
		margin-top: 2ch;
	}
</style>
