<script lang="ts">
	import ResourceTree from '$lib/components/ResourceTree.svelte';

	interface Resource {
		title: string;
		url: string;
		description: string;
		stars?: number;
		category:
			| 'Go'
			| 'Web Development'
			| 'Tools'
			| 'Documentation'
			| 'DevOps'
			| 'Learning Paths';
	}

	const resources: Resource[] = [
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
		{
			title: 'Docker Compose',
			url: 'https://docs.docker.com/compose/',
			description: 'Define and run multi-container applications',
			stars: 8500,
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

	// Transform resources into tree structure
	const treeData = {
		name: 'resources/',
		children: [...new Set(resources.map((r) => r.category))]
			.sort()
			.map((category) => ({
				name: `${category.toLowerCase()}/`,
				children: resources
					.filter((r) => r.category === category)
					.sort((a, b) => (b.stars || 0) - (a.stars || 0))
					.map((resource) => ({
						name: `${resource.title} ${resource.stars ? '★' + resource.stars : ''}`,
						url: resource.url,
						description: resource.description
					}))
			}))
	};
</script>

<svelte:head>
	<title>Developer Resources | Russell Jones - Tools & Learning Materials</title
	>
	<meta
		name="description"
		content="An ever-growing collection of development resources, tools, and learning materials. Includes documentation, Go libraries, web development frameworks, DevOps tools, and learning paths."
	/>
</svelte:head>

<div class="resources">
	<h1>Development Resources</h1>
	<p class="description">
		A curated and continuously expanding collection of tools, documentation, and
		learning materials. Updated regularly with new discoveries and community
		recommendations.
	</p>
	<ResourceTree data={treeData} />
</div>

<style>
	.resources {
		width: 100%;
		max-width: var(--measure);
		margin: 0 auto;
		padding: var(--ch4) var(--content-padding);
		font-family: var(--font-mono);
	}

	h1 {
		margin: 0;
		font-size: var(--font-size-xl);
		line-height: var(--line-height-tight);
		color: var(--accent-color);
		font-weight: 500;
	}

	.description {
		margin: var(--ch2) 0 var(--ch4);
		color: var(--text-muted);
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		max-width: 80ch;
	}
</style>
