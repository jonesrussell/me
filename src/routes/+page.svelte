<script lang="ts">
	import { alignToGrid } from '$lib/utils/grid';
	const width = alignToGrid(80);

	// YouTube channel and video info
	const youtubeChannel = {
		url: 'https://www.youtube.com/@fullstackdev42',
		name: 'Web Developer Jones'
	} as const;

	const featuredVideo = {
		id: 'B4v7ZDLxiS4',
		url: 'https://youtu.be/B4v7ZDLxiS4',
		embedUrl: `https://www.youtube.com/embed/B4v7ZDLxiS4`
	} as const;
</script>

<section class="home">
	<h1>Hey, I'm Web Developer Jones.</h1>

	<div class="tagline">
		I help build amazing web applications and contribute to open source.
	</div>

	<div class="intro">
		I'm a Full Stack Developer from Canada 🇨🇦 specializing in:

		<div class="skills">
			<div class="skill-group">
				<div class="skill">Modern JavaScript/TS</div>
				<div class="skill">PHP (Laravel, Drupal)</div>
				<div class="skill">Go Development 🐹</div>
			</div>
			<div class="skill-group">
				<div class="skill">Vue & Svelte</div>
				<div class="skill">DevOps & Docker</div>
				<div class="skill">Open Source</div>
			</div>
		</div>

		<!-- Added YouTube channel section -->
		<div class="youtube-section">
			<div class="youtube-banner">
				📺 Check out my developer tutorials on YouTube
			</div>

			<figure class="video-figure">
				<div class="video-container">
					<iframe
						src={featuredVideo.embedUrl}
						title="Featured YouTube video"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
						loading="lazy"
					></iframe>
				</div>
				<figcaption>Add a Google Font to Tailwind CSS | 2023</figcaption>
			</figure>

			<a
				href={youtubeChannel.url}
				class="youtube-link"
				target="_blank"
				rel="noopener noreferrer"
			>
				Subscribe to my channel: youtube.com/@fullstackdev42
			</a>
		</div>

		<nav class="navigation">
			<a href="/blog">Read my technical articles</a>
			<a href="/projects">Browse my open source projects</a>
			<a href="/contact">Get in touch</a>
		</nav>
	</div>
</section>

<style>
	.home {
		max-width: min(var(--measure), 95vw);
		margin: 0 auto;
		padding: var(--ch4) var(--ch2);
	}

	h1 {
		font-size: 2em;
		line-height: 1.2;
		margin: 0;
	}

	.tagline {
		color: var(--text-muted);
		margin: var(--ch2) 0;
	}

	.intro {
		margin: var(--ch3) 0;
	}

	.skills {
		margin: var(--ch2) 0;
		display: grid;
		gap: var(--ch2);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 30ch), 1fr));
	}

	.skill-group {
		display: flex;
		flex-direction: column;
		gap: var(--ch);
	}

	.skill {
		padding: var(--ch);
		border: 1px solid var(--border-color);
		border-radius: 2px;
		background: color-mix(in srgb, var(--text-color) 5%, transparent);
	}

	.navigation {
		margin-top: var(--ch3);
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
	}

	.navigation a {
		color: var(--link-color);
		text-decoration: none;
	}

	.navigation a:hover {
		text-decoration: underline;
	}

	@media (min-width: 600px) {
		.navigation {
			flex-direction: row;
			gap: var(--ch4);
		}
	}

	.youtube-section {
		margin: var(--ch3) 0;
		padding: var(--ch2);
		border: 1px solid var(--border-color);
		border-radius: 2px;
		background: color-mix(in srgb, var(--text-color) 3%, transparent);

		/* Using CSS Container Query for responsive layout */
		container-type: inline-size;
	}

	.youtube-banner {
		font-weight: bold;
		margin-bottom: var(--ch);
	}

	.youtube-link {
		color: var(--link-color);
		text-decoration: none;
		display: inline-block;
		padding: var(--ch) 0;
		position: relative;
	}

	.youtube-link:hover {
		text-decoration: underline;
	}

	.video-container {
		position: relative;
		width: 100%;
		/* 16:9 aspect ratio */
		padding-bottom: 56.25%;
		margin: var(--ch2) 0;
		background: color-mix(in srgb, var(--text-color) 10%, transparent);
	}

	.video-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: none;
	}

	/* Using modern CSS @container query */
	@container (min-width: 60ch) {
		.youtube-section {
			display: grid;
			gap: var(--ch2);
		}

		.youtube-banner {
			text-align: center;
		}

		.youtube-link {
			text-align: center;
		}
	}

	/* Ensure proper spacing on smaller screens */
	@container (max-width: 60ch) {
		.video-container {
			margin-left: calc(-1 * var(--ch));
			margin-right: calc(-1 * var(--ch));
			width: calc(100% + 2 * var(--ch));
		}
	}

	.video-figure {
		margin: var(--ch2) 0;
		/* Remove margin-bottom since figcaption will add spacing */
		margin-bottom: 0;
	}

	figcaption {
		color: var(--text-muted);
		font-size: 0.9em;
		padding: var(--ch) 0;
		text-align: center;
		/* Add subtle separator */
		border-top: 1px solid var(--border-color);
		margin-top: var(--ch);
	}
</style>
