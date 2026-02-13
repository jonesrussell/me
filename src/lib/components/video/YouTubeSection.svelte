<!--
 @component YouTubeSection
 A responsive YouTube video section component that displays an embedded video with error handling,
 loading states, and retry functionality.

 ## Props
 - `channelUrl`: The URL to the YouTube channel for the subscribe link
 - `videoId`: The YouTube video ID to embed
 - `videoTitle`: The title of the video for accessibility
 - `sectionTitle`: The main heading for the section
 - `sectionSubtitle`: The subtitle/description for the section

 ## Features
 - Responsive design with container queries
 - Error handling with retry functionality
 - Loading states with animated spinner
 - Accessibility support (ARIA labels, keyboard navigation)
 - Print-friendly styles
 - High contrast mode support
 - Reduced motion support

 ## Usage
 ```svelte
 <YouTubeSection
   channelUrl="https://youtube.com/@channel"
   videoId="dQw4w9WgXcQ"
   videoTitle="Never Gonna Give You Up"
   sectionTitle="Featured Video"
   sectionSubtitle="Check out my latest content"
 />
 ```
-->

<script lang="ts">
	import ErrorBoundary from '../ErrorBoundary.svelte';

	// Props interface
	interface Props {
		channelUrl: string;
		videoId: string;
		videoTitle: string;
		sectionTitle: string;
		sectionSubtitle: string;
	}

	let { channelUrl, videoId, videoTitle, sectionTitle, sectionSubtitle }: Props = $props();

	// State management
	let videoError = $state(false);
	let iframeLoaded = $state(false);
	let iframeElement = $state<HTMLIFrameElement | null>(null);
	let retryCount = $state(0);

	// Derived video URL with cache busting for retries
	let videoSrc = $derived(() => {
		const baseUrl = `https://www.youtube.com/embed/${videoId}`;
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const params = new URLSearchParams({
			autoplay: '0',
			rel: '0',
			modestbranding: '1'
		});

		// Add cache busting parameter for retries
		if (retryCount > 0) {
			params.set('t', Date.now().toString());
		}

		return `${baseUrl}?${params.toString()}`;
	});

	// Set up iframe event listeners when element changes
	$effect(() => {
		if (!iframeElement) return;

		// Handle iframe load events
		function handleLoad() {
			iframeLoaded = true;
			videoError = false;
		}

		function handleError() {
			videoError = true;
			iframeLoaded = false;
		}

		// Add passive touch event listeners for better mobile performance
		function handleTouchStart() {}
		function handleTouchMove() {}

		iframeElement.addEventListener('load', handleLoad);
		iframeElement.addEventListener('error', handleError);
		iframeElement.addEventListener('touchstart', handleTouchStart, { passive: true });
		iframeElement.addEventListener('touchmove', handleTouchMove, { passive: true });

		// Cleanup function
		return () => {
			if (iframeElement) {
				iframeElement.removeEventListener('load', handleLoad);
				iframeElement.removeEventListener('error', handleError);
				iframeElement.removeEventListener('touchstart', handleTouchStart);
				iframeElement.removeEventListener('touchmove', handleTouchMove);
			}
		};
	});

	function handleRetry() {
		videoError = false;
		iframeLoaded = false;
		retryCount++;

		// Force iframe reload by clearing and resetting src
		if (iframeElement) {
			iframeElement.src = '';
			// Use a small delay to ensure the browser processes the clear
			setTimeout(() => {
				if (iframeElement) {
					iframeElement.src = videoSrc();
				}
			}, 100);
		}
	}

</script>

