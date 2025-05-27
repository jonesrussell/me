<script lang="ts">
	import ResourceSection from '$lib/components/resources/ResourceSection.svelte';
	import FeaturedVideos from '$lib/components/video/FeaturedVideos.svelte';
	import type { Resource } from '$lib/types';
	import type { YouTubeChannel } from '$lib/types/video';
	import Hero from '$lib/components/ui/Hero.svelte';

	// YouTube channel info
	const youtubeChannel: YouTubeChannel = {
		name: 'Full Stack Dev',
		url: 'https://www.youtube.com/@fullstackdev42',
		description: 'Practical web development tutorials and coding insights',
		featuredVideos: [
			{
				title: 'Add a Google Font to Tailwind CSS | 2023',
				url: 'https://youtu.be/B4v7ZDLxiS4',
				embedId: 'B4v7ZDLxiS4',
				description: 'Learn how to integrate custom Google Fonts with Tailwind CSS',
				tags: ['Tailwind CSS', 'Web Development', 'CSS', 'Frontend'],
				date: 'Dec 2023'
			}
		]
	};

	const resources: Resource[] = [
		// Featured Content
		{
			title: 'FullStack Dev YouTube',
			url: youtubeChannel.url,
			description:
				'Live streams and tutorials on modern web development, AI pair programming, and coding best practices',
			category: 'Essential Tools & Platforms',
			featured: true
		},
		{
			title: 'Cursor AI',
			url: 'https://cursor.sh',
			description: 'The AI-first code editor. Built for pair programming with AI.',
			category: 'Essential Tools & Platforms',
			featured: true
		},

		// Documentation
		{
			title: 'MDN Web Docs',
			url: 'https://developer.mozilla.org',
			description: 'The definitive resource for web development documentation',
			category: 'Documentation'
		},
		{
			title: 'Stack Overflow',
			url: 'https://stackoverflow.com',
			description: 'Community-driven Q&A for programmers',
			category: 'Documentation'
		},
		{
			title: 'DevDocs',
			url: 'https://devdocs.io',
			description: 'Fast, offline, and comprehensive documentation browser',
			category: 'Documentation'
		},

		// Go Resources
		{
			title: 'Go by Example',
			url: 'https://github.com/mmcgrana/gobyexample',
			description: 'Annotated example programs for learning Go',
			stars: 7400,
			category: 'Go'
		},
		{
			title: 'Effective Go',
			url: 'https://go.dev/doc/effective_go',
			description: 'Official guide to writing clear, idiomatic Go code',
			category: 'Go'
		},
		{
			title: 'Uber Go Style Guide',
			url: 'https://github.com/uber-go/guide',
			description: "Uber's Go style guide with best practices",
			stars: 14200,
			category: 'Go'
		},
		{
			title: 'go-task',
			url: 'https://taskfile.dev',
			description: 'Task runner / simpler Make alternative written in Go',
			stars: 8500,
			category: 'Go'
		},
		{
			title: 'Uber fx',
			url: 'https://github.com/uber-go/fx',
			description: 'Dependency injection system for Go',
			stars: 4200,
			category: 'Go'
		},
		{
			title: 'Uber zap',
			url: 'https://github.com/uber-go/zap',
			description: 'Blazing fast, structured, leveled logging in Go',
			stars: 19300,
			category: 'Go'
		},

		// Web Development
		{
			title: 'TypeScript Handbook',
			url: 'https://www.typescriptlang.org/docs/handbook/',
			description: 'Official TypeScript documentation and language guide',
			stars: 9200,
			category: 'Web Development'
		},
		{
			title: 'Svelte',
			url: 'https://svelte.dev',
			description: 'Cybernetically enhanced web apps',
			stars: 73800,
			category: 'Web Development'
		},
		{
			title: 'SvelteKit',
			url: 'https://kit.svelte.dev',
			description: 'Web application framework for Svelte',
			stars: 15600,
			category: 'Web Development'
		},
		{
			title: 'Vite',
			url: 'https://vitejs.dev',
			description: 'Next generation frontend tooling',
			stars: 59900,
			category: 'Web Development'
		},

		// DevOps
		{
			title: 'Docker',
			url: 'https://www.docker.com',
			description: 'Container platform for modern applications',
			category: 'DevOps'
		},
		{
			title: 'Docker Compose',
			url: 'https://docs.docker.com/compose/',
			description: 'Define and run multi-container applications',
			stars: 8500,
			category: 'DevOps'
		},
		{
			title: 'GitHub Actions',
			url: 'https://github.com/features/actions',
			description: 'Automate your software workflows',
			category: 'DevOps'
		},
		{
			title: 'act',
			url: 'https://github.com/nektos/act',
			description: 'Run GitHub Actions locally',
			stars: 43800,
			category: 'DevOps'
		},

		// Tools
		{
			title: 'Neovim',
			url: 'https://neovim.io',
			description: 'Hyperextensible Vim-based text editor',
			stars: 68900,
			category: 'Tools'
		},
		{
			title: 'tmux',
			url: 'https://github.com/tmux/tmux',
			description: 'Terminal multiplexer for Unix-like systems',
			stars: 31200,
			category: 'Tools'
		},
		{
			title: 'lazygit',
			url: 'https://github.com/jesseduffield/lazygit',
			description: 'Simple terminal UI for git commands',
			stars: 37800,
			category: 'Tools'
		},
		{
			title: 'Knip',
			url: 'https://github.com/webpro/knip',
			description:
				'Find unused files, dependencies, and exports in your JavaScript and TypeScript projects',
			stars: 3000,
			category: 'Tools'
		},

		// Learning Paths
		{
			title: 'roadmap.sh',
			url: 'https://roadmap.sh',
			description: 'Community-driven guides and paths to learn different tools and technologies',
			stars: 25300,
			category: 'Learning Paths'
		},
		{
			title: 'freeCodeCamp',
			url: 'https://www.freecodecamp.org',
			description: 'Learn to code for free with interactive tutorials',
			category: 'Learning Paths'
		},
		{
			title: 'Exercism',
			url: 'https://exercism.org',
			description: 'Improve your coding skills with practice and mentorship',
			category: 'Learning Paths'
		}
	];

	// Group resources by category with featured content first
	const groupedResources = [
		...new Set(['Essential Tools & Platforms', ...resources.map((r) => r.category)])
	]
		.sort((a, b) => {
			if (a === 'Essential Tools & Platforms') return -1;
			if (b === 'Essential Tools & Platforms') return 1;
			return a.localeCompare(b);
		})
		.reduce(
			(acc, category) => {
				acc[category] = resources
					.filter((r) => r.category === category)
					.sort((a, b) => {
						if (a.featured && !b.featured) return -1;
						if (!a.featured && b.featured) return 1;
						return (b.stars || 0) - (a.stars || 0);
					});
				return acc;
			},
			{} as Record<string, Resource[]>
		);
