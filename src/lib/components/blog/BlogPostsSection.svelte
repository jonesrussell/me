<script lang="ts">
	import BlogPost from './BlogPost.svelte';
	import type { BlogPost as BlogPostType } from '$lib/types/blog';

	const { posts } = $props<{
		posts: BlogPostType[];
	}>();
</script>

<style>
	.blog-section {
		container-type: inline-size;
		container-name: blog-section;
		margin: var(--space-6) 0;
	}

	.blog-grid {
		display: grid;
		gap: var(--space-3);
	}

	@container blog-section (width >= 40rem) {
		.blog-section {
			margin: var(--space-8) 0;
		}

		.blog-grid {
			gap: var(--space-4);
		}
	}

	@container blog-section (width >= 48rem) {
		.blog-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--space-6);
		}
	}

	@container blog-section (width >= 64rem) {
		.blog-grid {
			gap: var(--space-8);
		}
	}
</style>

<section class="blog-section">
	<div class="blog-grid">
		{#each posts as post, index (post.slug + '-' + index)}
			<BlogPost {post} />
		{/each}
	</div>
</section>
