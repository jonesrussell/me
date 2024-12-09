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
	<title>Blog | Russell Jones</title>
	<meta name="description" content="Russell Jones's Blog" />
</svelte:head>

<section class="blog-section">
	<h1>Web Developer Blog</h1>
	
	{#each $blogPosts as post}
		<article class="blog-post">
			<h2 class="title">
				<a href={post.link}>{post.title}</a>
			</h2>
			<p class="description">
				{post.description}
			</p>
			<span class="date">{formatDate(post.published)}</span>
		</article>
	{/each}
</section>

<style>
	.blog-section {
		max-width: var(--measure);
		margin: 0 auto;
	}

	.blog-post {
		display: grid;
		grid-template-columns: minmax(20ch, 30ch) minmax(30ch, 1fr) 15ch;
		gap: var(--ch2);
		padding: var(--ch2) 0;
		border-bottom: 1px solid var(--border-color);
		line-height: var(--line-height);
	}

	.title {
		font-size: 1em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.description {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: var(--text-muted);
		font-size: 0.9em;
	}

	.date {
		text-align: right;
		white-space: nowrap;
		color: var(--text-muted);
		font-size: 0.9em;
	}

	@media (max-width: 80ch) {
		.blog-post {
			grid-template-columns: 1fr;
			gap: var(--ch);
		}

		.date {
			text-align: left;
		}
	}
</style>
