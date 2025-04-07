<script lang="ts">
	import VideoCard from './VideoCard.svelte';
	import type { Video } from '$lib/types';

	const { videos } = $props<{ videos: Video[] }>();
</script>

<section>
	<h2>Creative Storytelling</h2>
	<div class="video-grid">
		{#each videos as video (video.title)}
			<VideoCard {video} />
		{/each}
	</div>
</section>

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
	}

	@media (width >= 48ch) {
		h2 {
			margin: var(--space-12) 0 var(--space-6) 0;
			font-size: var(--font-size-xl);
		}

		.video-grid {
			gap: var(--space-6);
		}
	}

	@media (width >= 80ch) {
		.video-grid {
			grid-template-columns: repeat(auto-fit, minmax(50ch, 1fr));
			gap: var(--space-8);
		}
	}
</style>
