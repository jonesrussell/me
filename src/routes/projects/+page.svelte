<script lang="ts">
	import VideoGrid from '$lib/components/video/VideoGrid.svelte';
	import ProjectGrid from '$lib/components/projects/ProjectGrid.svelte';
	import type { Video } from '$lib/types';
	import type { Project } from '$lib/types/project';

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

<style>
	@media (width >= 48ch) {
		.hero {
			min-height: 60vh;
			padding: var(--space-20) var(--space-8);
		}
	}

	@container projects-page (width >= 48ch) {
		.container {
			max-width: min(var(--measure), 95%);
		}

		.section-title {
			font-size: var(--font-size-3xl);
		}
	}

	@container projects-page (width >= 80ch) {
		.container {
			max-width: min(var(--measure), 90%);
		}

		.section-title {
			font-size: var(--font-size-4xl);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			transition: none;
			animation: none;
		}
	}

	/* Consistent container and hero styles */
	.projects {
		container-type: inline-size;
		container-name: projects-page;
		width: 100%;
		padding: var(--space-16) 0;
	}

	.hero {
		display: flex;
		position: relative;
		width: 100%;
		padding: var(--space-12) var(--space-4);
		text-align: center;
		background: linear-gradient(to bottom, var(--bg-color), var(--bg-darker));
		border-radius: var(--radius-lg);
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 50vh;
		overflow: hidden;
	}

	.hero::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at center, var(--color-mix-faint) 0%, transparent 70%);
		pointer-events: none;
	}

	.container {
		display: flex;
		width: 100%;
		margin: 0 auto;
		padding: 0 var(--space-4);
		max-width: min(var(--measure), 95%);
		flex-direction: column;
		gap: var(--space-16);
	}

	.section {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
		margin-top: 0;
	}

	.section-title {
		margin: 0 0 var(--space-8) 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-tight);
		text-align: center;
		color: var(--text-color);
	}
</style>

<svelte:head>
	<title>Projects & Content | Russell Jones - Go & Modern Web Development</title>
	<meta
		name="description"
		content="Explore my open source projects, technical videos, and educational content about Go, JavaScript, and modern web development."
	/>
</svelte:head>

<div class="projects">
	<div class="hero">
		<h1>Projects & Content</h1>
		<p class="subtitle">Open Source & Educational Content</p>
	</div>

	<div class="container">
		<section class="section" aria-label="Featured Videos">
			<h2 class="section-title">Featured Videos</h2>
			<VideoGrid {videos} />
		</section>

		<section class="section" aria-label="Open Source Projects">
			<h2 class="section-title">Open Source Projects</h2>
			<ProjectGrid {projects} />
		</section>
	</div>
</div>
