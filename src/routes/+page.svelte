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
	<Terminal />
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
		<a href="/content" class="nav-link">
			<span class="nav-icon">🚀</span>
			Browse my content & projects
		</a>
		<a href="/contact" class="nav-link">
			<span class="nav-icon">✉️</span>
			Get in touch
		</a>
	</nav>
</section>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;

		width: 100%;
		min-height: 50vh;

		background: linear-gradient(to bottom, var(--bg-color), var(--bg-darker));
	}

	.home {
		container-type: inline-size;
		max-width: min(var(--measure), 95cqi);
		margin-inline: auto;
		padding: var(--ch4) var(--ch2);
	}

	.specialties {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 30ch), 1fr));
		gap: var(--ch3);
		margin: var(--ch4) 0;
	}

	.specialty {
		display: flex;
		gap: var(--ch2);
		align-items: flex-start;

		padding: var(--ch3);
		border: calc(var(--ch) / 16) solid var(--border-color);
		border-radius: var(--radius-lg);

		background: var(--bg-color);
		box-shadow: var(--shadow-sm);

		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.specialty:hover {
		transform: translateY(calc(-2 * var(--ch) / 16));
		border-color: var(--accent-color);
		background: var(--bg-darker);
		box-shadow: var(--shadow-lg);
	}

	.specialty-icon {
		padding: var(--ch2);
		border-radius: var(--radius-md);

		font-size: var(--font-size-2xl);
		line-height: var(--line-height-tight);
		color: var(--accent-color);

		background: var(--color-mix-light);
	}

	.specialty-content {
		flex: 1;
	}

	.specialty-title {
		margin-bottom: var(--ch);
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		color: var(--accent-color);
	}

	.specialty-desc {
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--text-muted);
	}

	.navigation {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20ch), 1fr));
		gap: var(--ch2);
		margin: var(--ch4) 0;
	}

	.nav-link {
		display: flex;
		gap: var(--ch2);
		align-items: center;

		padding: var(--ch2);
		border: calc(var(--ch) / 16) solid var(--border-color);
		border-radius: var(--radius-lg);

		color: var(--text-color);
		text-decoration: none;

		background: var(--bg-color);
		box-shadow: var(--shadow-sm);

		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.nav-link:hover {
		transform: translateY(calc(-1 * var(--ch) / 8));
		border-color: var(--accent-color);
		background: var(--bg-darker);
		box-shadow: var(--shadow-md);
	}

	.nav-icon {
		font-size: var(--font-size-xl);
		color: var(--accent-color);
	}

	.youtube-section {
		container-type: inline-size;

		margin: var(--ch4) 0;
		padding: var(--ch3);
		border: calc(var(--ch) / 16) solid var(--border-color);
		border-radius: var(--radius-lg);

		background: var(--bg-color);
		box-shadow: var(--shadow-sm);
	}

	.section-header {
		margin-bottom: var(--ch3);
		text-align: center;
	}

	h2 {
		margin-bottom: var(--ch);
		font-size: var(--font-size-2xl);
		line-height: var(--line-height-tight);
		color: var(--accent-color);
	}

	.section-desc {
		font-size: var(--font-size-lg);
		line-height: var(--line-height-relaxed);
		color: var(--text-muted);
	}

	.video-figure {
		overflow: hidden;

		aspect-ratio: 16/9;
		margin: var(--ch3) 0;
		border-radius: var(--radius-md);

		background: var(--bg-darker);
	}

	.video-container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	iframe {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;
		border: none;
	}

	.youtube-link {
		display: flex;
		gap: var(--ch2);
		align-items: center;
		justify-content: center;

		margin-top: var(--ch3);
		padding: var(--ch2);
		border: calc(var(--ch) / 16) solid var(--accent-color);
		border-radius: var(--radius-lg);

		font-weight: var(--font-weight-bold);
		color: var(--bg-color);
		text-decoration: none;

		background: var(--accent-color);

		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.youtube-link:hover {
		transform: translateY(calc(-1 * var(--ch) / 8));
		border-color: var(--accent-color-hover);
		background: var(--accent-color-hover);
	}

	.youtube-icon {
		font-size: var(--font-size-lg);
	}

	@container (width < 40ch) {
		.specialty {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.specialty-icon {
			margin-bottom: var(--ch);
		}

		.navigation {
			grid-template-columns: 1fr;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.specialty,
		.nav-link,
		.youtube-link {
			transform: none;
			transition: none;
		}
	}
</style>
