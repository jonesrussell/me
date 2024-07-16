<script lang="ts">
	import { onMount } from 'svelte';
	import { blogPosts, fetchFeed } from '../../services/blogService';
	import AppWindow from '../../components/AppWindow/AppWindow.svelte';

	export let x: number;
	export let y: number;

	onMount(async () => {
		const fetchedPosts = await fetchFeed();
		blogPosts.set(fetchedPosts); // Update the blogPosts store with the fetched posts
	});
</script>

<AppWindow title="Blog" {x} {y}>
	{#each $blogPosts as post} <!-- Subscribe to the blogPosts store -->
		<article class="p-4 my-4 border border-gray-300 rounded">
			<h2 class="mb-2 text-lg"><a class="text-gray-700 underline" href={post.link}>{post.title}</a></h2>
			<div class="mb-4">
				{@html post.description}
			</div>
		</article>
	{/each}
</AppWindow>
