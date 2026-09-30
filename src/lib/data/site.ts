export const services = [
	{
		number: '01',
		title: 'Architecture & technical review',
		situation:
			'You have an existing system, a difficult decision, or an idea that needs a clearer shape.',
		work: 'Review the structure, constraints and risks. Make the tradeoffs visible and identify a practical next step.',
		deliverable: 'An assessment and prioritized plan, with scope agreed before work begins.'
	},
	{
		number: '02',
		title: 'Platform development & modernization',
		situation:
			'You need a content platform, a custom application, or a better foundation for software you already run.',
		work: 'Design and build around your needs, using open technologies, explicit boundaries and maintainable code.',
		deliverable:
			'A scoped implementation, verification and documentation for the people who will own it.'
	},
	{
		number: '03',
		title: 'Practical AI workflows',
		situation:
			'You want to bring AI into development or operations without losing control of your data and decisions.',
		work: 'Find a bounded use case, connect useful tools and define where human review belongs.',
		deliverable: 'A focused pilot with evaluation criteria and clear review practices.'
	}
];

export const caseStudies = [
	{
		slug: 'goformx',
		name: 'GoFormX',
		kind: 'Personal product',
		headline: 'One home for forms across your sites.',
		summary: 'A form backend and shared inbox, built to fit the AI tools developers already use.',
		technologies: ['Go', 'PHP', 'Waaseyaa', 'PostgreSQL'],
		status: 'Deployed · evolving',
		problem:
			'Launching another site should not mean building another form backend or losing track of another inbox. I started GoFormX to collect and manage forms across the sites I build.',
		constraints:
			'Collection must work independently of an AI provider. Public websites need a safe submission endpoint, while management and inbox access stay scoped to the right account.',
		contribution:
			'I shape the product direction and develop the Go submission service, Waaseyaa control plane and integration contracts.',
		decisions:
			'Go owns schemas, immutable versions and submissions. The PHP control plane owns human accounts and the inbox. A documented API is the foundation for assistant integrations, so the account and forms can outlive a particular tool.',
		result:
			'A local journey collected submissions from two sites into one authorized inbox. The September 30, 2026 deployment separately verified HTTPS, account signup, login, dashboard and logout.',
		limitations:
			'Deployment checks do not establish production first-use acceptance. Assistant compatibility and notification delivery need their own qualification; mail was deferred at deployment.',
		flow: ['Your websites', 'GoFormX', 'Shared inbox'],
		links: [
			{ label: 'Visit GoFormX', href: 'https://www.goformx.com' },
			{ label: 'Go service source', href: 'https://github.com/goformx/goformx' }
		],
		evidence:
			'Product direction and local journey, September 29; deployment record, September 30, 2026.'
	},
	{
		slug: 'waaseyaa',
		name: 'Waaseyaa',
		kind: 'Open-source framework',
		headline: 'A foundation for software you own.',
		summary: 'An entity-first PHP framework for content management and data-driven applications.',
		technologies: ['PHP 8.5', 'Symfony', 'SQLite', 'Nuxt'],
		status: 'Active development',
		problem:
			'Content systems need reusable foundations without forcing every application into the same product. Waaseyaa explores how entities, access and content workflows can share a clear, modular engine.',
		constraints:
			'Package boundaries must be explicit. Applications need predictable persistence, access control and extension contracts, with support claims tied to evidence.',
		contribution:
			'I develop the framework architecture, package contracts and application integrations, including the foundations used by GoFormX.',
		decisions:
			'Independent Composer packages expose interfaces instead of hidden global coupling. Entity definitions feed the API and assistant tools. The current S1 profile targets one application node with an authoritative local SQLite database.',
		result:
			'The public repository includes modular entity, field, configuration, access and API systems, a project skeleton, in-memory implementations for testing and a Nuxt administration interface.',
		limitations:
			'The complete builder journey and named downstream S1 certification remain pending. These are development capabilities, not a claim of universal production support.',
		flow: ['Entity definitions', 'Framework packages', 'Your application'],
		links: [
			{ label: 'Explore Waaseyaa', href: 'https://waaseyaa.org' },
			{ label: 'Framework source', href: 'https://github.com/waaseyaa/framework' }
		],
		evidence: 'Framework README and support contracts reviewed September 30, 2026.'
	},
	{
		slug: 'north-cloud',
		name: 'North Cloud',
		kind: 'Open-source infrastructure',
		headline: 'From scattered sources to structured content.',
		summary: 'A pipeline for crawling, classifying, searching and distributing articles.',
		technologies: ['Go', 'Elasticsearch', 'Redis', 'Vue'],
		status: 'Active development',
		problem:
			'A useful content feed needs more than a crawler. Sources must be managed, articles normalized and classified, and results routed to the consumers that need them.',
		constraints:
			'Collection, classification and distribution evolve at different speeds. Operators need visibility into each stage, and consumers need a stable way to receive content.',
		contribution:
			'I develop the service architecture, crawl and classification workflows, publishing routes and management tools.',
		decisions:
			'Separate Go services handle source management, crawling, classification and publishing. Elasticsearch holds searchable content; Redis Pub/Sub distributes routed articles. A Vue dashboard and pipeline events expose operational state.',
		result:
			'The public repository documents the crawler-to-publisher pipeline, rule and ML classification, search, consumer integration and Docker development environment.',
		limitations:
			'The repository demonstrates the architecture and implementation. It does not establish customer adoption, uptime or a quantified publishing outcome.',
		flow: ['Collect', 'Classify & search', 'Distribute'],
		links: [{ label: 'Project source', href: 'https://github.com/jonesrussell/north-cloud' }],
		evidence: 'Public README and pipeline documentation reviewed September 30, 2026.'
	}
];
