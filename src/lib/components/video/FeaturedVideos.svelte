<script lang="ts">
	import VideoCard from './VideoCard.svelte';
	import type { Video } from '$lib/types/video';

	const { videos } = $props<{ videos: Video[] }>();
</script>

<style>
	.featured-videos {
		container-type: inline-size;
		container-name: featured-videos;
		display: grid;
		gap: var(--space-4);
		grid-template-columns: 1fr;
	}

	h2 {
		margin: 0 0 var(--space-3) 0;
		font-size: var(--font-size-base);
		line-height: var(--line-height-tight);
		color: var(--text-color);
	}

	.video-grid {
		display: grid;
		gap: var(--space-3);
		grid-template-columns: 1fr;
	}

	@container featured-videos (width >= 30rem) {
		.featured-videos {
			grid-template-columns: repeat(2, 1fr);
			margin: var(--space-8) 0;
		}

		h2 {
			font-size: var(--font-size-lg);
		}

		.video-grid {
			gap: var(--space-4);
		}
	}

	@container featured-videos (width >= 50rem) {
		.featured-videos {
			grid-template-columns: repeat(3, 1fr);
		}

		.video-grid {
			grid-template-columns: repeat(auto-fit, minmax(var(--measure), 1fr));
			gap: var(--space-6);
		}
	}

	@container featured-videos (width >= 75rem) {
		.featured-videos {
			grid-template-columns: repeat(4, 1fr);
		}

		.video-grid {
			grid-template-columns: repeat(auto-fit, minmax(var(--measure), 1fr));
			gap: var(--space-8);
		}
	}
</style>

<section class="featured-videos">
	<h2>🎥 Featured Videos</h2>
	<div class="video-grid">
		{#each videos as video (video.embedId)}
			<VideoCard {video} />
		{/each}
	</div>
</section>
