<script lang="ts">
	import BlogPostCard from './BlogPostCard.svelte';
	import type { BlogPost as BlogPostType } from '$lib/types/blog';

	// Extracting props with proper typing
	const { posts } = $props<{ posts: BlogPostType[] }>();
</script>

<style>
	.blog-post-grid {
		container-type: inline-size;
		container-name: blog-post-grid;
		display: grid;
		gap: var(--space-4);
		grid-template-columns: 1fr;
		width: 100%;
		padding: var(--space-4) 0;
	}

	@container blog-post-grid (width >= 40rem) {
		.blog-post-grid {
			gap: var(--space-6);
		}
	}

	@container blog-post-grid (width >= 48rem) {
		.blog-post-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--space-6);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			transition: none;
			animation: none;
		}
	}
</style>

<div class="blog-post-grid">
	{#each posts as post (post.slug)}
		<BlogPostCard {post} />
	{/each}
</div>
