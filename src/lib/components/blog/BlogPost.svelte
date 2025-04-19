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
		max-width: min(var(--measure), 95cqi);
		margin: 0 auto;
		padding: var(--space-8);
		border-radius: var(--radius-lg);
		background: var(--surface-color);
		box-shadow: var(--shadow-sm);
		transition:
			transform var(--transition-duration) var(--transition-timing),
			box-shadow var(--transition-duration) var(--transition-timing);
	}

	article:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.post-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	h2 {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-tight);
		color: var(--text-color);
	}

	.metadata {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.excerpt {
		margin: 0;
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--text-muted);
	}

	a {
		text-decoration: none;
		color: inherit;
	}
</style>

<article in:fade={{ duration: 500, easing: elasticOut }}>
	<div class="post-content">
		<h2>
			<a href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</a>
		</h2>
		<div class="metadata">
			<time datetime={post.published}>{formatPostDate(post.published)}</time>
		</div>
		<p class="excerpt">{post.description}</p>
	</div>
</article>
