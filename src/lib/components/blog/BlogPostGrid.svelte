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
		grid-template-columns: 1fr;
		width: 100%;
		padding: var(--space-2) 0;
	}

	@container blog-post-grid (width >= 30rem) {
		.blog-post-grid {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 35ch), 1fr));
		}
	}

	@container blog-post-grid (width >= 50rem) {
		.blog-post-grid {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 45ch), 1fr));
		}
	}

	@container blog-post-grid (width >= 75rem) {
		.blog-post-grid {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 50ch), 1fr));
		}
	}
</style>

<div class="blog-post-grid">
	{#each posts as post (post.slug)}
		<BlogPost {post} />
	{/each}
</div>
