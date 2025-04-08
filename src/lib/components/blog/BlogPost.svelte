<script lang="ts">
	import Box from '$lib/components/layout/Box.svelte';
	import { formatPostDate } from '$lib/services/blog-service';

	const { post } = $props<{
		post: {
			title: string;
			link: string;
			published: string;
			description: string;
		};
	}>();

	const formattedDate = $derived(formatPostDate(post.published));
</script>

<style>
	@layer components {
		.post {
			display: grid;
			gap: var(--space-4);
			padding: var(--space-4);
			background: var(--bg-darker);
			border-radius: var(--radius-md);
			container-type: inline-size;
			container-name: post;

			&:hover {
				transform: translateY(-0.25ch);
			}

			@container post (width > 40ch) {
				grid-template-columns: 1fr auto;
			}
		}

		.header {
			display: flex;
			flex-wrap: wrap;
			gap: var(--space-4);
			align-items: baseline;
			justify-content: space-between;

			h2 {
				margin: 0;
				font-size: var(--font-size-lg);
				line-height: var(--line-height-tight);
			}

			a {
				text-decoration: none;
				color: var(--text-color);
				transition: color var(--transition-duration) var(--transition-timing);

				&:hover {
					color: var(--accent-color);
				}
			}
		}

		time {
			font-size: var(--font-size-sm);
			color: var(--text-muted);
			white-space: nowrap;
		}

		.content {
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

		.footer {
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

			&:hover {
				color: var(--text-color);
				background: color-mix(in srgb, var(--bg-color) 80%, var(--accent-color));

				.icon {
					transform: translateX(0.25ch);
				}
			}

			.icon {
				color: var(--accent-color);
				transition: transform var(--transition-duration) var(--transition-timing);
			}
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.post,
		.url-preview,
		.icon {
			transition: none;
		}
	}
</style>

<Box width={80}>
	<article class="post">
		<div class="header">
			<h2>
				<a href={post.link} target="_blank" rel="noopener noreferrer">
					{post.title}
				</a>
			</h2>
			<time>{formattedDate}</time>
		</div>
		<div class="content">
			<p class="description">{post.description}</p>
		</div>
		<div class="footer">
			<a href={post.link} target="_blank" rel="noopener noreferrer" class="url-preview">
				<span class="icon">→</span>
				<span class="text">Read article</span>
			</a>
		</div>
	</article>
</Box>
