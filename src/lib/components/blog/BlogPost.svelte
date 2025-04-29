<script lang="ts">
	import type { BlogPost } from '$lib/types/blog';
	import { generateSlug } from '$lib/services/blog-service';

	const { post } = $props<{ post: BlogPost }>();
	const slug = generateSlug(post.title);
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
		color: var(--accent-color);
		background: var(--bg-darker);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
		border: var(--border-width) solid var(--border-color);
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
		<span class="date">{post.pubDate}</span>
		<div class="tags">
			{#each post.categories as category}
				<span>{category}</span>
			{/each}
		</div>
	</div>
</a>
