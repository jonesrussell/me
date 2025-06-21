<script lang="ts">
	import type { BlogPost } from '$lib/types/blog';
	export let post: BlogPost;

	// Simple excerpt logic: first 200 chars, no HTML
	function excerpt(content: string): string {
		return content.replace(/<[^>]+>/g, '').slice(0, 200) + (content.length > 200 ? '…' : '');
	}
</script>

<style>
	.card {
		display: flex;
		padding: var(--space-6);
		background: var(--color-surface);
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: 0 0.125rem 0.5rem rgb(0 0 0 / 0.1);
		transition: all 0.2s ease;
		flex-direction: column;
		gap: var(--space-4);
	}

	.card:hover {
		box-shadow: 0 0.25rem 1rem rgb(0 0 0 / 0.15);
		transform: translateY(-0.125rem);
		border-color: var(--color-primary);
	}

	.title {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: 700;
		text-decoration: none;
		color: var(--color-heading);
	}

	.title:hover {
		color: var(--color-primary);
	}

	.meta {
		display: flex;
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
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
		color: var(--color-text);
		background: var(--color-surface);
		border-radius: var(--radius-sm);
	}

	.excerpt {
		font-size: var(--font-size-md);
		color: var(--color-text);
	}
</style>

<article class="card">
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
