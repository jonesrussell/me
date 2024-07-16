<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { blogPosts, fetchFeed } from '../../services/blogService';
	import Pane from '../../components/Pane/Pane.svelte';

	export let x: number;
	export let y: number;

	let updateRect: (() => void) | null = null;

	onMount(async () => {
		const fetchedPosts = await fetchFeed();
		blogPosts.set(fetchedPosts); // Update the blogPosts store with the fetched posts
	});

	afterUpdate(() => {
		if (updateRect) {
			Promise.resolve().then(updateRect);
		}
	});

	function handleUpdate(event: CustomEvent<() => void>) {
		updateRect = event.detail;
	}
</script>

<Pane title="Blog" {x} {y} on:update={handleUpdate}>
	{#each $blogPosts as post}
		<!-- Subscribe to the blogPosts store -->
		<article class="my-4 rounded border border-gray-300 p-4">
			<h2 class="mb-2 text-lg">
				<a class="text-gray-700 underline" href={post.link}>{post.title}</a>
			</h2>
			<div class="mb-4">
				{@html post.description}
			</div>
		</article>
	{/each}
</Pane>
