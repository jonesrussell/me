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
		summary:
			'An open-source PHP framework for structured content, explicit permissions and publishing workflows.',
		technologies: ['PHP 8.5', 'Symfony', 'SQLite', 'Nuxt'],
		status: 'Alpha · website running alpha.305',
		problem:
			'Content applications need a model, clear permissions and a publishing process that fits their work. I am building Waaseyaa so those foundations can be reused in software people own and host themselves.',
		constraints:
			'Package boundaries must be explicit. Applications need predictable persistence, access control and extension contracts, with support claims tied to evidence.',
		contribution:
			'I develop the framework architecture, package contracts and application integrations, including the foundations used by GoFormX. I also build and operate waaseyaa.org as a working Framework application.',
		decisions:
			'Framework is the reusable engine, delivered through Composer packages. Studio is a separate open-source builder distribution that composes it. Applications can use Framework independently, with explicit access rules and publishing contracts. The S1 profile targets one application node with an authoritative local SQLite database.',
		result:
			'Waaseyaa.org runs alpha.305 and publishes Git-authored content through HTML, Markdown and read-only MCP. Its developer-first site connects a four-part build guide, a tested Todo walkthrough and curated framework documentation. The October 4, 2026 deployment passed all 27 public smoke checks.',
		limitations:
			'Waaseyaa remains alpha. The website deployment demonstrates one application, not universal production support or a completed Studio builder journey. The homepage Fieldnotes interaction is a browser-only simulation; the Todo walkthrough is the maintained starting point.',
		flow: ['Entity definitions', 'Framework packages', 'Your application'],
		links: [
			{ label: 'Explore Waaseyaa', href: 'https://waaseyaa.org' },
			{ label: 'Build guide', href: 'https://waaseyaa.org/build' },
			{ label: 'Framework docs', href: 'https://waaseyaa.org/docs' },
			{ label: 'Framework source', href: 'https://github.com/waaseyaa/framework' }
		],
		evidence:
			'Framework/Studio product boundaries and waaseyaa.org deployment verified October 4, 2026.'
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
