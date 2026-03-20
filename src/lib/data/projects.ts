import type { Project } from '$lib/types/project';

/**
 * Ordered list of projects: framework first, then platform, consumer sites, then tools.
 * Image paths are relative to site root; resolve with base in the page.
 */
export const projects: Project[] = [
	// --- Waaseyaa Ecosystem (framework) ---
	{
		title: 'Waaseyaa Framework',
		description:
			'PHP CMS framework: a 43-package monorepo powering multiple sites with content management, authentication, and a Nuxt 3 admin dashboard.',
		tags: ['PHP 8.4+', 'Symfony 7.x', 'Nuxt 3', 'Doctrine'],
		url: 'https://github.com/waaseyaa/framework',
		siteUrl: 'https://waaseyaa.org',
		githubUrl: 'https://github.com/waaseyaa/framework',
		status: 'active',
		image: 'images/projects/placeholder.png',
		type: 'framework'
	},
	{
		title: 'Minoo',
		description:
			'Indigenous knowledge platform built on Waaseyaa, with full Ojibwe translation and community-driven content.',
		tags: ['Waaseyaa', 'PHP', 'Nuxt'],
		url: 'https://minoo.live',
		siteUrl: 'https://minoo.live',
		githubUrl: 'https://github.com/waaseyaa/minoo',
		status: 'active',
		image: 'images/projects/placeholder.png',
		type: 'framework'
	},
	{
		title: 'Claudriel',
		description:
			'Personal operations SaaS: commitment management, scheduling, and daily workflows built on Waaseyaa.',
		tags: ['Waaseyaa', 'PHP', 'Vue'],
		url: 'https://github.com/jonesrussell/claudriel',
		githubUrl: 'https://github.com/jonesrussell/claudriel',
		status: 'development',
		image: 'images/projects/placeholder.png',
		type: 'framework'
	},
	{
		title: 'waaseyaa.org',
		description:
			'Framework marketing site and Discord community hub for the Waaseyaa ecosystem.',
		tags: ['PHP', 'Caddy'],
		url: 'https://waaseyaa.org',
		siteUrl: 'https://waaseyaa.org',
		status: 'active',
		image: 'images/projects/placeholder.png',
		type: 'framework'
	},

	// --- Content Pipeline (platform) ---
	{
		title: 'North Cloud',
		description:
			'My expanding content platform: crawl, classify, and publish to Redis. Powers the consumer sites below with a pipeline of Go microservices, Elasticsearch, and Redis Pub/Sub.',
		tags: ['Go', 'Elasticsearch', 'Redis', 'Vue', 'Docker'],
		url: 'https://github.com/jonesrussell/north-cloud',
		siteUrl: 'https://northcloud.biz',
		githubUrl: 'https://github.com/jonesrussell/north-cloud',
		status: 'active',
		image: 'images/projects/north-cloud.webp',
		imageSrcset: [
			{ path: 'images/projects/north-cloud-480.webp', width: 480 },
			{ path: 'images/projects/north-cloud-960.webp', width: 960 }
		],
		imageSizes: '(max-width: 30rem) 100vw, (max-width: 50rem) 40vw, 25vw',
		type: 'platform'
	},

	// --- Consumer Sites ---
	{
		title: 'Coforge',
		description:
			'Co-founder matchmaking: developers and entrepreneurs pitch projects to find their perfect co-founder. Ingestes North Cloud articles for feeds and contextual matching.',
		tags: ['Laravel', 'Vue', 'Inertia', 'Redis', 'Tailwind'],
		url: 'https://coforge.xyz',
		siteUrl: 'https://coforge.xyz',
		githubUrl: 'https://github.com/jonesrussell/coforge',
		status: 'development',
		image: 'images/projects/coforge.webp',
		imageSrcset: [
			{ path: 'images/projects/coforge-480.webp', width: 480 },
			{ path: 'images/projects/coforge-960.webp', width: 960 }
		],
		imageSizes: '(max-width: 30rem) 100vw, (max-width: 50rem) 40vw, 25vw',
		type: 'consumer'
	},
	{
		title: 'Movies of War',
		description:
			'War films and related news: links classified war articles from North Cloud to movies and people, with search and discovery.',
		tags: ['Laravel', 'Vue', 'Redis', 'MariaDB'],
		url: 'https://movies-of-war.com',
		siteUrl: 'https://movies-of-war.com',
		githubUrl: 'https://github.com/jonesrussell/movies-of-war.com',
		status: 'active',
		image: 'images/projects/movies-of-war.webp',
		imageSrcset: [
			{ path: 'images/projects/movies-of-war-480.webp', width: 480 },
			{ path: 'images/projects/movies-of-war-960.webp', width: 960 }
		],
		imageSizes: '(max-width: 30rem) 100vw, (max-width: 50rem) 40vw, 25vw',
		type: 'consumer'
	},
	{
		title: 'OreWire',
		description:
			'Mining news and drill results: ingests North Cloud mining articles via HTTP API with commodity, company, and jurisdiction filters.',
		tags: ['Laravel', 'Vue', 'Inertia', 'MariaDB'],
		url: 'https://orewire.ca',
		siteUrl: 'https://orewire.ca',
		githubUrl: 'https://github.com/jonesrussell/orewire-laravel',
		status: 'active',
		image: 'images/projects/orewire.webp',
		imageSrcset: [
			{ path: 'images/projects/orewire-480.webp', width: 480 },
			{ path: 'images/projects/orewire-960.webp', width: 960 }
		],
		imageSizes: '(max-width: 30rem) 100vw, (max-width: 50rem) 40vw, 25vw',
		type: 'consumer'
	},
	{
		title: 'StreetCode',
		description:
			'Crime news aggregation: ingests articles via Redis pub/sub, with full-text search, tagging, and source filtering.',
		tags: ['Laravel', 'Vue', 'Inertia', 'Redis', 'Horizon'],
		url: 'https://streetcode.net',
		siteUrl: 'https://streetcode.net',
		githubUrl: 'https://github.com/jonesrussell/streetcode-laravel',
		status: 'active',
		image: 'images/projects/streetcode.webp',
		imageSrcset: [
			{ path: 'images/projects/streetcode-480.webp', width: 480 },
			{ path: 'images/projects/streetcode-960.webp', width: 960 }
		],
		imageSizes: '(max-width: 30rem) 100vw, (max-width: 50rem) 40vw, 25vw',
		type: 'consumer'
	},
	{
		title: 'Diidjaaheer',
		description:
			'Indigenous cultural platform: community content, event listings, and North Cloud article feeds via Redis.',
		tags: ['Laravel', 'Vue', 'Inertia', 'Redis'],
		url: 'https://diidjaaheer.live',
		siteUrl: 'https://diidjaaheer.live',
		githubUrl: 'https://github.com/jonesrussell/diidjaaheer',
		status: 'active',
		image: 'images/projects/placeholder.png',
		type: 'consumer'
	},

	// --- Developer Tools ---
	{
		title: 'Laravel Boost',
		description:
			'MCP server for Laravel and DDEV development: provides context-aware tooling for AI-assisted Laravel workflows.',
		tags: ['PHP', 'MCP', 'DDEV'],
		url: 'https://github.com/jonesrussell/boost',
		githubUrl: 'https://github.com/jonesrussell/boost',
		status: 'active',
		image: 'images/projects/placeholder.png',
		type: 'tool'
	},
	{
		title: 'Claudia',
		description:
			'MCP installer and compound tools memory system: manages MCP server installations and provides persistent tool context.',
		tags: ['TypeScript', 'MCP'],
		url: 'https://github.com/jonesrussell/claudia',
		githubUrl: 'https://github.com/jonesrussell/claudia',
		status: 'active',
		image: 'images/projects/placeholder.png',
		type: 'tool'
	},
	{
		title: 'GoFormX',
		description:
			'Form builder with a Go API backend and Laravel frontend: create, manage, and embed forms with drag-and-drop editing.',
		tags: ['Go', 'Laravel', 'Echo'],
		url: 'https://github.com/goformx/goforms',
		githubUrl: 'https://github.com/goformx/goforms',
		status: 'development',
		image: 'images/projects/placeholder.png',
		type: 'tool'
	},
	{
		title: 'MP Emailer',
		description:
			'A web app that helps constituents easily contact their MPs through email campaigns on important issues.',
		tags: ['Go', 'Echo', 'MariaDB', 'Tailwind CSS', 'JWT'],
		url: 'https://github.com/jonesrussell/mp-emailer',
		githubUrl: 'https://github.com/jonesrussell/mp-emailer',
		status: 'development',
		image: 'images/projects/placeholder.png',
		type: 'tool'
	}
];
