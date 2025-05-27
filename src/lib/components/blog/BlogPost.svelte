<script lang="ts">
	import type { BlogPost } from '$lib/types/blog';
	import { generateSlug, formatPostDate } from '$lib/services/blog-service';

	const { post } = $props<{ post: BlogPost }>();
	const slug = generateSlug(post.title);
</script>

<style>
	.blog-post {
		display: flex;
		position: relative;
		padding: var(--space-4);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
		transform: translateY(0);
		flex-direction: column;
		gap: var(--space-2);
	}

	.blog-post:hover {
		background: var(--color-mix-light);
		box-shadow: var(--shadow-md);
		transform: translateY(calc(var(--space-2) * -1));
		border-color: var(--accent-color);
	}

	.title {
		margin: 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-tight);
		color: var(--text-color);
	}

	.description {
		display: -webkit-box;
		margin: 0;
		font-size: var(--font-size-base);
		line-height: var(--line-height-base);
		color: var(--text-muted);
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		line-clamp: 3;
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		font-size: var(--font-size-sm);
	}

	.date {
		font-family: var(--font-mono);
		color: var(--text-color);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.tags span {
		padding: var(--space-1) var(--space-2);
		color: var(--accent-color);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
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

<a href="/blog/{slug}" class="blog-post">
	<h3 class="title">{post.title}</h3>
	<p class="description">{post.description}</p>
	<div class="meta">
		<span class="date">{formatPostDate(post.published)}</span>
		<div class="tags">
			{#each post.categories as category, i (slug + '-' + category + '-' + i)}
				<span>{category}</span>
			{/each}
		</div>
	</div>
</a>