</script>

<style>
	.resources {
		container-type: inline-size;
		container-name: resources-page;
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

	.sections {
		display: grid;
		grid-template-columns: minmax(min(100%, 30rem), 1fr);
		gap: var(--space-8);
		width: 100%;
		justify-content: center;
	}

	.featured-videos-section {
		grid-column: 1 / -1;
	}

	@container resources-page (min-width: 640px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-8);
		}

		.sections {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 30rem), 1fr));
			justify-content: start;
		}
	}

	@container resources-page (min-width: 768px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-12);
		}

		.sections {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 40rem), 1fr));
		}
	}

	@container resources-page (min-width: 1024px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-16);
		}
	}

	@container resources-page (min-width: 1280px) {
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
</style>

<svelte:head>
	<title>Developer Resources | Russell Jones - Web Development & Open Source</title>
	<meta
		name="description"
		content="Curated collection of essential tools, documentation, and learning resources for web developers. From TypeScript to Go, DevOps to AI integration."
	/>
</svelte:head>

<Hero title="Developer Resources" subtitle="Essential Tools & Learning Materials" />

<main class="resources">
	<div class="container">
		<div class="sections">
			{#each Object.entries(groupedResources) as [category, resources] (category)}
				<ResourceSection {category} {resources} />
			{/each}
			<div class="featured-videos-section">
				<FeaturedVideos videos={youtubeChannel.featuredVideos} />
			</div>
		</div>
	</div>
</main>
