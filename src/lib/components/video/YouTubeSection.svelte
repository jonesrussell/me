<script lang="ts">
	const { channelUrl, videoId, videoTitle, sectionTitle, sectionSubtitle } = $props<{
		channelUrl: string;
		videoId: string;
		videoTitle: string;
		sectionTitle: string;
		sectionSubtitle: string;
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
			></iframe>
		</div>
		<figcaption>{videoTitle}</figcaption>
	</figure>

	<a href={channelUrl} class="youtube-link" target="_blank" rel="noopener noreferrer">
		<span class="youtube-icon">▶</span>
		<span>Subscribe to my channel</span>
	</a>
</section>
