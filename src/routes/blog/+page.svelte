<script lang="ts">
	import { onMount } from 'svelte';
	import { blogPosts, fetchFeed } from '$services/blogService';
	import { alignToGrid } from '$lib/utils/grid';
	import Table from '$lib/components/Table.svelte';
	import Box from '$lib/components/Box.svelte';

	onMount(async () => {
		const fetchedPosts = await fetchFeed();
		blogPosts.set(fetchedPosts);
	});

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US');
	}

	const postWidth = alignToGrid(80);

	// Add headers and transform blog posts into table rows
	$: tableHeaders = ['Title', 'Date', 'Description'];
	$: tableRows = $blogPosts.map(post => [
		post.title,
		formatDate(post.published),
		post.description
	]);
</script>

<svelte:head>
	<title>Blog | Russell Jones</title>
	<meta name="description" content="Russell Jones's Blog" />
</svelte:head>

<div class="blog">
	<Box 
		title="Web Developer Blog"
		content="Web Developer & Open Source Enthusiast"
		width={postWidth}
	/>

	<Table 
		headers={tableHeaders}
		rows={tableRows}
		width={postWidth}
	/>
</div>

<style>
	.blog {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
		align-items: center;
		width: 100%;
	}
</style>
