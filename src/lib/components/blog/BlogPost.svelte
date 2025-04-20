<script lang="ts">
	import type { BlogPost } from '$lib/types/blog';

	const { post } = $props<{ post: BlogPost }>();
</script>

<style>
	.blog-post {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		padding: var(--space-4);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
	}

	.blog-post:hover {
		background: var(--color-mix-light);
		border-color: var(--accent-color);
		transform: translateY(-0.125ch);
	}

	.title {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
		line-height: var(--line-height-tight);
		margin: 0;
	}

	.description {
		font-size: var(--font-size-base);
		line-height: var(--line-height-base);
		color: var(--text-muted);
		margin: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		line-clamp: 3;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	@media (prefers-reduced-motion: reduce) {
		.blog-post {
			transition: none;
		}

		.blog-post:hover {
			transform: none;
		}
	}
</style>

<a href={post.link} class="blog-post">
	<h3 class="title">{post.title}</h3>
	<p class="description">{post.description}</p>
	<div class="meta">
		<span>{post.pubDate}</span>
		<span>•</span>
		<span>{post.categories.join(', ')}</span>
	</div>
</a>
