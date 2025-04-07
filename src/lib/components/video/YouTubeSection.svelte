<script lang="ts">
	const { channelUrl, videoId, videoTitle } = $props<{
		channelUrl: string;
		videoId: string;
		videoTitle: string;
	}>();
</script>

<style>
	@media (prefers-reduced-motion: reduce) {
		.youtube-link {
			transition: none;
		}
	}
</style>

<section class="youtube-section">
	<div class="section-header">
		<h2>Check out my YouTube channel</h2>
		<p class="section-desc">I create content about web development, programming, and tech.</p>
	</div>

	<figure class="video-figure">
		<div class="video-container">
			<iframe
				src="https://www.youtube.com/embed/{videoId}"
				title={videoTitle}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
		<figcaption>{videoTitle}</figcaption>
	</figure>

	<a href={channelUrl} class="youtube-link" target="_blank" rel="noopener noreferrer">
		<span class="youtube-icon">▶</span>
		<span>Subscribe to my channel</span>
	</a>
</section>
