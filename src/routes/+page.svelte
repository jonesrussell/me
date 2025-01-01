<script lang="ts">
	import Terminal from '$lib/components/Terminal.svelte';
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
			description: 'Building the future with cutting-edge web technologies',
			icon: '⚡'
		},
		{
			title: 'Golang & PHP',
			description:
				'Crafting robust backend solutions with battle-tested technologies',
			icon: '🔧'
		},
		{
			title: 'AI Integration',
			description:
				'Harnessing artificial intelligence to solve complex problems',
			icon: '🤖'
		},
		{
			title: 'Cloud & DevOps',
			description: 'Designing and automating scalable cloud-native solutions',
			icon: '☁️'
		}
	];
</script>

<svelte:head>
	<title>Russell Jones | Limitless Developer</title>
	<meta
		name="description"
		content="Limitless Developer from Canada specializing in JavaScript, Go, Cloud Technologies, and Open Source. Building elegant solutions with modern web technologies."
	/>
</svelte:head>

<section class="hero">
	<div class="hero-content">
		<Terminal />
	</div>
</section>

<section class="home">
	<div class="specialties">
		{#each specialties as specialty}
			<div class="specialty">
				<div class="specialty-icon">{specialty.icon}</div>
				<div class="specialty-content">
					<div class="specialty-title">{specialty.title}</div>
					<div class="specialty-desc">{specialty.description}</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Added YouTube channel section -->
	<div class="youtube-section">
		<div class="section-header">
			<h2>Developer Tutorials</h2>
			<p class="section-desc">
				Learn web development tips and tricks on my YouTube channel
			</p>
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
			<span class="youtube-icon">▶</span>
			Subscribe to my channel
		</a>
	</div>

	<nav class="navigation">
		<a href="/blog" class="nav-link">
			<span class="nav-icon">📝</span>
			Read my technical articles
		</a>
		<a href="/projects" class="nav-link">
			<span class="nav-icon">🚀</span>
			Browse my open source projects
		</a>
		<a href="/contact" class="nav-link">
			<span class="nav-icon">✉️</span>
			Get in touch
		</a>
	</nav>
</section>

<style>
	.hero {
		position: relative;
		padding: var(--ch4) var(--ch2);
		background: var(--bg-darker);
	}

	.hero-content {
		max-width: min(var(--measure), 95cqi);
		margin-inline: auto;
	}

	.home {
		max-width: min(var(--measure), 95cqi);
		margin-inline: auto;
		padding: 0 var(--ch2) var(--ch4);
	}

	.specialties {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 35ch), 1fr));
		gap: var(--ch2);
		margin: var(--ch4) 0;
	}

	.specialty {
		padding: var(--ch3);
		border: 1px solid var(--border-color);
		background: var(--bg-darker);
		transition: all 0.3s ease;
		display: flex;
		gap: var(--ch2);
		align-items: flex-start;

		&:hover {
			transform: translateY(-2px);
			border-color: var(--accent-color);
			box-shadow: 0 4px 12px
				color-mix(in srgb, var(--text-color) 10%, transparent);
		}
	}

	.specialty-icon {
		font-size: 1.5em;
		line-height: 1;
		padding: var(--ch);
		background: color-mix(in srgb, var(--accent-color) 10%, transparent);
		border-radius: 8px;
	}

	.specialty-content {
		flex: 1;
	}

	.specialty-title {
		font-weight: bold;
		margin-bottom: var(--ch);
		color: var(--accent-color);
	}

	.specialty-desc {
		color: var(--text-muted);
		line-height: 1.4;
	}

	.navigation {
		margin: var(--ch4) 0;
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
	}

	.nav-link {
		color: var(--link-color);
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: var(--ch2);
		padding: var(--ch2);
		border: 1px solid var(--border-color);
		border-radius: 4px;
		transition: all 0.2s ease;

		&:hover {
			background: color-mix(in srgb, var(--text-color) 5%, transparent);
			border-color: var(--accent-color);
			transform: translateX(var(--ch));
		}
	}

	.nav-icon {
		font-size: 1.2em;
	}

	@media (min-width: 600px) {
		.navigation {
			flex-direction: row;
			gap: var(--ch2);
		}

		.nav-link {
			flex: 1;
			justify-content: center;

			&:hover {
				transform: translateY(-2px);
			}
		}
	}

	.youtube-section {
		margin: var(--ch4) 0;
		padding: var(--ch3);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		background: color-mix(in srgb, var(--text-color) 3%, transparent);
		container-type: inline-size;
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--ch3);
	}

	h2 {
		font-size: 1.5em;
		margin: 0 0 var(--ch) 0;
		color: var(--accent-color);
	}

	.section-desc {
		color: var(--text-muted);
		margin: 0;
	}

	.youtube-link {
		color: var(--link-color);
		text-decoration: none;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--ch);
		padding: var(--ch2);
		margin-top: var(--ch2);
		border: 1px solid var(--border-color);
		border-radius: 4px;
		transition: all 0.2s ease;

		&:hover {
			background: color-mix(in srgb, var(--text-color) 5%, transparent);
			border-color: var(--accent-color);
		}
	}

	.youtube-icon {
		color: #ff0000;
		font-size: 1.2em;
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
