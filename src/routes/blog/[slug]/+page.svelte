<script lang="ts">
	import { page } from '$app/stores';
	import { blogPostStore } from '$lib/stores/blog-post.store';
	import BlogPost from '$lib/components/blog/BlogPost.svelte';
	import BlogLoadingSkeleton from '$lib/components/blog/BlogLoadingSkeleton.svelte';
	import BlogErrorState from '$lib/components/blog/BlogErrorState.svelte';

	$: slug = $page.params.slug;
	$: blogPostStore.loadPost(slug);
	$: ({ post, isLoading, error } = $blogPostStore);
</script>

<style>
	.blog-page {
		min-height: 100vh;
		background: var(--color-surface);
	}
</style>

<div class="blog-page">
	{#if isLoading}
		<BlogLoadingSkeleton />
	{:else if error}
		<BlogErrorState {error} />
	{:else if post}
		<BlogPost {post} />
	{/if}
</div>
