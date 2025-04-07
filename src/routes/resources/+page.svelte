<script lang="ts">
	import ResourceSection from '$lib/components/ResourceSection.svelte';
	import FeaturedVideos from '$lib/components/FeaturedVideos.svelte';
	import ResourceHeader from '$lib/components/ResourceHeader.svelte';
	import type { Resource, YouTubeChannel } from '$lib/types';

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
				description:
					'Learn how to integrate custom Google Fonts with Tailwind CSS',
				topics: ['Tailwind CSS', 'Web Development', 'CSS', 'Frontend'],
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
			description:
				'The AI-first code editor. Built for pair programming with AI.',
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

		// Learning Paths
		{
			title: 'roadmap.sh',
			url: 'https://roadmap.sh',
			description:
				'Community-driven guides and paths to learn different tools and technologies',
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
		...new Set([
			'Essential Tools & Platforms',
			...resources.map((r) => r.category)
		])
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

<svelte:head>
	<title>Resources | Russell Jones - Go & Modern Web Development</title>
	<meta
		name="description"
		content="Curated collection of development resources, tutorials, and tools for Go, web development, and modern software engineering."
	/>
</svelte:head>

<div class="resources">
	<div class="container">
		<ResourceHeader
			title="Development Resources"
			description="A curated collection of tools, documentation, and learning resources for modern software development."
		/>

		{#each Object.entries(groupedResources) as [category, items]}
			<ResourceSection {category} resources={items} />
		{/each}

		<FeaturedVideos videos={youtubeChannel.featuredVideos} />
	</div>
</div>

<style>
	.resources {
		width: 100%;
		padding: var(--space-4) 0;
	}

	.container {
		width: 100%;
		max-width: min(var(--measure), 95cqi);
		margin: 0 auto;
		padding: 0 var(--space-3);
	}

	@media (width >= 48ch) {
		.resources {
			padding: var(--space-8) 0;
		}

		.container {
			padding: 0 var(--space-4);
		}
	}

	@media (width >= 80ch) {
		.resources {
			padding: var(--space-12) 0;
		}

		.container {
			padding: 0 var(--space-6);
		}
	}

	@media (width >= 120ch) {
		.resources {
			padding: var(--space-16) 0;
		}

		.container {
			padding: 0 var(--space-8);
		}
	}
</style>
