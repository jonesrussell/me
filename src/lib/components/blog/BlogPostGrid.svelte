<script lang="ts">
	import BlogPost from './BlogPost.svelte';
	import type { BlogPost as BlogPostType } from '$lib/types/blog';

	const { posts } = $props<{ posts: BlogPostType[] }>();
</script>

<style>
	.blog-post-grid {
		container-type: inline-size;
		container-name: blog-post-grid;
		display: grid;
		gap: var(--space-8);
		grid-template-columns: minmax(min(100%, 30rem), 1fr);
		width: 100%;
		padding: var(--space-2) 0;
		justify-content: center;
	}

	.container {
		contain: layout style paint;
		width: 100%;
		max-width: var(--container-max-width);
		margin-inline: auto;
		padding-inline: var(--container-padding);
	}

	@container blog-post-grid (min-width: 640px) {
		:global(.blog-post-grid) {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 30rem), 1fr));
			justify-content: start;
		}
	}

	@container blog-post-grid (min-width: 768px) {
		:global(.blog-post-grid) {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 40rem), 1fr));
		}
	}

	@container blog-post-grid (min-width: 1024px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-16);
		}
	}

	@container blog-post-grid (min-width: 1280px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-20);
		}
	}
</style>

<div class="container">
	<div class="blog-post-grid">
		{#each posts as post (post.slug)}
			<BlogPost {post} />
		{/each}
	</div>
</div>
