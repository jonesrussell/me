<script lang="ts">
	import Box from '$lib/components/Box.svelte';

	interface Project {
		title: string;
		description: string;
		tech: string[];
		url: string;
		status: 'active' | 'stable' | 'experimental';
	}

	interface Video {
		title: string;
		description: string;
		topics: string[];
		url: string;
		embedId: string;
		date: string;
	}

	const projects: Project[] = [
		{
			title: 'MP Emailer',
			description:
				'A web app that helps constituents easily contact their MPs through email campaigns on important issues.',
			tech: ['Go', 'Echo', 'MariaDB', 'Tailwind CSS', 'JWT'],
			url: 'https://github.com/jonesrussell/mp-emailer',
			status: 'active'
		},
		{
			title: 'Goforms',
			description: 'Modern form management system with MariaDB backend.',
			tech: ['Go', 'Echo', 'MariaDB', 'REST API', 'Docker'],
			url: 'https://github.com/jonesrussell/goforms',
			status: 'active'
		},
		{
			title: 'Gimbal',
			description: 'A Gyruss-inspired game built with Ebitengine.',
			tech: ['Go', 'Ebitengine', 'Game Dev', 'WASM'],
			url: 'https://github.com/jonesrussell/gimbal',
			status: 'experimental'
		},
		{
			title: 'Goprowl',
			description: 'Go-based system monitoring and alerting tool.',
			tech: ['Go', 'Metrics', 'Monitoring', 'CLI'],
			url: 'https://github.com/jonesrussell/goprowl',
			status: 'experimental'
		}
	];

	const videos: Video[] = [
		{
			title: 'The Legend Reborn - AI Generated Trailer',
			description:
				'Journey with Nanabush and witness the story of the Anishinaabe in this AI-generated trailer celebrating Indigenous storytelling.',
			topics: ['AI Generated', 'Indigenous', 'Anishinaabe', 'Native American'],
			url: 'https://www.youtube.com/watch?v=7Pvq7hQ3l84',
			embedId: '7Pvq7hQ3l84',
			date: 'Feb 2024'
		},
		{
			title: 'Red Helmet - Stop Motion Trailer',
			description:
				'A wanderer comes across a red helmet, origin unknown. Little does he know, the helmet is imbued with a powerful entity that embarks on a journey of its own.',
			topics: ['Stop Motion', 'Short Film', 'Indie Film', 'Original Story'],
			url: 'https://www.youtube.com/watch?v=Bky1A8vNUjU',
			embedId: 'Bky1A8vNUjU',
			date: 'Dec 2023'
		}
	];
</script>

<svelte:head>
	<title>Projects & Content | Russell Jones - Go & Modern Web Development</title
	>
	<meta
		name="description"
		content="Explore my open source projects, technical videos, and educational content about Go, JavaScript, and modern web development."
	/>
</svelte:head>

