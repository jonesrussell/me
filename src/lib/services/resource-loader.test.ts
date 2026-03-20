import { describe, it, expect } from 'vitest';
import { parseResource, loadResources, groupByCategory } from './resource-loader';

describe('parseResource', () => {
	it('parses frontmatter and body from markdown', () => {
		const raw = `---
title: Go
url: https://go.dev
category: Languages & Frameworks
tags: [backend, cli]
dailyDriver: true
---

My primary backend language.`;

		const result = parseResource(raw);
		expect(result).toEqual({
			title: 'Go',
			url: 'https://go.dev',
			category: 'Languages & Frameworks',
			tags: ['backend', 'cli'],
			dailyDriver: true,
			video: undefined,
			description: 'My primary backend language.'
		});
	});

	it('defaults dailyDriver to false when omitted', () => {
		const raw = `---
title: Docker
url: https://docker.com
category: DevOps & Infrastructure
tags: [containers]
---

Containerization platform.`;

		const result = parseResource(raw);
		expect(result.dailyDriver).toBe(false);
	});

	it('parses video field when present', () => {
		const raw = `---
title: Tailwind Tutorial
url: https://youtube.com/watch?v=abc
category: Learning
tags: [css, frontend]
video: abc123
---

Great intro to utility-first CSS.`;

		const result = parseResource(raw);
		expect(result.video).toBe('abc123');
	});
});

describe('loadResources', () => {
	it('loads all modules into Resource array', () => {
		const modules: Record<string, string> = {
			'/src/lib/data/resources/go.md': `---
title: Go
url: https://go.dev
category: Languages & Frameworks
tags: [backend]
---

Backend language.`,
			'/src/lib/data/resources/docker.md': `---
title: Docker
url: https://docker.com
category: DevOps & Infrastructure
tags: [containers]
---

Containers.`
		};

		const result = loadResources(modules);
		expect(result).toHaveLength(2);
		expect(result[0].title).toBe('Go');
		expect(result[1].title).toBe('Docker');
	});
});

describe('groupByCategory', () => {
	const resources = [
		{
			title: 'Docker',
			category: 'DevOps & Infrastructure',
			tags: ['containers'],
			description: '',
			url: '',
			dailyDriver: false
		},
		{
			title: 'Go',
			category: 'Languages & Frameworks',
			tags: ['backend'],
			description: '',
			url: '',
			dailyDriver: true
		},
		{
			title: 'TypeScript',
			category: 'Languages & Frameworks',
			tags: ['frontend'],
			description: '',
			url: '',
			dailyDriver: false
		}
	];

	it('groups in CATEGORY_ORDER', () => {
		const grouped = groupByCategory(resources);
		const keys = [...grouped.keys()];
		expect(keys[0]).toBe('Languages & Frameworks');
		expect(keys[1]).toBe('DevOps & Infrastructure');
	});

	it('sorts daily drivers first within category', () => {
		const grouped = groupByCategory(resources);
		const langs = grouped.get('Languages & Frameworks')!;
		expect(langs[0].title).toBe('Go');
		expect(langs[1].title).toBe('TypeScript');
	});

	it('omits empty categories', () => {
		const grouped = groupByCategory(resources);
		expect(grouped.has('Dev Environment')).toBe(false);
	});

	it('appends unknown categories at end', () => {
		const withUnknown = [
			...resources,
			{
				title: 'Mystery',
				category: 'Unknown',
				tags: ['misc'],
				description: '',
				url: '',
				dailyDriver: false
			}
		];
		const grouped = groupByCategory(withUnknown);
		const keys = [...grouped.keys()];
		expect(keys[keys.length - 1]).toBe('Unknown');
	});
});