<style>
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	/* Responsive design */
	@container (max-width: 30rem) {
		.youtube-section {
			padding: var(--space-4);
		}

		.section-header h2 {
			font-size: var(--font-size-lg);
		}
	}

	@container (min-width: 50rem) {
		.youtube-section {
			padding: var(--space-12);
		}

		.section-header h2 {
			font-size: var(--font-size-2xl);
		}
	}

	/* Accessibility and performance */
	@media (prefers-reduced-motion: reduce) {
		.youtube-section .youtube-link,
		.video-retry-button {
			transition: none;
		}

		.loading-spinner {
			animation: none;
		}

		.youtube-section .youtube-link:hover {
			transform: none;
		}
	}

	/* High contrast mode support */
	@media (forced-colors: active) {
		.youtube-section {
			border: 0.0625rem solid CanvasText;
		}

		.youtube-section .youtube-link {
			border: 0.0625rem solid CanvasText;
		}

		.video-container {
			border: 0.0625rem solid CanvasText;
		}
	}

	/* Print styles */
	@media print {
		.youtube-section {
			break-inside: avoid;
			box-shadow: none;
		}

		.video-container::after {
			display: block;
			padding: var(--space-4);
			text-align: center;
			background: var(--bg-lighter);
			border: var(--border-width) solid var(--border-color);
			content: 'Video: ' attr(title);
		}

		.youtube-section .youtube-link::after {
			content: ' (' attr(href) ')';
		}
	}

	.youtube-section {
		container-type: inline-size;
		display: flex;
		padding: var(--space-8);
		background: var(--bg-color);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		flex-direction: column;
		gap: var(--space-6);
	}

	.section-header {
		text-align: center;
	}

	.section-header h2 {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-xl);
		color: var(--text-color);
	}

	.section-desc {
		margin: 0;
		font-size: var(--font-size-base);
		color: var(--text-muted);
	}

	.video-figure {
		display: flex;
		margin: 0;
		flex-direction: column;
		gap: var(--space-3);
	}

	.video-container {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		background: var(--bg-darker);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.video-container iframe {
		width: 100%;
		height: 100%;
		border: none;
	}

	.video-loading {
		display: flex;
		position: absolute;
		color: var(--text-muted);
		background: var(--bg-darker);
		inset: 0;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-3);
	}

	.loading-spinner {
		width: 2rem;
		height: 2rem;
		border: 0.125rem solid var(--border-color);
		border-top: 0.125rem solid var(--accent-color);
		border-radius: var(--radius-full);
		animation: spin 1s linear infinite;
	}

	.loading-text {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
	}

	.video-error {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background: var(--bg-darker);
		border-radius: var(--radius-md);
	}

	.video-error-content {
		padding: var(--space-4);
		text-align: center;
	}

	.video-error-icon {
		margin-bottom: var(--space-2);
		font-size: var(--font-size-2xl);
		color: var(--text-muted);
		opacity: 0.6;
	}

	.video-error-message {
		margin: 0 0 var(--space-3) 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.video-retry-button {
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--accent-color);
		background: none;
		border: var(--border-width) solid var(--accent-color);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: all var(--transition-duration) var(--transition-timing);
	}

	.video-retry-button:hover {
		color: var(--bg-color);
		background: var(--accent-color);
	}

	.video-retry-button:focus {
		outline: none;
		box-shadow: 0 0 0 var(--space-1) var(--accent-color-transparent);
	}

	.video-caption {
		font-size: var(--font-size-sm);
		text-align: center;
		color: var(--text-muted);
		font-style: italic;
	}

	/* Scoped to .youtube-section for higher specificity over surface.css .youtube-link */
	.youtube-section .youtube-link {
		display: flex;
		flex-shrink: 0;
		min-width: min-content;
		padding: var(--space-3) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		text-decoration: none;
		color: var(--accent-color);
		background: transparent;
		border: var(--border-width) solid var(--accent-color);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		align-self: center;
	}

	.youtube-section .youtube-link .youtube-link-text,
	.youtube-section .youtube-link .youtube-icon {
		color: var(--accent-color);
	}

	.youtube-section .youtube-link .youtube-link-text {
		overflow: visible;
		white-space: nowrap;
	}

	.youtube-section .youtube-link:hover :where(.youtube-link-text),
	.youtube-section .youtube-link:hover :where(.youtube-icon) {
		color: var(--bg-color);
	}

	.youtube-section .youtube-link:hover {
		color: var(--bg-color);
		background: var(--accent-color);
		transform: translateY(-0.125rem);
	}

	.youtube-section .youtube-link:focus {
		outline: none;
		box-shadow: 0 0 0 var(--space-1) var(--accent-color-transparent);
	}

	.youtube-icon {
		font-size: var(--font-size-base);
	}
</style>

<ErrorBoundary fallback="Video section temporarily unavailable" component="YouTubeSection">
	<section class="youtube-section">
		<div class="section-header">
			<h2>{sectionTitle}</h2>
			<p class="section-desc">{sectionSubtitle}</p>
		</div>

		<figure class="video-figure">
			<div class="video-container">
				{#if videoError}
					<div class="video-error" role="alert">
						<div class="video-error-content">
							<div class="video-error-icon" aria-hidden="true">▶</div>
							<p class="video-error-message">Video unavailable</p>
							<button
								class="video-retry-button"
								onclick={handleRetry}
								type="button"
								aria-label="Retry loading video"
							>
								Try again
							</button>
						</div>
					</div>
				{:else}
					<iframe
						bind:this={iframeElement}
						src={videoSrc()}
						title={videoTitle}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
						loading="lazy"
						referrerpolicy="strict-origin-when-cross-origin"
					></iframe>

					{#if !iframeLoaded}
						<div class="video-loading" aria-label="Loading video">
							<div class="loading-spinner"></div>
							<p class="loading-text">Loading video...</p>
						</div>
					{/if}
				{/if}
			</div>
			<figcaption class="video-caption">{videoTitle}</figcaption>
		</figure>

		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<a
			href={channelUrl}
			class="youtube-link"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Subscribe to my YouTube channel (opens in new tab)"
		>
			<span class="youtube-icon" aria-hidden="true">▶</span>
			<span class="youtube-link-text">Subscribe to my channel</span>
		</a>
	</section>
</ErrorBoundary>
