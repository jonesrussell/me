<script lang="ts">
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

	const specialties = [
		{
			title: 'Modern JavaScript/TS',
			description: 'Building the future with cutting-edge web technologies'
		},
		{
			title: 'Golang & PHP',
			description:
				'Crafting robust backend solutions with battle-tested technologies'
		},
		{
			title: 'AI Integration',
			description:
				'Harnessing artificial intelligence to solve complex problems'
		},
		{
			title: 'Cloud & DevOps',
			description: 'Designing and automating scalable cloud-native solutions'
		}
	];
</script>

<svelte:head>
	<title>Russell Jones | Web Developer</title>
	<meta
		name="description"
		content="Developer from Canada specializing in JavaScript, Go, and Open Source"
	/>
</svelte:head>

<section class="home">
	<div class="intro">
		Transforming ideas into elegant solutions, one line of code at a time.
	</div>

	<div class="tagline">
		Developer crafting high-performance applications and pushing the boundaries
		of what's possible on the web.
	</div>

	<div class="specialties">
		{#each specialties as specialty}
			<div class="specialty">
				<div class="specialty-title">{specialty.title}</div>
				<div class="specialty-desc">{specialty.description}</div>
			</div>
		{/each}
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
</section>

<style>
	.home {
		max-width: min(var(--measure), 95cqi);
		margin-inline: auto;
		padding: var(--ch4) var(--ch2);
	}

	.intro {
		font-size: 2em;
		line-height: 1.2;
		font-weight: bold;
		margin-bottom: var(--ch2);
		color: var(--accent-color);
	}

	.tagline {
		color: var(--text-muted);
		font-size: 1.2em;
		margin-bottom: var(--ch4);
		max-width: 60ch;
	}

	.specialties {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 35ch), 1fr));
		gap: var(--ch2);
		margin-top: var(--ch4);
	}

	.specialty {
		padding: var(--ch2);
		border: 1px solid var(--border-color);
		background: var(--bg-darker);
		transition: transform 0.2s ease;

		&:hover {
			transform: translateY(-2px);
		}
	}

	.specialty-title {
		font-weight: bold;
		margin-bottom: var(--ch);
	}

	.specialty-desc {
		color: var(--text-muted);
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
