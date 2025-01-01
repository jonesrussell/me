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
		min-height: 80vh;
		display: grid;
		place-items: center;
		padding: var(--ch4) var(--ch2);
		background: radial-gradient(
			circle at 50% 50%,
			color-mix(in srgb, var(--accent-color) 2%, transparent),
			color-mix(in srgb, var(--bg-color) 98%, transparent) 100%
		);
	}

	.hero-content {
		width: 100%;
		max-width: 80ch;
		margin: 0 auto;
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
		border-radius: var(--radius-md);
		transition: all 0.3s ease;
		display: flex;
		gap: var(--ch2);
		align-items: flex-start;

		&:hover {
			transform: translateY(-2px);
			border-color: var(--accent-color);
			box-shadow: var(--shadow-lg);
		}
	}

	.specialty-icon {
		font-size: var(--font-size-xl);
		line-height: var(--line-height-base);
		padding: var(--ch);
		background: var(--color-mix-light);
		border-radius: var(--radius-md);
	}

	.specialty-content {
		flex: 1;
	}

	.specialty-title {
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--ch);
		color: var(--accent-color);
	}

	.specialty-desc {
		color: var(--text-muted);
		line-height: var(--line-height-relaxed);
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
		border-radius: var(--radius-md);
		transition: all 0.2s ease;

		&:hover {
			background: var(--color-mix-light);
			border-color: var(--accent-color);
			transform: translateX(var(--ch));
		}
	}

	.nav-icon {
		font-size: var(--font-size-lg);
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
		border-radius: var(--radius-lg);
		background: var(--color-mix-faint);
		container-type: inline-size;
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--ch3);
	}

	h2 {
		font-size: var(--font-size-xl);
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
		border-radius: var(--radius-md);
		transition: all 0.2s ease;

		&:hover {
			background: var(--color-mix-light);
			border-color: var(--accent-color);
		}
	}

	.youtube-icon {
		color: #ff0000;
		font-size: var(--font-size-lg);
	}

	.video-container {
		position: relative;
		width: 100%;
		padding-bottom: 56.25%;
		margin: var(--ch2) 0;
		background: var(--color-mix-medium);
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
		font-size: var(--font-size-sm);
		padding: var(--ch) 0;
		text-align: center;
		/* Add subtle separator */
		border-top: 1px solid var(--border-color);
		margin-top: var(--ch);
	}
</style>
