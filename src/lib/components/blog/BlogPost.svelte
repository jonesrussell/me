<script lang="ts">
	import { fade } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import { formatPostDate } from '$lib/services/blog-service';
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	export let post: {
		title: string;
		link: string;
		published: string;
		description: string;
		slug: string;
	};

	const getSummary = (text: string) => {
		const maxLength = 200;
		if (text.length <= maxLength) return text;
		return text.slice(0, maxLength) + '...';
	};
</script>

<style>
	@media (prefers-reduced-motion: reduce) {
		article {
			transition: none;
		}
	}

	article {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		width: 100%;
		max-width: 100%;
		padding: var(--space-4);
		border-radius: var(--radius-lg);
		background: var(--surface-color);
		border: var(--border-width) solid var(--border-color);
		box-shadow: var(--shadow-sm);
		transition:
			transform var(--transition-duration) var(--transition-timing),
			box-shadow var(--transition-duration) var(--transition-timing),
			border-color var(--transition-duration) var(--transition-timing);
		box-sizing: border-box;
		contain: layout style paint;
	}

	.post-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		width: 100%;
		contain: layout style paint;
	}

	h2 {
		margin: 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-tight);
		color: var(--text-color);
		transition: color var(--transition-duration) var(--transition-timing);
	}

	.metadata {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.metadata time {
		font-family: var(--font-mono);
	}

	.excerpt {
		margin: 0;
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--text-muted);
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	article:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
		border-color: var(--accent-color);
	}

	article:hover h2 {
		color: var(--accent-color);
	}

	/* Tablet and up */
	@media (width >= 48ch) {
		article {
			gap: var(--space-6);
			padding: var(--space-8);
		}

		.post-content {
			gap: var(--space-6);
		}

		h2 {
			font-size: var(--font-size-xl);
		}
	}

	/* Desktop */
	@media (width >= 80ch) {
		h2 {
			font-size: var(--font-size-2xl);
		}

		.excerpt {
			font-size: var(--font-size-lg);
		}
	}
</style>

<article in:fade={{ duration: 500, easing: elasticOut }}>
	<a href="{base}/blog/{post.slug}">
		<div class="post-content">
			<h2>{post.title}</h2>
			<div class="metadata">
				<time datetime={post.published}>{formatPostDate(post.published)}</time>
			</div>
			<p class="excerpt">{post.description}</p>
		</div>
	</a>
</article>
