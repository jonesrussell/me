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

<section>
	<h1>Web Developer Blog</h1>
	
	{#each $blogPosts as post}
		<article class="flex flex-col items-start space-y-2 border-b border-gray-300 py-2 md:flex-row md:items-center md:space-x-4 md:space-y-0">
			<h2 class="flex-grow whitespace-nowrap text-sm">
				<a class="text-gray-700 underline" href={post.link}>{post.title}</a>
			</h2>
			<p class="overflow-hidden overflow-ellipsis whitespace-nowrap text-xs text-gray-500 md:flex-grow">
				{post.description}
			</p>
			<span class="whitespace-nowrap text-xs text-gray-500">{formatDate(post.published)}</span>
		</article>
	{/each}
</section>
