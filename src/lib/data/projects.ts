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
		status: 'active',
		image: 'images/projects/north-cloud.webp',
		type: 'platform'
	},
	{
		title: 'Coforge',
		description:
			'Co-founder matchmaking: developers and entrepreneurs pitch projects to find their perfect co-founder. Ingestes North Cloud articles for feeds and contextual matching.',
		tags: ['Laravel', 'Vue', 'Inertia', 'Redis', 'Tailwind'],
		url: 'https://coforge.xyz',
		siteUrl: 'https://coforge.xyz',
		status: 'active',
		image: 'images/projects/coforge.webp',
		type: 'consumer'
	},
	{
		title: 'Movies of War',
		description:
			'War films and related news: links classified war articles from North Cloud to movies and people, with search and discovery.',
		tags: ['Laravel', 'Vue', 'Redis', 'MariaDB'],
		url: 'https://movies-of-war.com',
		siteUrl: 'https://movies-of-war.com',
		status: 'active',
		image: 'images/projects/movies-of-war.webp',
		type: 'consumer'
	},
	{
		title: 'OreWire',
		description:
			'Mining news and drill results: ingests North Cloud mining articles via HTTP API with commodity, company, and jurisdiction filters.',
		tags: ['Laravel', 'Vue', 'Inertia', 'MariaDB'],
		url: 'https://orewire.ca',
		siteUrl: 'https://orewire.ca',
		status: 'active',
		image: 'images/projects/orewire.webp',
		type: 'consumer'
	},
	{
		title: 'StreetCode',
		description:
			'Crime news aggregation: ingests articles via Redis pub/sub, with full-text search, tagging, and source filtering.',
		tags: ['Laravel', 'Vue', 'Inertia', 'Redis', 'Horizon'],
		url: 'https://streetcode.net',
		siteUrl: 'https://streetcode.net',
		status: 'active',
		image: 'images/projects/streetcode.webp',
		type: 'consumer'
	},
	{
		title: 'MP Emailer',
		description:
			'A web app that helps constituents easily contact their MPs through email campaigns on important issues.',
		tags: ['Go', 'Echo', 'MariaDB', 'Tailwind CSS', 'JWT'],
		url: 'https://github.com/jonesrussell/mp-emailer',
		status: 'active',
		image: 'images/projects/placeholder.png',
		type: 'tool'
	},
	{
		title: 'Goforms',
		description: 'Quickly add forms to your web projects.',
		tags: ['Go', 'Echo', 'MariaDB', 'REST API', 'Docker'],
		url: 'https://goformx.com/',
		status: 'active',
		image: 'images/projects/placeholder.png',
		type: 'tool'
	},
	{
		title: 'Gimbal',
		description: 'A Gyruss-inspired game built with Ebitengine.',
		tags: ['Go', 'Ebitengine', 'Game Dev', 'WASM'],
		url: 'https://github.com/jonesrussell/gimbal',
		status: 'experimental',
		image: 'images/projects/placeholder.png',
		type: 'tool'
	},
	{
		title: 'GoCrawl',
		description:
			'A simple web crawler built in Go that fetches and processes web pages, storing results in Elasticsearch. Demonstrates Cobra, Colly, Elasticsearch, and Zap.',
		tags: ['Go', 'Web Crawler', 'Elasticsearch', 'CLI', 'Experimental'],
		url: 'https://github.com/jonesrussell/gocrawl',
		status: 'experimental',
		image: 'images/projects/placeholder.png',
		type: 'tool'
	}
];
