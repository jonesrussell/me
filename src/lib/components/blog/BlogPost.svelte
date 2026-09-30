<script lang="ts">
	import BlogPostHeader from './BlogPostHeader.svelte';
	import BlogPostContent from './BlogPostContent.svelte';
	import type { BlogPost } from '$lib/types/blog';

	const { post } = $props<{ post: BlogPost }>();
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
		max-width: 55rem;
		margin: 0 auto;
		padding: var(--space-8);
	}
</style>

<article class="blog-post">
	<BlogPostHeader {post} />
	<BlogPostContent content={post.content} />
</article>
