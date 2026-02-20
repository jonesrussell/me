import type { Project } from '$lib/types/project';

/**
 * Ordered list of projects: platform first, then consumer sites, then tools.
 * Image paths are relative to site root; resolve with base in the page.
 */
export const projects: Project[] = [
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
		title: 'MP Emailer',
		description:
			'A web app that helps constituents easily contact their MPs through email campaigns on important issues.',
		tags: ['Go', 'Echo', 'MariaDB', 'Tailwind CSS', 'JWT'],
		url: 'https://github.com/jonesrussell/mp-emailer',
		githubUrl: 'https://github.com/jonesrussell/mp-emailer',
		status: 'development',
		image: 'images/projects/placeholder.png',
		type: 'tool'
	},
	{
		title: 'Goforms',
		description: 'Quickly add forms to your web projects.',
		tags: ['Go', 'Echo', 'MariaDB', 'REST API', 'Docker'],
		url: 'https://github.com/goformx/goforms',
		githubUrl: 'https://github.com/goformx/goforms',
		status: 'development',
		image: 'images/projects/placeholder.png',
		type: 'tool'
	},
	{
		title: 'Gimbal',
		description: 'A Gyruss-inspired game built with Ebitengine.',
		tags: ['Go', 'Ebitengine', 'Game Dev', 'WASM'],
		url: 'https://github.com/jonesrussell/gimbal',
		githubUrl: 'https://github.com/jonesrussell/gimbal',
		status: 'development',
		image: 'images/projects/gimbal.webp',
		imageSrcset: [
			{ path: 'images/projects/gimbal-480.webp', width: 480 },
			{ path: 'images/projects/gimbal-960.webp', width: 960 }
		],
		imageSizes: '(max-width: 30rem) 100vw, (max-width: 50rem) 40vw, 25vw',
		type: 'tool'
	}
];
