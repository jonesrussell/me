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
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
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
		display: flex;
		gap: var(--ch2);
		align-items: flex-start;
		padding: var(--ch3);
		border: calc(var(--ch) / 16) solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--bg-darker);
		transition: all 0.3s ease;
	}

	.specialty:hover {
		transform: translateY(calc(-2 * var(--ch) / 16));
		border-color: var(--accent-color);
		box-shadow: var(--shadow-lg);
	}

	.specialty-icon {
		padding: var(--ch);
		border-radius: var(--radius-md);
		background: var(--color-mix-light);
		font-size: var(--font-size-xl);
		line-height: var(--line-height-base);
	}

	.specialty-content {
		flex: 1;
	}

	.specialty-title {
		margin-bottom: var(--ch);
		color: var(--accent-color);
		font-weight: var(--font-weight-bold);
	}

	.specialty-desc {
		color: var(--text-muted);
		line-height: var(--line-height-relaxed);
	}

	.navigation {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
		margin: var(--ch4) 0;
	}

	.nav-link {
		display: flex;
		gap: var(--ch2);
		align-items: center;
		padding: var(--ch2);
		border: calc(var(--ch) / 16) solid var(--border-color);
		border-radius: var(--radius-md);
		color: var(--link-color);
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.nav-link:hover {
		background: var(--color-mix-light);
		border-color: var(--accent-color);
		transform: translateX(var(--ch));
	}

	.nav-icon {
		font-size: var(--font-size-lg);
	}

	@media (width >= calc(var(--ch) * 37.5)) {
		.navigation {
			flex-direction: row;
			gap: var(--ch2);
		}

		.nav-link {
			flex: 1;
			justify-content: center;
		}

		.nav-link:hover {
			transform: translateY(calc(-1 * var(--ch) / 8));
		}
	}

	.youtube-section {
		margin: var(--ch4) 0;
		padding: var(--ch3);
		border: calc(var(--ch) / 16) solid var(--border-color);
		border-radius: var(--radius-lg);
		background: var(--color-mix-faint);
		container-type: inline-size;
	}

	.section-header {
		margin-bottom: var(--ch3);
		text-align: center;
	}

	h2 {
		margin-bottom: var(--ch);
		font-size: var(--font-size-xl);
		line-height: var(--line-height-tight);
	}

	.section-desc {
		color: var(--text-muted);
		line-height: var(--line-height-relaxed);
	}

	.video-figure {
		margin: var(--ch3) 0;
	}

	.video-container {
		position: relative;
		height: 0;
		padding-bottom: 56.25%;
		border-radius: var(--radius-md);
		background: var(--bg-darker);
		overflow: hidden;
	}

	.video-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	figcaption {
		margin-top: var(--ch);
		color: var(--text-muted);
		font-size: var(--font-size-sm);
		text-align: center;
	}

	.youtube-link {
		display: flex;
		gap: var(--ch2);
		justify-content: center;
		align-items: center;
		margin-top: var(--ch3);
		padding: var(--ch2);
		border: calc(var(--ch) / 16) solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--color-mix-light);
		color: var(--text-color);
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.youtube-link:hover {
		background: var(--color-mix-medium);
		border-color: var(--accent-color);
		transform: translateY(calc(-2 * var(--ch) / 16));
	}

	.youtube-icon {
		color: var(--accent-color);
		font-size: var(--font-size-lg);
	}
</style>
