<script lang="ts">
	import type { BlogPost } from '$lib/types/blog';
	import Tag from '$lib/components/ui/Tag.svelte';

	const { post } = $props<{ post: BlogPost }>();
</script>

<style>
	.blog-post {
		container-type: inline-size;
		container-name: blog-post;
		display: flex;
		position: relative;
		height: 100%;
		padding: var(--space-6);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
		transform: translateY(0);
		flex-direction: column;
		gap: var(--space-4);
	}

	.blog-post:hover {
		background: var(--color-mix-light);
		box-shadow: var(--shadow-md);
		transform: translateY(calc(var(--space-2) * -1));
		border-color: var(--accent-color);
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		flex: 1;
	}

	.title {
		margin: 0;
		font-size: var(--font-size-xl);
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
		flex: 1;
	}

	.meta {
		display: flex;
		margin-top: auto;
		font-size: var(--font-size-sm);
		flex-direction: column;
		gap: var(--space-3);
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

	@media (prefers-reduced-motion: reduce) {
		.blog-post {
			transition: none;
		}

		.blog-post:hover {
			transform: none;
		}
	}

	@container blog-post (min-width: 640px) {
		.blog-post {
			padding: var(--space-8);
		}

		.title {
			font-size: var(--font-size-2xl);
		}
	}
</style>

<a href="/blog/{post.slug}" data-sveltekit-preload-data="off" class="blog-post">
	<div class="content">
		<h3 class="title">{post.title}</h3>
		<p class="description">{post.description}</p>
		<div class="meta">
			<span class="date">{post.formattedDate}</span>
			<div class="tags">
				{#each post.categories as category, i (post.slug + '-' + category + '-' + i)}
					<Tag>{category}</Tag>
				{/each}
			</div>
		</div>
	</div>
</a>
