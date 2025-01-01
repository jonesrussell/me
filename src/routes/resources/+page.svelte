<script lang="ts">
	interface Resource {
		title: string;
		url: string;
		description: string;
		stars?: number;
		category: 'Go' | 'Web Development' | 'Tools';
	}

	const resources: Resource[] = [
		// Go Resources
		{
			title: 'Go by Example',
			url: 'https://github.com/mmcgrana/gobyexample',
			description:
				'A comprehensive collection of annotated example programs for learning Go',
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
			title: 'Go Playground',
			url: 'https://go.dev/play/',
			description: 'Interactive Go environment in the browser',
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
			title: 'SvelteKit',
			url: 'https://kit.svelte.dev',
			description: 'Web application framework for Svelte',
			stars: 15600,
			category: 'Web Development'
		},
		{
			title: 'MDN Web Docs',
			url: 'https://developer.mozilla.org',
			description: 'Comprehensive web development documentation',
			category: 'Web Development'
		},
		// Tools
		{
			title: 'Docker Compose',
			url: 'https://docs.docker.com/compose/',
			description: 'Define and run multi-container Docker applications',
			stars: 8500,
			category: 'Tools'
		},
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
		}
	];

	// Transform resources into tree structure
	const treeData = {
		name: 'resources/',
		children: [...new Set(resources.map((r) => r.category))].map(
			(category) => ({
				name: `${category.toLowerCase()}/`,
				children: resources
					.filter((r) => r.category === category)
					.map((resource) => ({
						name: `${resource.title} ${resource.stars ? '★' + resource.stars : ''}`,
						url: resource.url,
						description: resource.description
					}))
			})
		)
	};
</script>

<svelte:head>
	<title>Developer Resources | Russell Jones - Tools & Learning Materials</title
	>
	<meta
		name="description"
		content="Curated collection of development resources, tools, and learning materials for Go, web development, and cloud technologies. Hand-picked by Russell Jones."
	/>
</svelte:head>

<div class="resources">
	<h1>Development Resources</h1>
	<p class="description">
		A curated collection of tools and learning materials.
	</p>
	<ResourceTree data={treeData} />
</div>

<style>
	.resources {
		width: 100%;
		max-width: calc(100 * var(--ch));
		margin: 0 auto;
		padding: calc(4 * var(--ch));
		font-family: var(--font-mono);
	}

	h1 {
		margin: 0;
		font-size: calc(2 * var(--ch));
		line-height: var(--line-height-tight);
		color: var(--accent-color);
	}

	.description {
		margin: calc(2 * var(--ch)) 0 calc(4 * var(--ch));
		color: var(--text-muted);
	}
</style>
