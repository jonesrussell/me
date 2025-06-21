<script lang="ts">
	import { fade } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import BlogPostHeader from './BlogPostHeader.svelte';
	import BlogPostContent from './BlogPostContent.svelte';
	import type { BlogPost } from '$lib/types/blog';

	export let post: BlogPost;
</script>

<style>
	/* Responsive adjustments */
	@container blog-post (width < 30rem) {
		.blog-post {
			padding: var(--space-4);
		}
	}

	.blog-post {
		container-type: inline-size;
		container-name: blog-post;
		width: 100%;
		max-width: min(var(--measure), 95cqi);
		margin: 0 auto;
		padding: var(--space-8);
	}
</style>

<article class="blog-post" in:fade={{ duration: 500, easing: elasticOut }}>
	<BlogPostHeader {post} />
	<BlogPostContent content={post.content} />
</article>