<div class="projects">
	<div class="container">
		<h1>Projects & Content</h1>
		<p class="intro">
			Here you'll find my open source projects, technical videos, and
			educational content.
		</p>

		<h2>Featured Videos</h2>
		<div class="video-grid">
			{#each videos as video}
				<Box>
					<div class="video-card">
						<div class="video-container">
							<iframe
								src={`https://www.youtube.com/embed/${video.embedId}`}
								title={video.title}
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
								loading="lazy"
							></iframe>
						</div>
						<h3 class="video-title">{video.title}</h3>
						<p class="description">{video.description}</p>
						<div class="topics">
							{#each video.topics as topic}
								<span class="topic">{topic}</span>
							{/each}
						</div>
					</div>
				</Box>
			{/each}
		</div>

		<h2>Open Source Projects</h2>
		<div class="project-grid">
			{#each projects as project}
				<Box>
					<div class="project">
						<div class="project-header">
							<h3>
								<a href={project.url} target="_blank" rel="noopener noreferrer">
									{project.title}
								</a>
							</h3>
							<span class="status status-{project.status}"
								>{project.status}</span
							>
						</div>
						<p class="description">{project.description}</p>
						<div class="tech-stack">
							{#each project.tech as tech}
								<span class="tech">{tech}</span>
							{/each}
						</div>
					</div>
				</Box>
			{/each}
		</div>
	</div>
</div>

<style>
	/* Tablet and larger */
	@media (width >= 48ch) {
		.projects {
			padding: var(--space-12) 0;
		}

		h1 {
			font-size: var(--font-size-2xl);
		}

		h2 {
			margin: var(--space-12) 0 var(--space-6) 0;
			font-size: var(--font-size-xl);
		}

		.intro {
			margin: var(--space-6) 0 var(--space-12) 0;
			font-size: var(--font-size-lg);
		}

		.video-grid,
		.project-grid {
			gap: var(--space-6);
		}

		.video-card,
		.project {
			padding: var(--space-6);
		}

		.video-title {
			font-size: var(--font-size-lg);
		}

		.description {
			font-size: var(--font-size-base);
		}

		.topic,
		.tech {
			padding: var(--space-2) var(--space-4);
			font-size: var(--font-size-sm);
		}

		.project-header {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			gap: var(--space-4);
		}

		.status {
			font-size: var(--font-size-sm);
			align-self: auto;
		}
	}

	/* Desktop and larger */
	@media (width >= 80ch) {
		.projects {
			padding: var(--space-16) 0;
		}

		.video-grid,
		.project-grid {
			grid-template-columns: repeat(auto-fit, minmax(50ch, 1fr));
			gap: var(--space-8);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			transition: none !important;
		}
	}

	.projects {
		width: 100%;
		padding: var(--space-8) 0;
	}

	.container {
		width: 100%;
		max-width: min(var(--measure), 95cqi);
		margin: 0 auto;
		padding: 0 var(--space-4);
	}

	h1 {
		margin: 0;
		font-size: var(--font-size-xl);
		line-height: var(--line-height-tight);
		text-align: center;
		color: var(--text-color);
	}

	h2 {
		margin: var(--space-8) 0 var(--space-4) 0;
		font-size: var(--font-size-lg);
		line-height: var(--line-height-tight);
		color: var(--text-color);
	}

	.intro {
		margin: var(--space-4) 0 var(--space-8) 0;
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		text-align: center;
		color: var(--text-muted);
	}

	.video-grid,
	.project-grid {
		display: grid;
		gap: var(--space-4);
	}

	.video-card,
	.project {
		width: 100%;
		padding: var(--space-4);
	}

	.video-container {
		position: relative;
		height: 0;
		margin-bottom: var(--space-4);
		padding-bottom: 56.25%;
		background: var(--bg-darker);
		border-radius: var(--radius-md);
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

	.video-title {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-base);
		line-height: var(--line-height-tight);
		color: var(--text-color);
	}

	.description {
		margin: var(--space-4) 0;
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
		color: var(--text-muted);
	}

	.topics,
	.tech-stack {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-top: var(--space-4);
	}

	.topic,
	.tech {
		padding: var(--space-2) var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-muted);
		background: var(--bg-darker);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
	}

	.topic:hover,
	.tech:hover {
		color: var(--text-color);
		background: color-mix(in srgb, var(--bg-darker) 80%, var(--accent-color));
	}

	.project-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		margin-bottom: var(--space-4);
	}

	.project-header h3 {
		margin: 0;
		font-size: var(--font-size-lg);
		line-height: var(--line-height-tight);
		color: var(--text-color);
	}

	.status {
		padding: var(--space-2) var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		text-transform: capitalize;
		border-radius: var(--radius-md);
		align-self: flex-start;
	}

	.status-active {
		color: var(--success-color);
		background: color-mix(in srgb, var(--success-color) 15%, transparent);
	}

	.status-stable {
		color: var(--info-color);
		background: color-mix(in srgb, var(--info-color) 15%, transparent);
	}

	.status-experimental {
		color: var(--warning-color);
		background: color-mix(in srgb, var(--warning-color) 15%, transparent);
	}

	a {
		text-decoration: none;
		color: var(--link-color);
		transition: all var(--transition-duration) var(--transition-timing);
	}

	a:hover {
		color: var(--link-hover);
	}
</style>
