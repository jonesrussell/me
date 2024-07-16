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

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US');
	}
</script>

<Pane title="Web Developer Blog" {x} {y} on:update={handleUpdate}>
	{#each $blogPosts as post}
		<!-- Subscribe to the blogPosts store -->
		<article
			class="flex flex-col items-start space-y-2 border-b border-gray-300 py-2 md:flex-row md:items-center md:space-x-4 md:space-y-0"
		>
			<h2 class="flex-grow whitespace-nowrap text-sm">
				<a class="text-gray-700 underline" href={post.link}>{post.title}</a>
			</h2>
			<p
				class="overflow-hidden overflow-ellipsis whitespace-nowrap text-xs text-gray-500 md:flex-grow"
			>
				{post.description}
			</p>
			<span class="whitespace-nowrap text-xs text-gray-500">{formatDate(post.published)}</span>
		</article>
	{/each}
</Pane>
