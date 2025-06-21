<script lang="ts">
	import { formatPostDate } from '$lib/services/blog-service';
	import type { BlogPost } from '$lib/types/blog';

	export let post: BlogPost;
</script>

<style>
	/* Responsive adjustments */
	@container post-header (width < 30rem) {
		.post-header h1 {
			font-size: var(--font-size-2xl);
		}

		.metadata {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-2);
		}
	}

	.post-header {
		container-type: inline-size;
		container-name: post-header;
		width: 100%;
		margin-bottom: var(--space-8);
	}

	.breadcrumb {
		margin-bottom: var(--space-6);
	}

	.breadcrumb a {
		font-size: var(--font-size-sm);
		text-decoration: none;
		color: var(--color-text-muted);
		transition: color 0.2s ease;
	}

	.breadcrumb a:hover {
		color: var(--color-primary);
	}

	.post-header h1 {
		margin-bottom: var(--space-6);
		font-size: var(--font-size-4xl);
		font-weight: 700;
		line-height: 1.2;
		color: var(--color-heading);
	}

	.metadata {
		display: flex;
		gap: var(--space-4);
		align-items: center;
		flex-wrap: wrap;
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	.metadata time {
		font-weight: 500;
	}

	.categories {
		display: flex;
		gap: var(--space-2);
		flex-wrap: wrap;
	}

	.category {
		padding: var(--space-1) var(--space-2);
		font-size: var(--font-size-xs);
		color: var(--color-text);
		background: var(--color-surface-elevated);
		border-radius: var(--radius-sm);
	}
</style>

<header class="post-header">
	<nav class="breadcrumb">
		<a href="/blog">← Back to Blog</a>
	</nav>

	<h1>{post.title}</h1>

	<div class="metadata">
		<time datetime={post.published}>
			{formatPostDate(post.published)}
		</time>
		{#if post.categories.length > 0}
			<div class="categories">
				{#each post.categories as category, i (category + '-' + i)}
					<span class="category">{category}</span>
				{/each}
			</div>
		{/if}
	</div>
</header>
