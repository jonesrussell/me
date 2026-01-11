<script lang="ts">
	import BlogPost from '$lib/components/blog/BlogPost.svelte';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
</script>

<style>
	.blog-page {
		min-height: 100vh;
		background: var(--color-surface);
	}
</style>

<div class="blog-page">
	<BlogPost post={data.post} />
</div>
