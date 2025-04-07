<script lang="ts">
	import Box from '$lib/components/layout/Box.svelte';
	import { formatDate } from '$services/blog-service';

	const { post } = $props<{
		post: {
			title: string;
			link: string;
			published: string;
			description: string;
		};
	}>();
</script>

<Box width={80}>
	<article class="post">
		<div class="post-header">
			<h2>
				<a href={post.link} target="_blank" rel="noopener noreferrer">
					{post.title}
				</a>
			</h2>
			<time>{formatDate(post.published)}</time>
		</div>
		<div class="post-content">
			<p class="description">{post.description}</p>
		</div>
		<div class="post-footer">
			<a
				href={post.link}
				target="_blank"
				rel="noopener noreferrer"
				class="url-preview"
			>
				<span class="url-icon">→</span>
				<span class="url-text">Read article</span>
			</a>
		</div>
	</article>
</Box>

<style>
	.post {
		display: grid;
		gap: var(--space-4);
		padding: var(--space-4);
		background: var(--bg-darker);
		border-radius: var(--radius-md);
		transition: transform var(--transition-duration) var(--transition-timing);
	}

	.post:hover {
		transform: translateY(-0.25ch);
	}

	.post-header {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
		align-items: baseline;
		justify-content: space-between;
	}

	.post-header h2 {
		margin: 0;
		font-size: var(--font-size-lg);
		line-height: var(--line-height-tight);
	}

	.post-header a {
		text-decoration: none;
		color: var(--text-color);
		transition: color var(--transition-duration) var(--transition-timing);
	}

	.post-header a:hover {
		color: var(--accent-color);
	}

	time {
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		white-space: nowrap;
	}

	.post-content {
		margin: var(--space-4) 0;
	}

	.description {
		display: -webkit-box;
		margin: 0;
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--text-color);
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.post-footer {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: var(--space-2);
	}

	.url-preview {
		display: flex;
		width: fit-content;
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		text-decoration: none;
		color: var(--text-muted);
		background: var(--bg-color);
		border-radius: var(--radius-sm);
		transition: all var(--transition-duration) var(--transition-timing);
		gap: var(--space-2);
		align-items: center;
	}

	.url-preview:hover {
		color: var(--text-color);
		background: color-mix(in srgb, var(--bg-color) 80%, var(--accent-color));
	}

	.url-icon {
		color: var(--accent-color);
		transition: transform var(--transition-duration) var(--transition-timing);
	}

	.url-preview:hover .url-icon {
		transform: translateX(0.25ch);
	}

	@media (prefers-reduced-motion: reduce) {
		.post,
		.url-preview,
		.url-icon {
			transition: none;
		}
	}
</style>
