<script lang="ts">
	import BlogPostGrid from './BlogPostGrid.svelte';
	import ErrorBoundary from '../ErrorBoundary.svelte';
	import type { BlogPost as BlogPostType } from '$lib/types/blog';

	const { posts } = $props<{
		posts: BlogPostType[];
	}>();
</script>

<style>
	.blog-section {
		margin: var(--space-6) 0;
	}
</style>

<section class="blog-section">
	<ErrorBoundary fallback="Posts temporarily unavailable" component="BlogPostGrid">
		<BlogPostGrid {posts} />
	</ErrorBoundary>
</section>
