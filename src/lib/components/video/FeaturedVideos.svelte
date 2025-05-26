<script lang="ts">
	import VideoCard from './VideoCard.svelte';
	import type { Video } from '$lib/types';

	const { videos } = $props<{ videos: Video[] }>();
</script>

<style>
	.featured-videos {
		margin: var(--space-6) 0;
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
	}

	@media (width >= 30rem) {
		.featured-videos {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 30rem), 1fr));
		}
	}

	@media (width >= 50rem) {
		.featured-videos {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 40rem), 1fr));
		}
	}

	@media (width >= 75rem) {
		.featured-videos {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 50rem), 1fr));
		}
	}

	@media (width >= 48rem) {
		.featured-videos {
			margin: var(--space-8) 0;
		}

		h2 {
			font-size: var(--font-size-lg);
		}

		.video-grid {
			gap: var(--space-4);
		}
	}

	@media (width >= 80rem) {
		.video-grid {
			grid-template-columns: repeat(auto-fit, minmax(45rem, 1fr));
			gap: var(--space-6);
		}
	}

	@media (width >= 120rem) {
		.video-grid {
			grid-template-columns: repeat(auto-fit, minmax(50rem, 1fr));
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
