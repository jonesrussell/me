<script lang="ts">
	import VideoCard from './VideoCard.svelte';
	import type { Video } from '$lib/types/video';

	const { videos } = $props<{ videos: Video[] }>();
</script>

<style>
	h2 {
		margin: var(--space-8) 0 var(--space-4) 0;
		font-size: var(--font-size-lg);
		line-height: var(--line-height-tight);
		color: var(--text-color);
	}

	.video-grid {
		display: grid;
		gap: var(--space-4);
		width: 100%;
		max-width: 160ch;
		margin: 0 auto;
	}

	@media (min-width: 50rem) {
		.video-grid {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 30rem), 1fr));
		}
	}

	@media (min-width: 80ch) {
		h2 {
			margin: var(--space-12) 0 var(--space-6) 0;
			font-size: var(--font-size-xl);
		}

		.video-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--space-8);
		}
	}
</style>

<section aria-labelledby="video-grid-title" aria-label="Video grid">
	<h2 id="video-grid-title">Featured Videos</h2>
	<div class="video-grid">
		{#each videos as video (video.embedId)}
			<VideoCard {video} />
		{/each}
	</div>
</section>
