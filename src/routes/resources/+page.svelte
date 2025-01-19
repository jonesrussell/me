<script lang="ts">
	import Box from '$lib/components/Box.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import { onMount } from 'svelte';

	interface Resource {
		title: string;
		description: string;
		url: string;
		category: string;
		stars?: number;
	}

	const resources: Resource[] = [
		// AI
		{
			title: 'Cursor AI',
			url: 'https://cursor.sh',
			description:
				'The AI-first code editor. Built for pair programming with AI.',
			category: 'AI'
		},
		{
			title: 'FullStack Dev AI Coding',
			url: 'https://www.youtube.com/@fullstackdev42',
			description:
				'Live streams of AI pair programming and modern web development',
			category: 'AI'
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

	// Group resources by category
	const groupedResources = [...new Set(resources.map((r) => r.category))]
		.sort()
		.reduce(
			(acc, category) => {
				acc[category] = resources
					.filter((r) => r.category === category)
					.sort((a, b) => (b.stars || 0) - (a.stars || 0));
				return acc;
			},
			{} as Record<string, Resource[]>
		);

	function getCategoryIcon(category: string): string {
		switch (category) {
			case 'AI':
				return '🤖';
			case 'Documentation':
				return '📚';
			case 'Go':
				return '🏃';
			case 'Web Development':
				return '🌐';
			case 'DevOps':
				return '🔄';
			case 'Tools':
				return '🛠️';
			case 'Learning Paths':
				return '🎓';
			default:
				return '📦';
		}
	}

	function formatUrl(url: string): string {
		return url.replace(/^https?:\/\//, '');
	}

	// Debug layout
	let containerWidth = 0;
	let columnCount = 0;
	let categoryWidths: Record<string, number> = {};

	onMount(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				if (entry.target.classList.contains('resources')) {
					containerWidth = entry.contentRect.width;
					console.log('Container width:', containerWidth);
				}
				if (entry.target.classList.contains('categories')) {
					const computed = window.getComputedStyle(entry.target);
					columnCount = computed.gridTemplateColumns.split(' ').length;
					console.log('Grid columns:', columnCount);
				}
				if (entry.target.classList.contains('category')) {
					const category =
						entry.target.querySelector('h2')?.textContent?.trim() || 'unknown';
					categoryWidths[category] = entry.contentRect.width;
					console.log('Category width:', category, entry.contentRect.width);
				}
			}
		});

		const containers = document.querySelectorAll(
			'.resources, .categories, .category'
		);
		containers.forEach((container) => resizeObserver.observe(container));

		return () => resizeObserver.disconnect();
	});

	$effect(() => {
		console.log('Layout debug:', {
			containerWidth,
			columnCount,
			categoryWidths
		});
	});
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
	<header>
		<h1>Development Resources</h1>
		<p class="description">
			A curated and continuously expanding collection of tools, documentation,
			and learning materials. Updated regularly with new discoveries and
			community recommendations.
		</p>
	</header>

	<div class="categories">
		{#each Object.entries(groupedResources) as [category, items]}
			<section class="category">
				<h2>
					<span class="icon">{getCategoryIcon(category)}</span>
					{category}
				</h2>
				<div class="resource-list">
					{#each items as resource}
						<Box width={60}>
							<div class="resource">
								<div class="resource-header">
									<a
										href={resource.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										{resource.title}
									</a>
									{#if resource.stars}
										<Badge>★ {resource.stars.toLocaleString()}</Badge>
									{/if}
								</div>
								<p class="resource-description">{resource.description}</p>
								<a
									href={resource.url}
									target="_blank"
									rel="noopener noreferrer"
									class="url-preview"
								>
									<span class="url-icon">→</span>
									<span class="url-text">{formatUrl(resource.url)}</span>
								</a>
							</div>
						</Box>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</div>

<style>
	.resources {
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		padding: var(--ch4) var(--content-padding);
		font-family: var(--font-mono);
	}

	header {
		margin-bottom: var(--ch8);
		text-align: center;
	}

	h1 {
		margin: 0;
		background: linear-gradient(
			to right,
			var(--accent-color),
			var(--accent-color-hover)
		);
		color: var(--accent-color);
		font-size: var(--font-size-2xl);
		font-weight: 500;
		line-height: var(--line-height-tight);
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.description {
		max-width: 80ch;
		margin: var(--ch2) auto 0;
		color: var(--text-muted);
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
	}

	.categories {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(65ch, 1fr));
		gap: var(--ch6);
		place-items: start center;
		margin-top: var(--ch4);
	}

	.category {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-width: 0;
		max-width: 65ch;
		margin-bottom: 0;
	}

	.category h2 {
		position: sticky;
		top: var(--ch2);
		z-index: 1;
		display: flex;
		gap: var(--ch2);
		align-items: center;
		width: 100%;
		margin: 0 0 var(--ch2);
		padding: var(--ch) 0;
		background: var(--bg-color);
		color: var(--text-color);
		font-size: var(--font-size-lg);
		font-weight: 500;
		backdrop-filter: blur(8px);
	}

	.icon {
		font-size: var(--font-size-xl);
		line-height: 1;
	}

	.resource-list {
		display: grid;
		gap: var(--ch2);
		width: 100%;
	}

	.resource {
		display: grid;
		gap: var(--ch2);
	}

	.resource-header {
		display: flex;
		flex-wrap: wrap;
		gap: var(--ch2);
		justify-content: space-between;
		align-items: center;
	}

	.resource-header a {
		color: var(--accent-color);
		font-size: var(--font-size-base);
		font-weight: 500;
		text-decoration: none;
		transition: color 0.2s ease;
		overflow-wrap: break-word;
		word-break: break-word;
	}

	.resource-header a:hover {
		color: var(--accent-color-hover);
		text-decoration: none;
	}

	.resource-description {
		margin: 0;
		color: var(--text-muted);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
		overflow-wrap: break-word;
		word-break: break-word;
	}

	.url-preview {
		display: flex;
		gap: var(--ch);
		align-items: center;
		padding: var(--ch) var(--ch2);
		border-radius: var(--radius-sm);
		background: var(--bg-darker);
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		text-decoration: none;
		transition: all 0.2s ease;
		overflow: hidden;
	}

	.url-preview:hover {
		background: color-mix(in srgb, var(--bg-darker) 80%, var(--accent-color));
		color: var(--text-color);
	}

	.url-preview:hover .url-icon {
		transform: translateX(2px);
	}

	.url-icon {
		color: var(--accent-color);
		flex-shrink: 0;
		transition: transform 0.2s ease;
	}

	.url-text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		min-width: 0;
	}

	@media (width <= 767px) {
		header {
			margin-bottom: var(--ch4);
		}

		h1 {
			font-size: var(--font-size-xl);
		}

		.category h2 {
			font-size: var(--font-size-md);
		}

		.resources {
			padding: var(--ch2) var(--content-padding);
		}
	}
</style>
