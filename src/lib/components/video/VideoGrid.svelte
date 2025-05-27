<script lang="ts">
	import VideoCard from './VideoCard.svelte';
	import type { Video } from '$lib/types/video';

	const { videos } = $props<{ videos: Video[] }>();
</script>

<style>
	.video-grid {
		container-type: inline-size;
		container-name: video-grid;
		display: grid;
		gap: var(--space-4);
		grid-template-columns: 1fr;
		width: 100%;
	}

	@container video-grid (width >= 30rem) {
		.video-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@container video-grid (width >= 50rem) {
		.video-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@container video-grid (width >= 75rem) {
		.video-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>

<div class="video-grid">
	{#each videos as video (video.embedId)}
		<VideoCard {video} />
	{/each}
</div>
