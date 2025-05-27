<script lang="ts">
	import Box from '$lib/components/ui/Box.svelte';
	import type { Video } from '$lib/types/video';

	const { video } = $props<{ video: Video }>();
</script>

<style>
	.video-card {
		container-type: inline-size;
		container-name: video-card;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding: var(--space-4);
		background: var(--color-surface-2);
		border-radius: var(--radius-2);
	}

	.video-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.video-title {
		font-size: var(--font-size-3);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-1);
	}

	.description {
		font-size: var(--font-size-2);
		color: var(--color-text-2);
		max-width: var(--measure);
	}

	.video-container {
		width: 100%;
		background: var(--color-surface-3);
		border-radius: var(--radius-1);
		aspect-ratio: 16/9;
		overflow: hidden;
	}

	iframe {
		width: 100%;
		height: 100%;
		border: 0;
	}

	@container video-card (width >= 30rem) {
		.video-card {
			flex-direction: row;
			align-items: center;
			gap: var(--space-4);
		}

		.video-container {
			width: 40%;
		}
	}

	@container video-card (width >= 50rem) {
		.video-card {
			padding: var(--space-6);
		}

		.video-container {
			width: 30%;
		}
	}
</style>

<Box width={40}>
	<article class="video-card">
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
	</article>
</Box>
