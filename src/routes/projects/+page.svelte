<script lang="ts">
	import { base } from '$app/paths';
	import VideoGrid from '$lib/components/video/VideoGrid.svelte';
	import ProjectGrid from '$lib/components/projects/ProjectGrid.svelte';
	import { projects as projectsData } from '$lib/data/projects';
	import type { Video } from '$lib/types/video';
	import type { Project } from '$lib/types/project';
	import Hero from '$lib/components/ui/Hero.svelte';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();

	const projects: Project[] = projectsData.map((p) => ({
		...p,
		image: p.image ? `${base}/${p.image}` : undefined,
		imageSrcset: p.imageSrcset?.map(({ path, width }) => ({
			path: `${base}/${path}`,
			width
		})),
		imageSizes: p.imageSizes
	}));

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

	@media (prefers-reduced-motion: reduce) {
		* {
			transition: none;
			animation: none;
		}
	}

	.projects {
		container-type: inline-size;
		container-name: projects-page;
		display: grid;
		position: relative;
		width: 100%;
		padding: var(--space-16) 0;
		grid-template-rows: auto 1fr;
		gap: var(--space-16);
	}

	/* Workshop grid-dot pattern + atmospheric gradient */
	.projects::before {
		content: '';
		position: absolute;
		inset: 0;
		background:
			radial-gradient(
				ellipse 120% 80% at 50% 20%,
				var(--color-mix-faint) 0%,
				transparent 50%
			),
			radial-gradient(
				circle,
				color-mix(in srgb, var(--text-muted) 15%, transparent) 1px,
				transparent 1px
			);
		background-size:
			100% 100%,
			1.5rem 1.5rem;
		pointer-events: none;
		z-index: 0;
	}

	.container {
		display: grid;
		position: relative;
		width: 100%;
		margin-inline: auto;
		padding-inline: var(--space-4);
		max-width: min(var(--measure), 95cqi);
		gap: var(--space-16);
		grid-template-columns: minmax(0, 1fr);
		z-index: 1;
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
		letter-spacing: var(--letter-spacing-tight);
	}

	.section-title::after {
		content: '';
		display: block;
		width: 8rem;
		height: 0.125rem;
		margin: var(--space-3) auto 0;
		background:
			repeating-linear-gradient(
				90deg,
				var(--accent-color) 0,
				var(--accent-color) 0.5rem,
				transparent 0.5rem,
				transparent 0.75rem
			);
		border-radius: 0.0625rem;
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

	.northcloud-recent {
		margin-top: var(--space-8);
		padding: var(--space-4);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
	}

	.northcloud-recent-title {
		margin: 0 0 var(--space-3) 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	.northcloud-recent-list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.northcloud-recent-item {
		padding: var(--space-1) 0;
		border-block-end: var(--border-width) solid var(--border-color);
	}

	.northcloud-recent-item:last-of-type {
		border-block-end: none;
	}

	.northcloud-recent-link {
		font-size: var(--font-size-sm);
		text-decoration: none;
		color: var(--accent-color);
	}

	.northcloud-recent-link:hover {
		text-decoration: underline;
	}

</style>

<svelte:head>
	<title>Projects | Russell Jones - Go & Modern Web Development</title>
	<meta
		name="description"
		content="Content platform and consumer sites – North Cloud and related projects. Technical videos and educational content about Go, JavaScript, and modern web development."
	/>
</svelte:head>

<Hero title="Projects" />

<div class="projects">
	<div class="container">
		<section class="section project-grid-container" aria-label="Content platform and consumer sites">
			<h2 class="section-title">Content platform and consumer sites</h2>
			<ProjectGrid {projects} />
			{#if data.crimeArticles?.length}
				<div class="northcloud-recent" aria-label="Recent StreetCode articles">
					<h3 class="northcloud-recent-title">StreetCode — Recent Crime</h3>
					<ul class="northcloud-recent-list">
						{#each data.crimeArticles as article (article.id)}
							<li class="northcloud-recent-item">
								<!-- eslint-disable svelte/no-navigation-without-resolve -->
								<a
									href={article.url}
									class="northcloud-recent-link"
									target="_blank"
									rel="noopener noreferrer"
								>
									{article.title}
								</a>
								<!-- eslint-enable svelte/no-navigation-without-resolve -->
							</li>
						{/each}
					</ul>
				</div>
			{/if}
			{#if data.miningArticles?.length}
				<div class="northcloud-recent" aria-label="Recent OreWire articles">
					<h3 class="northcloud-recent-title">OreWire — Recent Mining</h3>
					<ul class="northcloud-recent-list">
						{#each data.miningArticles as article (article.id)}
							<li class="northcloud-recent-item">
								<!-- eslint-disable svelte/no-navigation-without-resolve -->
								<a
									href={article.url}
									class="northcloud-recent-link"
									target="_blank"
									rel="noopener noreferrer"
								>
									{article.title}
								</a>
								<!-- eslint-enable svelte/no-navigation-without-resolve -->
							</li>
						{/each}
					</ul>
				</div>
			{/if}
			{#if data.entertainmentArticles?.length}
				<div class="northcloud-recent" aria-label="Recent Movies of War articles">
					<h3 class="northcloud-recent-title">Movies of War — Recent Entertainment</h3>
					<ul class="northcloud-recent-list">
						{#each data.entertainmentArticles as article (article.id)}
							<li class="northcloud-recent-item">
								<!-- eslint-disable svelte/no-navigation-without-resolve -->
								<a
									href={article.url}
									class="northcloud-recent-link"
									target="_blank"
									rel="noopener noreferrer"
								>
									{article.title}
								</a>
								<!-- eslint-enable svelte/no-navigation-without-resolve -->
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</section>

		<section class="section featured-videos-container" aria-label="Featured Videos">
			<h2 id="video-grid-title" class="section-title">Experimental Videos</h2>
			<VideoGrid {videos} />
		</section>
	</div>
</div>
