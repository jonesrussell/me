<script lang="ts">
	import { onMount } from 'svelte';
	import { blogPosts, fetchFeed } from '../../services/blogService';
	import Pane from '../../components/Pane/Pane.svelte';

	export let x: number;
	export let y: number;
	export let width: number;
	export let height: number;

	onMount(async () => {
		const fetchedPosts = await fetchFeed();
		blogPosts.set(fetchedPosts); // Update the blogPosts store with the fetched posts
	});
</script>

<Pane title="Blog" {x} {y} {width} {height}>
	{#each $blogPosts as post} <!-- Subscribe to the blogPosts store -->
		<article class="p-4 my-4 border border-gray-300 rounded">
			<h2 class="mb-2 text-lg"><a class="text-gray-700 underline" href={post.link}>{post.title}</a></h2>
			<div class="mb-4">
				{@html post.description}
			</div>
		</article>
	{/each}
</Pane>
