<script lang="ts">
  import { onMount } from 'svelte';
  import { blogPosts, fetchFeed } from '../../services/blogService';
	import AppWindow from '../../components/AppWindow/AppWindow.svelte';

  onMount(async () => {
    const posts = await fetchFeed();
    blogPosts.set(posts);
  });

	export let x: number;
	export let y: number;

	let posts: {
		title: string;
		link: string;
		description: string;
	}[] = [];

	onMount(async () => {
		posts = $blogPosts;
	});
</script>

<AppWindow title="Blog" {x} {y}>
	{#each posts as post}
		<article>
			<h2><a href={post.link}>{post.title}</a></h2>
			<p>{post.description}</p>
		</article>
	{/each}
</AppWindow>
