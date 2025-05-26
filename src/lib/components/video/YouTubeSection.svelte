<script lang="ts">
	import { onMount } from 'svelte';

	const { channelUrl, videoId, videoTitle, sectionTitle, sectionSubtitle } = $props<{
		channelUrl: string;
		videoId: string;
		videoTitle: string;
		sectionTitle: string;
		sectionSubtitle: string;
	}>();

	// Add passive event listeners for touch events
	onMount(() => {
		const iframe = document.querySelector('.video-container iframe');
		if (iframe) {
			iframe.addEventListener('touchstart', () => {}, { passive: true });
			iframe.addEventListener('touchmove', () => {}, { passive: true });
		}
	});
</script>

<style>
	@media (prefers-reduced-motion: reduce) {
		.youtube-link {
			transition: none;
		}
	}

	/* Add forced-colors support */
	@media (forced-colors: active) {
		.youtube-section {
			border: 1px solid CanvasText;
		}

		.youtube-link {
			border: 1px solid CanvasText;
		}
	}
</style>

<section class="youtube-section">
	<div class="section-header">
		<h2>{sectionTitle}</h2>
		<p class="section-desc">{sectionSubtitle}</p>
	</div>

	<figure class="video-figure">
		<div class="video-container">
			<iframe
				src="https://www.youtube.com/embed/{videoId}"
				title={videoTitle}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				loading="lazy"
			></iframe>
		</div>
		<figcaption>{videoTitle}</figcaption>
	</figure>

	<a href={channelUrl} class="youtube-link" target="_blank" rel="noopener noreferrer">
		<span class="youtube-icon">▶</span>
		<span>Subscribe to my channel</span>
	</a>
</section>
