<script lang="ts">
	import type { BlogPost } from '$lib/types/blog';
	import { decodeEntities } from '$lib/utils/html-entities';

	const { post } = $props<{ post: BlogPost }>();

	function excerpt(content: string): string {
		const text = decodeEntities(content.replace(/<[^>]+>/g, ''));
		return text.slice(0, 200) + (text.length > 200 ? '…' : '');
	}
</script>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		padding: var(--space-4);
		background: var(--bg-darker);
		border-inline-start: 0.125rem solid var(--border-color);
		transition:
			border-color var(--transition-base),
			background-color var(--transition-base);
	}

	.card:hover {
		border-inline-start-color: var(--accent-color);
		background-color: color-mix(in srgb, var(--bg-darker) 95%, var(--accent-color));
	}

	.title {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-lg);
		font-weight: 700;
		text-decoration: none;
		color: var(--text-color);
	}

	.title:hover {
		text-decoration: underline;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.excerpt {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	@media (prefers-reduced-motion: reduce) {
		.card {
			transition: none;
		}
	}
</style>

<article class="card">
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a class="title" href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</a>
	<p class="meta">
		<time datetime={post.published}>{post.formattedDate}</time>
		{#if post.categories.length > 0}
			<span class="meta-separator">·</span>
			<span class="meta-tags">[{post.categories.join(', ')}]</span>
		{/if}
	</p>
	<p class="excerpt">{excerpt(post.content)}</p>
</article>
