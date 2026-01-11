import type { Resource } from '$lib/types/resource';

export function load() {
	const resources: Resource[] = [
		// Featured Content
		{
			title: 'FullStack Dev YouTube',
			url: 'https://www.youtube.com/@fullstackdev42',
			description:
				'Live streams and tutorials on modern web development, AI pair programming, and coding best practices',
			category: 'Essential Tools & Platforms',
			featured: true,
			tags: ['Tutorials', 'Live Coding', 'Web Development', 'AI']
		},
		{
			title: 'Cursor AI',
			url: 'https://cursor.sh',
			description: 'The AI-first code editor. Built for pair programming with AI.',
			category: 'Essential Tools & Platforms',
			featured: true,
			tags: ['AI', 'Code Editor', 'Productivity', 'Pair Programming']
		},

		// Documentation
		{
			title: 'MDN Web Docs',
			url: 'https://developer.mozilla.org',
			description: 'The definitive resource for web development documentation',
			category: 'Documentation',
			tags: ['Web Standards', 'Reference', 'Browser APIs', 'HTML/CSS']
		},
		{
			title: 'Stack Overflow',
			url: 'https://stackoverflow.com',
			description: 'Community-driven Q&A for programmers',
			category: 'Documentation',
			tags: ['Q&A', 'Community', 'Problem Solving', 'Code Examples']
		},
		{
			title: 'DevDocs',
			url: 'https://devdocs.io',
			description: 'Fast, offline, and comprehensive documentation browser',
			category: 'Documentation',
			tags: ['Offline', 'API Docs', 'Reference', 'Search']
		},

		// Go Resources
		{
			title: 'Go by Example',
			url: 'https://github.com/mmcgrana/gobyexample',
			description: 'Annotated example programs for learning Go',
			stars: 7400,
			category: 'Go',
			tags: ['Tutorials', 'Examples', 'Learning', 'Best Practices']
		},
		{
			title: 'Effective Go',
			url: 'https://go.dev/doc/effective_go',
			description: 'Official guide to writing clear, idiomatic Go code',
			category: 'Go',
			tags: ['Official', 'Style Guide', 'Best Practices', 'Idiomatic']
		},
		{
			title: 'Uber Go Style Guide',
			url: 'https://github.com/uber-go/guide',
			description: "Uber's Go style guide with best practices",
			stars: 14200,
			category: 'Go',
			tags: ['Style Guide', 'Best Practices', 'Enterprise', 'Patterns']
		},
		{
			title: 'go-task',
			url: 'https://taskfile.dev',
			description: 'Task runner / simpler Make alternative written in Go',
			stars: 8500,
			category: 'Go',
			tags: ['Task Runner', 'Build Tool', 'Automation', 'CLI']
		},
		{
			title: 'Uber fx',
			url: 'https://github.com/uber-go/fx',
			description: 'Dependency injection system for Go',
			stars: 4200,
			category: 'Go',
			tags: ['Dependency Injection', 'Framework', 'Architecture', 'Enterprise']
		},
		{
			title: 'Uber zap',
			url: 'https://github.com/uber-go/zap',
			description: 'Blazing fast, structured, leveled logging in Go',
			stars: 19300,
			category: 'Go',
			tags: ['Logging', 'Performance', 'Structured', 'Observability']
		},

		// Web Development
		{
			title: 'TypeScript Handbook',
			url: 'https://www.typescriptlang.org/docs/handbook/',
			description: 'Official TypeScript documentation and language guide',
			stars: 9200,
			category: 'Web Development',
			tags: ['TypeScript', 'Official', 'Documentation', 'Type System']
		},
		{
			title: 'Svelte',
			url: 'https://svelte.dev',
			description: 'Cybernetically enhanced web apps',
			stars: 73800,
			category: 'Web Development',
			tags: ['Framework', 'Reactive', 'Compile-time', 'Performance']
		},
		{
			title: 'SvelteKit',
			url: 'https://kit.svelte.dev',
			description: 'Web application framework for Svelte',
			stars: 15600,
			category: 'Web Development',
			tags: ['Framework', 'SSR', 'Routing', 'Full-stack']
		},
		{
			title: 'Vite',
			url: 'https://vitejs.dev',
			description: 'Next generation frontend tooling',
			stars: 59900,
			category: 'Web Development',
			tags: ['Build Tool', 'Dev Server', 'Performance', 'Modern']
		},

		// DevOps
		{
			title: 'Docker',
			url: 'https://www.docker.com',
			description: 'Container platform for modern applications',
			category: 'DevOps',
			tags: ['Containers', 'CI/CD', 'Microservices']
		},
		{
			title: 'Docker Compose',
			url: 'https://docs.docker.com/compose/',
			description: 'Define and run multi-container applications',
			stars: 8500,
			category: 'DevOps',
			tags: ['Orchestration', 'Development', 'Local Testing']
		},
		{
			title: 'GitHub Actions',
			url: 'https://github.com/features/actions',
			description: 'Automate your software workflows',
			category: 'DevOps',
			tags: ['Automation', 'CI/CD', 'Workflows']
		},
		{
			title: 'act',
			url: 'https://github.com/nektos/act',
			description: 'Run GitHub Actions locally',
			stars: 43800,
			category: 'DevOps',
			tags: ['Local Development', 'Testing', 'Debugging']
		},
		{
			title: '12 Factor App',
			url: 'https://12factor.net',
			description: 'Methodology for building modern, scalable, and maintainable software-as-a-service applications',
			category: 'DevOps',
			tags: ['Best Practices', 'Architecture', 'Cloud Native']
		},

		// Tools
		{
			title: 'Neovim',
			url: 'https://neovim.io',
			description: 'Hyperextensible Vim-based text editor',
			stars: 68900,
			category: 'Tools',
			tags: ['Editor', 'Vim', 'Terminal', 'Extensible']
		},
		{
			title: 'tmux',
			url: 'https://github.com/tmux/tmux',
			description: 'Terminal multiplexer for Unix-like systems',
			stars: 31200,
			category: 'Tools',
			tags: ['Terminal', 'Productivity', 'CLI', 'Session Management']
		},
		{
			title: 'lazygit',
			url: 'https://github.com/jesseduffield/lazygit',
			description: 'Simple terminal UI for git commands',
			stars: 37800,
			category: 'Tools',
			tags: ['Git', 'TUI', 'Productivity', 'CLI']
		},
		{
			title: 'Knip',
			url: 'https://github.com/webpro/knip',
			description:
				'Find unused files, dependencies, and exports in your JavaScript and TypeScript projects',
			stars: 3000,
			category: 'Tools',
			tags: ['Code Quality', 'TypeScript', 'JavaScript', 'Maintenance']
		},

		// Learning Paths
		{
			title: 'roadmap.sh',
			url: 'https://roadmap.sh',
			description: 'Community-driven guides and paths to learn different tools and technologies',
			stars: 25300,
			category: 'Learning Paths',
			tags: ['Learning', 'Career', 'Guides', 'Community']
		},
		{
			title: 'freeCodeCamp',
			url: 'https://www.freecodecamp.org',
			description: 'Learn to code for free with interactive tutorials',
			category: 'Learning Paths',
			tags: ['Tutorials', 'Interactive', 'Free', 'Certification']
		},
		{
			title: 'Exercism',
			url: 'https://exercism.org',
			description: 'Improve your coding skills with practice and mentorship',
			category: 'Learning Paths',
			tags: ['Practice', 'Mentorship', 'Exercises', 'Community']
		}
	];

	return { resources };
}
