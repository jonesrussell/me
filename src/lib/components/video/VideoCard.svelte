<script lang="ts">
	import Box from '$lib/components/layout/Box.svelte';
	import type { Video } from '$lib/types';

	const { video } = $props<{ video: Video }>();
</script>

<Box>
	<div class="video-card">
		<div class="video-container">
			<iframe
				src={`https://www.youtube.com/embed/${video.embedId}`}
				title={video.title}
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				loading="lazy"
			></iframe>
		</div>
		<div class="video-info">
			<h3 class="video-title">{video.title}</h3>
			{#if video.date}
				<time class="video-date">{video.date}</time>
			{/if}
			<p class="description">{video.description}</p>
			<div class="topics">
				{#each video.topics as topic (topic)}
					<span class="topic">{topic}</span>
				{/each}
			</div>
		</div>
	</div>
</Box>

<style>
	.video-card {
		width: 100%;
		padding: var(--space-4);
	}

	.video-container {
		position: relative;
		height: 0;
		margin-bottom: var(--space-4);
		padding-bottom: 56.25%;
		background: var(--bg-darker);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.video-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	.video-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.video-title {
		margin: 0;
		font-size: var(--font-size-base);
		line-height: var(--line-height-tight);
		color: var(--text-color);
	}

	.video-date {
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.description {
		margin: var(--space-4) 0;
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
		color: var(--text-muted);
	}

	.topics {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-top: var(--space-4);
	}

	.topic {
		padding: var(--space-2) var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-muted);
		background: var(--bg-darker);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
	}

	.topic:hover {
		color: var(--text-color);
		background: color-mix(in srgb, var(--bg-darker) 80%, var(--accent-color));
	}

	@media (width >= 48ch) {
		.video-card {
			padding: var(--space-6);
		}

		.video-title {
			font-size: var(--font-size-lg);
		}

		.description {
			font-size: var(--font-size-base);
		}

		.topic {
			padding: var(--space-2) var(--space-4);
			font-size: var(--font-size-sm);
		}
	}
</style>
