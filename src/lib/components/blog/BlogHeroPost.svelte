<script lang="ts">
	import type { BlogPost } from '$lib/types/blog';

	interface Props {
		post: BlogPost;
	}

	const { post }: Props = $props();

	function excerpt(content: string): string {
		const text = content.replace(/<[^>]*>/g, '');
		if (text.length <= 280) return text;
		return text.slice(0, 280) + '...';
	}

	function formatCategories(categories: string[]): string {
		return categories.join(', ');
	}
</script>

<style>
	.hero-post {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: var(--space-8);
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-inline-start: 0.25rem solid var(--accent-color);
		border-radius: var(--radius-md);
		box-shadow: inset 0.25rem 0 0 0 color-mix(in srgb, var(--accent-color) 20%, transparent);
		text-decoration: none;
		color: inherit;
		transition:
			border-color var(--transition-base),
			box-shadow var(--transition-base);
	}

	.hero-post:hover {
		border-color: var(--accent-color);
		box-shadow: inset 0.25rem 0 0 0 color-mix(in srgb, var(--accent-color) 40%, transparent);
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-post {
			transition: none;
		}
	}

	.hero-post-badge {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-bold);
		color: var(--accent-color);
		text-transform: uppercase;
		letter-spacing: 0.05ch;
	}

	.hero-post-title {
		font-family: var(--font-mono);
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		margin: 0;
	}

	@container (min-width: 48rem) {
		.hero-post-title {
			font-size: var(--font-size-3xl);
		}
	}

	.hero-post-meta {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		margin: 0;
	}

	.hero-post-excerpt {
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		color: var(--text-muted);
		line-height: var(--line-height-relaxed);
		margin: 0;
	}
</style>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a class="hero-post" href={post.link} target="_blank" rel="noopener noreferrer">
	<span class="hero-post-badge">[LATEST]</span>
	<h2 class="hero-post-title">{post.title}</h2>
	<p class="hero-post-meta">
		published: {post.published}{#if post.categories.length > 0}{' '}| tags: [{formatCategories(post.categories)}]{/if}
	</p>
	<p class="hero-post-excerpt">{excerpt(post.content)}</p>
</a>
