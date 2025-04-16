<script lang="ts">
	import VideoGrid from '$lib/components/video/VideoGrid.svelte';
	import ProjectGrid from '$lib/components/projects/ProjectGrid.svelte';
	import type { Project, Video } from '$lib/types';

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
	.projects {
		width: 100%;
		padding: var(--space-8) 0;
		container-type: inline-size;
		container-name: projects-page;

		& .container {
			width: 100%;
			max-width: min(var(--measure), 95cqi);
			margin: 0 auto;
			padding: 0 var(--space-4);
		}

		& h1 {
			margin: 0;
			font-size: var(--font-size-xl);
			line-height: var(--line-height-tight);
			text-align: center;
			color: var(--text-color);
		}

		& .intro {
			margin: var(--space-4) 0 var(--space-8) 0;
			font-size: var(--font-size-base);
			line-height: var(--line-height-relaxed);
			text-align: center;
			color: var(--text-muted);
		}

		@container projects-page (width >= 48ch) {
			padding: var(--space-12) 0;

			& h1 {
				font-size: var(--font-size-2xl);
			}

			& .intro {
				margin: var(--space-6) 0 var(--space-12) 0;
				font-size: var(--font-size-lg);
			}
		}

		@container projects-page (width >= 80ch) {
			padding: var(--space-16) 0;
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

<div class="projects">
	<div class="container">
		<h1>Projects & Content</h1>
		<p class="intro">
			Here you'll find my open source projects, technical videos, and educational content.
		</p>

		<VideoGrid {videos} />
		<ProjectGrid {projects} />
	</div>
</div>
