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
		<div>
			<h2>About</h2>
			<p>Me dev.</p>
		</div>

		<div>
			<h2>Blog</h2>
			<p>Latest posts and thoughts.</p>
			{#each $blogPosts.slice(0, 2) as post}
				<article class="flex flex-col items-start space-y-2 border-b border-gray-300 py-2 md:flex-row md:items-center md:space-x-4 md:space-y-0">
					<h3 class="flex-grow whitespace-nowrap text-sm">
						<a class="text-gray-700 underline" href={post.link}>{post.title}</a>
					</h3>
					<span class="whitespace-nowrap text-xs text-gray-500">{formatDate(post.published)}</span>
				</article>
			{/each}
			<a href="/blog" class="mt-4 inline-block text-sm underline">View all posts →</a>
		</div>

		<div>
			<h2>Projects</h2>
			<p>Current work and experiments.</p>
		</div>
	</div>
</section>
