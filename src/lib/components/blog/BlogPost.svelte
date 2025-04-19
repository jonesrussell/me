<script lang="ts">
	import { fade } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import { formatPostDate } from '$lib/services/blog-service';

	export let post: {
		title: string;
		link: string;
		published: string;
		description: string;
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
		gap: var(--space-6);
		width: 100%;
		padding: var(--space-8);
		border-radius: var(--radius-lg);
		background: var(--surface-color);
		border: var(--border-width) solid var(--border-color);
		box-shadow: var(--shadow-sm);
		transition:
			transform var(--transition-duration) var(--transition-timing),
			box-shadow var(--transition-duration) var(--transition-timing),
			border-color var(--transition-duration) var(--transition-timing);
	}

	article:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
		border-color: var(--accent-color);
	}

	.post-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	h2 {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-tight);
		color: var(--text-color);
		transition: color var(--transition-duration) var(--transition-timing);
	}

	article:hover h2 {
		color: var(--accent-color);
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

	@container blog-page (width >= 48ch) {
		article {
			padding: var(--space-10);
		}

		h2 {
			font-size: var(--font-size-2xl);
		}

		.excerpt {
			font-size: var(--font-size-lg);
		}
	}
</style>

<article in:fade={{ duration: 500, easing: elasticOut }}>
	<a href={post.link} target="_blank" rel="noopener noreferrer">
		<div class="post-content">
			<h2>{post.title}</h2>
			<div class="metadata">
				<time datetime={post.published}>{formatPostDate(post.published)}</time>
			</div>
			<p class="excerpt">{getSummary(post.description)}</p>
		</div>
	</a>
</article>
