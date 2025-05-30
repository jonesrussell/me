<script lang="ts">
	import VideoGrid from '$lib/components/video/VideoGrid.svelte';
	import ProjectGrid from '$lib/components/projects/ProjectGrid.svelte';
	import type { Video } from '$lib/types/video';
	import type { Project } from '$lib/types/project';
	import Hero from '$lib/components/ui/Hero.svelte';

	const projects: Project[] = [
		{
			title: 'MP Emailer',
			description:
				'A web app that helps constituents easily contact their MPs through email campaigns on important issues.',
			tags: ['Go', 'Echo', 'MariaDB', 'Tailwind CSS', 'JWT'],
			url: 'https://github.com/jonesrussell/mp-emailer',
			status: 'active'
		},
		{
			title: 'Goforms',
			description: 'Quickly add forms to your web projects.',
			tags: ['Go', 'Echo', 'MariaDB', 'REST API', 'Docker'],
			url: 'https://goformx.com/',
			status: 'active'
		},
		{
			title: 'Gimbal',
			description: 'A Gyruss-inspired game built with Ebitengine.',
			tags: ['Go', 'Ebitengine', 'Game Dev', 'WASM'],
			url: 'https://github.com/jonesrussell/gimbal',
			status: 'experimental'
		},
		{
			title: 'GoCrawl',
			description:
				'A simple web crawler built in Go that fetches and processes web pages, storing results in Elasticsearch. Demonstrates the use of Cobra for CLI, Colly for web scraping, Elasticsearch for storage, and Zap for logging.',
			tags: ['Go', 'Web Crawler', 'Elasticsearch', 'CLI', 'Experimental'],
			url: 'https://github.com/jonesrussell/gocrawl',
			status: 'experimental'
		}
	];

	const videos: Video[] = [
		{
			title: 'The Legend Reborn – Animated Trailer (Scripted, Voiced & AI-Enhanced)',
			description:
				'Experience a trailer brought to life through original scriptwriting, voice acting, and creative direction. Each scene began as an image I generated with AI, then was animated using advanced tools. I edited and produced the entire trailer, blending technology and storytelling over several months.',
			tags: [
				'AI-Assisted Animation',
				'Original Script',
				'Voice Acting',
				'Creative Direction',
				'Anishinaabe'
			],
			url: 'https://www.youtube.com/watch?v=7Pvq7hQ3l84',
			embedId: '7Pvq7hQ3l84',
			date: 'Feb 2024'
		},
		{
			title: 'Red Helmet - Stop Motion Trailer',
			description:
				'A wanderer comes across a red helmet, origin unknown. Little does he know, the helmet is imbued with a powerful entity that embarks on a journey of its own.\nThis project took days of work and taught me valuable lessons in stop motion production. Ultimately, I decided to halt production and film a quick exit, capturing the spirit of experimentation and learning.',
			tags: ['Stop Motion', 'Short Film', 'Indie Film', 'Original Story', 'Experimental'],
			url: 'https://www.youtube.com/watch?v=Bky1A8vNUjU',
			embedId: 'Bky1A8vNUjU',
			date: 'Dec 2023'
		}
	];
</script>

<style>
	.projects {
		container-type: inline-size;
		container-name: projects-page;
		display: grid;
		width: 100%;
		padding: var(--space-16) 0;
		grid-template-rows: auto 1fr;
		gap: var(--space-16);
	}

	.container {
		display: grid;
		width: 100%;
		margin-inline: auto;
		padding-inline: var(--space-4);
		max-width: min(var(--measure), 95cqi);
		gap: var(--space-16);
		grid-template-columns: minmax(0, 1fr);
	}

	.section {
		display: flex;
		width: 100%;
		max-width: 100%;
		flex-direction: column;
		align-items: center;
		margin-top: 0;
	}

	.section-title {
		margin: 0 0 var(--space-8) 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-3xl);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-tight);
		text-align: center;
		color: var(--text-color);
	}

	@container projects-page (min-width: 640px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-8);
		}
	}

	@container projects-page (min-width: 768px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-12);
		}

		.section-title {
			font-size: var(--font-size-4xl);
		}
	}

	@container projects-page (min-width: 1024px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-16);
		}
	}

	@container projects-page (min-width: 1280px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-20);
		}
	}

	.project-grid-container {
		container-type: inline-size;
		container-name: project-grid;
		width: 100%;
	}

	.featured-videos-container {
		container-type: inline-size;
		container-name: featured-videos;
		width: 100%;
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			transition: none;
			animation: none;
		}
	}
</style>

<svelte:head>
	<title>Projects & Content | Russell Jones - Go & Modern Web Development</title>
	<meta
		name="description"
		content="Explore my open source projects, technical videos, and educational content about Go, JavaScript, and modern web development."
	/>
</svelte:head>

<Hero title="Projects & Content" subtitle="Open Source & Educational Content" />

<main class="projects">
	<div class="container">
		<section class="section featured-videos-container" aria-label="Featured Videos">
			<h2 id="video-grid-title" class="section-title">Experimental Videos</h2>
			<VideoGrid {videos} />
		</section>

		<section class="section project-grid-container" aria-label="Open Source Projects">
			<h2 class="section-title">Open Source Projects</h2>
			<ProjectGrid {projects} />
		</section>
	</div>
</main>
