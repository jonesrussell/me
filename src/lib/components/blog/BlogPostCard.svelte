<script lang="ts">
	import type { BlogPost } from '$lib/types/blog';

	const { post } = $props<{ post: BlogPost }>();

	// Simple excerpt logic: first 200 chars, no HTML
	function excerpt(content: string): string {
		return content.replace(/<[^>]+>/g, '').slice(0, 200) + (content.length > 200 ? '…' : '');
	}
</script>

<style>
	.card {
		display: flex;
		padding: var(--space-6);
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		transition:
			transform var(--transition-base),
			box-shadow var(--transition-base),
			border-color var(--transition-base);
		flex-direction: column;
		gap: var(--space-4);
	}

	.card:hover {
		box-shadow: var(--shadow-md);
		transform: translateY(-0.125rem);
		border-color: var(--accent-color);
		border-left: 3px solid var(--accent-color);
	}

	.title {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: 700;
		text-decoration: none;
		color: var(--text-color);
	}

	.title:hover {
		color: var(--accent-color);
	}

	.meta {
		display: flex;
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		gap: var(--space-3);
		flex-wrap: wrap;
	}

	.categories {
		display: flex;
		gap: var(--space-2);
	}

	.category {
		padding: 0 var(--space-2);
		font-size: var(--font-size-xs);
		color: var(--text-color);
		background: var(--color-mix-faint);
		border-radius: var(--radius-sm);
	}

	.excerpt {
		font-size: var(--font-size-base);
		color: var(--text-muted);
	}

	@media (prefers-reduced-motion: reduce) {
		.card {
			transition: none;
		}

		.card:hover {
			transform: none;
		}
	}
</style>

<article class="card">
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a class="title" href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</a>
	<div class="meta">
		<time datetime={post.published}>{post.formattedDate || post.published}</time>
		{#if post.categories.length > 0}
			<div class="categories">
				{#each post.categories as category, i (category + '-' + i)}
					<span class="category">{category}</span>
				{/each}
			</div>
		{/if}
	</div>
	<div class="excerpt">{excerpt(post.content)}</div>
</article>
