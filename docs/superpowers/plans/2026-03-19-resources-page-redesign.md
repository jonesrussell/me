# Resources Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static link directory with an interactive, opinionated toolkit explorer — markdown-sourced resources with faceted filtering, CLI-styled search, and editorial "why I use this" cards.

**Architecture:** Individual markdown files in `src/lib/data/resources/` are parsed at build time via `import.meta.glob` + `gray-matter`. A pure-function filter service handles category scoping, tag AND filtering, and text search. Filter state syncs to URL query params for shareability. Components: ResourceFilter (controls), ResourceCard (display), ResourceGrid (layout + sections).

**Tech Stack:** SvelteKit, Svelte 5 runes, TypeScript, gray-matter, Vitest, Playwright, CSS container queries

**Spec:** `docs/superpowers/specs/2026-03-19-resources-page-redesign-design.md`

---

## Research Summary

- Current `Resource` interface: `{ title, description, url, category, stars?, featured?, tags? }` in `src/lib/types/resource.ts`
- All ~50 resources hardcoded in `src/routes/resources/+page.ts` as a TypeScript array
- Components: `ResourceSection.svelte` (category wrapper + icon map), `ResourceCard.svelte` (uses `Box.svelte` + `Tag.svelte`)
- `FeaturedVideos.svelte` only used on resources page — safe to remove
- No `gray-matter` in project; no `import.meta.glob` usage anywhere
- Container queries used everywhere (not media queries) for responsive grids
- E2E tests check for `.sections`, `.category-section`, `.resource-grid` CSS classes

## Parallelism

```
Task 1 (foundation)
  ├── Task 2 (loader) ──┐
  ├── Task 3 (filter) ──┤
  ├── Task 4 (content)───┤
  ├── Task 5 (card) ─────┤
  └── Task 6 (filter UI)─┤
                          ├── Task 7 (page integration)
                          └── Task 8 (cleanup + E2E)
```

Tasks 2-6 can run in parallel after Task 1. Task 7 depends on 2-6. Task 8 depends on 7.

---

### Task 1: Add gray-matter and update Resource type

**Files:**
- Modify: `package.json`
- Modify: `src/lib/types/resource.ts`

- [ ] **Step 1: Install gray-matter**

```bash
npm install gray-matter
```

- [ ] **Step 2: Update Resource interface**

Replace the contents of `src/lib/types/resource.ts`:

```typescript
export interface Resource {
	title: string;
	url: string;
	category: string;
	tags: string[];
	description: string;
	dailyDriver?: boolean;
	video?: string;
}
```

- [ ] **Step 3: Run type check**

Run: `npm run check`
Expected: FAIL — the old `+page.ts` explicitly types `const resources: Resource[] = [...]` with `featured` and `stars` properties that no longer exist. This is expected and will be fixed when Task 7 replaces `+page.ts`.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/lib/types/resource.ts
git commit -m "feat: add gray-matter and update Resource type for markdown resources

New schema: required tags[], description from body, dailyDriver/video optional.
Removed: stars, featured, optional tags."
```

---

### Task 2: Create resource loader service with tests

**Files:**
- Create: `src/lib/services/resource-loader.ts`
- Create: `src/lib/services/resource-loader.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/lib/services/resource-loader.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import {
	parseResource,
	loadResources,
	groupByCategory,
	CATEGORY_ORDER
} from './resource-loader';

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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test:unit:run -- src/lib/services/resource-loader.test.ts`
Expected: FAIL (module not found)

- [ ] **Step 3: Implement resource loader**

Create `src/lib/services/resource-loader.ts`:

```typescript
import matter from 'gray-matter';
import type { Resource } from '$lib/types/resource';

export const CATEGORY_ORDER = [
	'Languages & Frameworks',
	'Dev Environment',
	'DevOps & Infrastructure',
	'Libraries & Packages',
	'Learning'
];

export function parseResource(raw: string): Resource {
	const { data, content } = matter(raw);
	return {
		title: data.title,
		url: data.url,
		category: data.category,
		tags: data.tags,
		dailyDriver: data.dailyDriver ?? false,
		video: data.video,
		description: content.trim()
	};
}

export function loadResources(modules: Record<string, string>): Resource[] {
	return Object.entries(modules).map(([, raw]) => parseResource(raw));
}

export function groupByCategory(resources: Resource[]): Map<string, Resource[]> {
	const grouped = new Map<string, Resource[]>();

	for (const cat of CATEGORY_ORDER) {
		grouped.set(cat, []);
	}

	for (const resource of resources) {
		const existing = grouped.get(resource.category);
		if (existing) {
			existing.push(resource);
		} else {
			grouped.set(resource.category, [resource]);
		}
	}

	for (const [, items] of grouped) {
		items.sort((a, b) => {
			if (a.dailyDriver && !b.dailyDriver) return -1;
			if (!a.dailyDriver && b.dailyDriver) return 1;
			return a.title.localeCompare(b.title);
		});
	}

	for (const [cat, items] of grouped) {
		if (items.length === 0) grouped.delete(cat);
	}

	return grouped;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:unit:run -- src/lib/services/resource-loader.test.ts`
Expected: ALL PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/services/resource-loader.ts src/lib/services/resource-loader.test.ts
git commit -m "feat: resource loader service for markdown-based resources

Parses frontmatter with gray-matter, groups by CATEGORY_ORDER,
sorts daily drivers first within categories."
```

---

### Task 3: Create resource filter service with tests

**Files:**
- Create: `src/lib/services/resource-filter.ts`
- Create: `src/lib/services/resource-filter.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/lib/services/resource-filter.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { filterResources, collectTags } from './resource-filter';
import type { Resource } from '$lib/types/resource';

const resources: Resource[] = [
	{
		title: 'Go',
		url: 'https://go.dev',
		category: 'Languages & Frameworks',
		tags: ['backend', 'cli'],
		description: 'My primary backend language.',
		dailyDriver: true
	},
	{
		title: 'SvelteKit',
		url: 'https://svelte.dev',
		category: 'Languages & Frameworks',
		tags: ['frontend', 'ssr'],
		description: 'This site is built with it.',
		dailyDriver: true
	},
	{
		title: 'Docker',
		url: 'https://docker.com',
		category: 'DevOps & Infrastructure',
		tags: ['containers', 'cli'],
		description: 'Containerization platform.',
		dailyDriver: false
	}
];

describe('filterResources', () => {
	it('returns all resources with no filters', () => {
		const result = filterResources(resources, null, [], '');
		expect(result).toHaveLength(3);
	});

	it('filters by category', () => {
		const result = filterResources(resources, 'Languages & Frameworks', [], '');
		expect(result).toHaveLength(2);
		expect(result.every((r) => r.category === 'Languages & Frameworks')).toBe(true);
	});

	it('filters by single tag within category', () => {
		const result = filterResources(resources, 'Languages & Frameworks', ['frontend'], '');
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe('SvelteKit');
	});

	it('uses AND logic for multiple tags', () => {
		const result = filterResources(resources, null, ['backend', 'cli'], '');
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe('Go');
	});

	it('filters by search query across title', () => {
		const result = filterResources(resources, null, [], 'docker');
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe('Docker');
	});

	it('filters by search query across description', () => {
		const result = filterResources(resources, null, [], 'primary');
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe('Go');
	});

	it('filters by search query across tags', () => {
		const result = filterResources(resources, null, [], 'ssr');
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe('SvelteKit');
	});

	it('combines category + tags + search', () => {
		const result = filterResources(resources, 'Languages & Frameworks', ['backend'], 'go');
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe('Go');
	});

	it('returns empty array when nothing matches', () => {
		const result = filterResources(resources, null, [], 'nonexistent');
		expect(result).toHaveLength(0);
	});
});

describe('collectTags', () => {
	it('collects unique tags sorted alphabetically', () => {
		const tags = collectTags(resources);
		expect(tags).toEqual(['backend', 'cli', 'containers', 'frontend', 'ssr']);
	});
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test:unit:run -- src/lib/services/resource-filter.test.ts`
Expected: FAIL (module not found)

- [ ] **Step 3: Implement filter service**

Create `src/lib/services/resource-filter.ts`:

```typescript
import type { Resource } from '$lib/types/resource';

export function filterResources(
	resources: Resource[],
	category: string | null,
	tags: string[],
	search: string
): Resource[] {
	return resources.filter((r) => {
		if (category && r.category !== category) return false;
		if (tags.length > 0 && !tags.every((t) => r.tags.includes(t))) return false;
		if (search) {
			const q = search.toLowerCase();
			const match =
				r.title.toLowerCase().includes(q) ||
				r.description.toLowerCase().includes(q) ||
				r.tags.some((t) => t.toLowerCase().includes(q));
			if (!match) return false;
		}
		return true;
	});
}

export function collectTags(resources: Resource[]): string[] {
	const tags = new Set<string>();
	for (const r of resources) {
		for (const t of r.tags) {
			tags.add(t);
		}
	}
	return [...tags].sort();
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:unit:run -- src/lib/services/resource-filter.test.ts`
Expected: ALL PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/services/resource-filter.ts src/lib/services/resource-filter.test.ts
git commit -m "feat: resource filter service with category, tag, and search support

Category scopes, tags use AND logic, search matches title/description/tags.
Pure functions, no framework dependencies."
```

---

### Task 4: Create resource markdown files

**Files:**
- Create: `src/lib/data/resources/` directory
- Create: 20+ markdown files

- [ ] **Step 1: Create directory**

```bash
mkdir -p src/lib/data/resources
```

- [ ] **Step 2: Create all resource markdown files**

Create each file with frontmatter and an opinionated "why I use this" body. Below are all files to create. Note: descriptions should be Russell's authentic voice — adjust to taste.

**Languages & Frameworks:**

`src/lib/data/resources/go.md`:
```markdown
---
title: Go
url: https://go.dev
category: Languages & Frameworks
tags: [backend, microservices, cli]
dailyDriver: true
---

My primary backend language. Fast compilation, great stdlib, and the concurrency model fits my microservices architecture perfectly. North Cloud, GoFormX, and mp-emailer are all Go.
```

`src/lib/data/resources/sveltekit.md`:
```markdown
---
title: SvelteKit
url: https://svelte.dev
category: Languages & Frameworks
tags: [frontend, ssr, static-site]
dailyDriver: true
---

This site is built with it. Svelte 5 runes, SSG, and the best frontend DX I've used. Once you try it, React feels like writing boilerplate.
```

`src/lib/data/resources/typescript.md`:
```markdown
---
title: TypeScript
url: https://www.typescriptlang.org
category: Languages & Frameworks
tags: [frontend, backend, type-safety]
dailyDriver: true
---

Strict mode, always. Types catch bugs before they happen and make refactoring fearless.
```

`src/lib/data/resources/laravel.md`:
```markdown
---
title: Laravel
url: https://laravel.com
category: Languages & Frameworks
tags: [backend, php, full-stack]
dailyDriver: true
---

All my consumer apps run on Laravel 12 — StreetCode, OreWire, Movies of War, Coforge. Inertia + Vue for the frontend, Fortify for auth.
```

`src/lib/data/resources/vue.md`:
```markdown
---
title: Vue 3
url: https://vuejs.org
category: Languages & Frameworks
tags: [frontend, reactivity]
---

Powers the frontend of all my Laravel apps via Inertia.js. Composition API keeps things clean.
```

**Dev Environment:**

`src/lib/data/resources/neovim.md`:
```markdown
---
title: Neovim
url: https://neovim.io
category: Dev Environment
tags: [editor, terminal, cli]
dailyDriver: true
---

My editor. Fast, modal, and endlessly configurable. LSP support is excellent.
```

`src/lib/data/resources/tmux.md`:
```markdown
---
title: tmux
url: https://github.com/tmux/tmux
category: Dev Environment
tags: [terminal, multiplexer, cli]
dailyDriver: true
---

Terminal multiplexer for managing sessions. Essential for remote work and keeping contexts separated.
```

`src/lib/data/resources/lazygit.md`:
```markdown
---
title: lazygit
url: https://github.com/jesseduffield/lazygit
category: Dev Environment
tags: [git, terminal, cli]
dailyDriver: true
---

TUI for git that makes complex operations visual. Interactive rebase, cherry-pick, and stash management without memorizing flags.
```

`src/lib/data/resources/cursor.md`:
```markdown
---
title: Cursor
url: https://cursor.com
category: Dev Environment
tags: [editor, ai, ide]
---

AI-assisted IDE. I use it alongside Neovim — Cursor for AI pair programming, Neovim for focused editing.
```

**DevOps & Infrastructure:**

`src/lib/data/resources/docker.md`:
```markdown
---
title: Docker
url: https://www.docker.com
category: DevOps & Infrastructure
tags: [containers, devops]
dailyDriver: true
---

Containerization for local dev and production. North Cloud services all run in Docker.
```

`src/lib/data/resources/github-actions.md`:
```markdown
---
title: GitHub Actions
url: https://github.com/features/actions
category: DevOps & Infrastructure
tags: [ci-cd, automation, devops]
dailyDriver: true
---

CI/CD for everything. Build, test, deploy — all my projects use it. This site deploys to GitHub Pages via Actions.
```

`src/lib/data/resources/caddy.md`:
```markdown
---
title: Caddy
url: https://caddyserver.com
category: DevOps & Infrastructure
tags: [web-server, https, devops]
dailyDriver: true
---

Web server with automatic HTTPS. Replaced Nginx for all my production sites. The Caddyfile config is beautifully simple.
```

`src/lib/data/resources/deployer.md`:
```markdown
---
title: Deployer
url: https://deployer.org
category: DevOps & Infrastructure
tags: [deployment, php, automation]
---

Zero-downtime PHP deployments. All Laravel apps use it via GitHub Actions.
```

`src/lib/data/resources/ddev.md`:
```markdown
---
title: DDEV
url: https://ddev.com
category: DevOps & Infrastructure
tags: [local-dev, containers, php]
---

Docker-based local dev for PHP projects. Coforge, Movies of War, and OreWire all use it.
```

**Libraries & Packages:**

`src/lib/data/resources/uber-fx.md`:
```markdown
---
title: Uber FX
url: https://github.com/uber-go/fx
category: Libraries & Packages
tags: [go, dependency-injection]
dailyDriver: true
---

Dependency injection for Go. All my Go services use it. Makes wiring services together clean and testable.
```

`src/lib/data/resources/zap.md`:
```markdown
---
title: Zap
url: https://github.com/uber-go/zap
category: Libraries & Packages
tags: [go, logging, observability]
dailyDriver: true
---

Structured logging for Go. Fast, typed, and pairs perfectly with Uber FX.
```

`src/lib/data/resources/testify.md`:
```markdown
---
title: Testify
url: https://github.com/stretchr/testify
category: Libraries & Packages
tags: [go, testing]
---

Go test assertions and mocking. Clean syntax, good error messages.
```

`src/lib/data/resources/tailwind.md`:
```markdown
---
title: Tailwind CSS
url: https://tailwindcss.com
category: Libraries & Packages
tags: [css, frontend, utility-first]
---

Utility-first CSS framework. Used across all Laravel apps via the Tailwind v4 integration.
```

`src/lib/data/resources/pest.md`:
```markdown
---
title: Pest
url: https://pestphp.com
category: Libraries & Packages
tags: [php, testing]
---

Elegant PHP testing. All Laravel projects use Pest v4 instead of PHPUnit directly.
```

`src/lib/data/resources/inertia.md`:
```markdown
---
title: Inertia.js
url: https://inertiajs.com
category: Libraries & Packages
tags: [full-stack, frontend, php]
---

The bridge between Laravel and Vue. Build SPAs without an API layer. All my Laravel consumer apps use Inertia v2.
```

**Learning:**

`src/lib/data/resources/go-by-example.md`:
```markdown
---
title: Go by Example
url: https://gobyexample.com
category: Learning
tags: [go, tutorial, beginner]
---

Hands-on introduction to Go. Each concept gets a runnable example. Where I'd send anyone starting Go.
```

`src/lib/data/resources/effective-go.md`:
```markdown
---
title: Effective Go
url: https://go.dev/doc/effective_go
category: Learning
tags: [go, best-practices]
---

The official guide to writing idiomatic Go. Still the best resource for understanding Go conventions.
```

`src/lib/data/resources/uber-go-style-guide.md`:
```markdown
---
title: Uber Go Style Guide
url: https://github.com/uber-go/guide
category: Learning
tags: [go, style-guide, best-practices]
---

Production Go conventions from Uber. My Go projects follow this closely — error handling, naming, package structure.
```

`src/lib/data/resources/roadmap-sh.md`:
```markdown
---
title: roadmap.sh
url: https://roadmap.sh
category: Learning
tags: [career, learning-path, beginner]
---

Visual roadmaps for developer career paths. Great for seeing what to learn next and where you stand.
```

`src/lib/data/resources/exercism.md`:
```markdown
---
title: Exercism
url: https://exercism.org
category: Learning
tags: [practice, multi-language, beginner]
---

Practice problems with mentor feedback. Good for picking up a new language through deliberate practice.
```

`src/lib/data/resources/tailwind-google-fonts.md`:
```markdown
---
title: Add a Google Font to Tailwind CSS
url: https://youtu.be/B4v7ZDLxiS4
category: Learning
tags: [css, tailwind, tutorial]
video: B4v7ZDLxiS4
---

My video tutorial on integrating custom Google Fonts with Tailwind CSS.
```

- [ ] **Step 3: Run type check to verify markdown files don't break anything**

Run: `npm run check`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/lib/data/resources/
git commit -m "content: add curated resource markdown files

25 opinionated resource picks across 5 categories:
Languages & Frameworks, Dev Environment, DevOps & Infrastructure,
Libraries & Packages, Learning. Each with 'why I use this' descriptions."
```

---

### Task 5: Create ResourceCard component with tests

**Files:**
- Create: `src/lib/components/resources/ResourceCard.svelte` (replaces existing)
- Create: `src/lib/components/resources/ResourceCard.svelte.test.ts` (new)

- [ ] **Step 1: Write failing tests**

Create `src/lib/components/resources/ResourceCard.svelte.test.ts`:

```typescript
/// <reference types="@testing-library/jest-dom" />
import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import ResourceCard from './ResourceCard.svelte';
import type { Resource } from '$lib/types/resource';

const baseResource: Resource = {
	title: 'Go',
	url: 'https://go.dev',
	category: 'Languages & Frameworks',
	tags: ['backend', 'cli'],
	description: 'My primary backend language.',
	dailyDriver: true
};

describe('ResourceCard', () => {
	it('renders title as external link', () => {
		const { getByRole } = render(ResourceCard, { props: { resource: baseResource } });
		const link = getByRole('link', { name: 'Go' });
		expect(link).toHaveAttribute('href', 'https://go.dev');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('shows daily driver badge when dailyDriver is true', () => {
		const { getByText } = render(ResourceCard, { props: { resource: baseResource } });
		expect(getByText('daily driver')).toBeInTheDocument();
	});

	it('does not show daily driver badge when dailyDriver is false', () => {
		const resource = { ...baseResource, dailyDriver: false };
		const { queryByText } = render(ResourceCard, { props: { resource } });
		expect(queryByText('daily driver')).toBeNull();
	});

	it('renders description', () => {
		const { getByText } = render(ResourceCard, { props: { resource: baseResource } });
		expect(getByText('My primary backend language.')).toBeInTheDocument();
	});

	it('renders tags as buttons', () => {
		const { getByRole } = render(ResourceCard, { props: { resource: baseResource } });
		expect(getByRole('button', { name: 'backend' })).toBeInTheDocument();
		expect(getByRole('button', { name: 'cli' })).toBeInTheDocument();
	});
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test:unit:run -- src/lib/components/resources/ResourceCard.svelte.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement ResourceCard**

Replace `src/lib/components/resources/ResourceCard.svelte`:

```svelte
<script lang="ts">
	import type { Resource } from '$lib/types/resource';

	const { resource, onTagClick } = $props<{
		resource: Resource;
		onTagClick?: (tag: string) => void;
	}>();
</script>

<style>
	.resource-card {
		padding: var(--space-6);
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		transition: border-color var(--transition-base);
	}

	.resource-card[data-daily-driver='true'] {
		border-inline-start: 0.1875rem solid var(--accent-color);
	}

	.resource-card:hover {
		border-color: var(--accent-color);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-2);
	}

	.card-title {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
	}

	.card-title a {
		text-decoration: none;
		color: var(--text-color);
	}

	.card-title a:hover {
		color: var(--accent-color);
	}

	.daily-driver-badge {
		padding: var(--space-1) var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--accent-color);
		background: color-mix(in srgb, var(--accent-color) 10%, transparent);
		border-radius: var(--radius-sm);
		white-space: nowrap;
	}

	.card-description {
		margin: var(--space-3) 0 0 0;
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--text-muted);
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-block-start: var(--space-4);
	}

	.tag-button {
		padding: var(--space-1) var(--space-2);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-muted);
		background: var(--color-mix-light);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: border-color var(--transition-base);
	}

	.tag-button:hover {
		border-color: var(--accent-color);
		color: var(--accent-color);
	}

	.video-embed {
		position: relative;
		margin-block-start: var(--space-4);
		aspect-ratio: 16 / 9;
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.video-embed iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: none;
	}
</style>

<article class="resource-card" data-daily-driver={resource.dailyDriver || undefined}>
	<div class="card-header">
		<h3 class="card-title">
			<a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.title}</a>
		</h3>
		{#if resource.dailyDriver}
			<span class="daily-driver-badge">daily driver</span>
		{/if}
	</div>
	<p class="card-description">{resource.description}</p>
	<div class="card-tags">
		{#each resource.tags as tag (tag)}
			<button
				class="tag-button"
				type="button"
				onclick={() => onTagClick?.(tag)}
			>
				{tag}
			</button>
		{/each}
	</div>
	{#if resource.video}
		<div class="video-embed">
			<iframe
				src="https://www.youtube.com/embed/{resource.video}"
				title={resource.title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
	{/if}
</article>
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:unit:run -- src/lib/components/resources/ResourceCard.svelte.test.ts`
Expected: ALL PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/resources/ResourceCard.svelte src/lib/components/resources/ResourceCard.svelte.test.ts
git commit -m "feat: redesigned ResourceCard with editorial layout

Detailed card with daily driver badge, clickable tags, optional
YouTube embed, and left accent border for daily drivers."
```

---

### Task 6: Create ResourceFilter component with tests

**Files:**
- Create: `src/lib/components/resources/ResourceFilter.svelte`
- Create: `src/lib/components/resources/ResourceFilter.svelte.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/lib/components/resources/ResourceFilter.svelte.test.ts`:

```typescript
/// <reference types="@testing-library/jest-dom" />
import { render } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import ResourceFilter from './ResourceFilter.svelte';

const defaultProps = {
	categories: ['Languages & Frameworks', 'DevOps & Infrastructure'],
	activeCategory: null as string | null,
	activeTags: [] as string[],
	searchQuery: '',
	resultCount: 10,
	totalCount: 10,
	onCategoryChange: vi.fn(),
	onTagRemove: vi.fn(),
	onSearchChange: vi.fn(),
	onClearFilters: vi.fn()
};

describe('ResourceFilter', () => {
	it('renders All button and category buttons', () => {
		const { getByRole } = render(ResourceFilter, { props: defaultProps });
		expect(getByRole('button', { name: 'All' })).toBeInTheDocument();
		expect(getByRole('button', { name: 'Languages & Frameworks' })).toBeInTheDocument();
		expect(getByRole('button', { name: 'DevOps & Infrastructure' })).toBeInTheDocument();
	});

	it('renders search input', () => {
		const { getByPlaceholderText } = render(ResourceFilter, { props: defaultProps });
		expect(getByPlaceholderText('grep -i "..."')).toBeInTheDocument();
	});

	it('shows result count when filtered', () => {
		const { getByText } = render(ResourceFilter, {
			props: { ...defaultProps, resultCount: 3 }
		});
		expect(getByText('3 of 10 resources')).toBeInTheDocument();
	});

	it('shows total count when unfiltered', () => {
		const { getByText } = render(ResourceFilter, { props: defaultProps });
		expect(getByText('10 resources')).toBeInTheDocument();
	});

	it('renders active tag pills with remove buttons', () => {
		const { getByRole } = render(ResourceFilter, {
			props: { ...defaultProps, activeTags: ['backend'] }
		});
		expect(getByRole('button', { name: 'Remove backend filter' })).toBeInTheDocument();
	});
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test:unit:run -- src/lib/components/resources/ResourceFilter.svelte.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement ResourceFilter**

Create `src/lib/components/resources/ResourceFilter.svelte`:

```svelte
<script lang="ts">
	const {
		categories,
		activeCategory,
		activeTags,
		searchQuery,
		resultCount,
		totalCount,
		onCategoryChange,
		onTagRemove,
		onSearchChange,
		onClearFilters
	} = $props<{
		categories: string[];
		activeCategory: string | null;
		activeTags: string[];
		searchQuery: string;
		resultCount: number;
		totalCount: number;
		onCategoryChange: (category: string | null) => void;
		onTagRemove: (tag: string) => void;
		onSearchChange: (query: string) => void;
		onClearFilters: () => void;
	}>();

	const isFiltered = $derived(
		activeCategory !== null || activeTags.length > 0 || searchQuery.length > 0
	);
</script>

<style>
	.filter-bar {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.category-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.category-button {
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition:
			border-color var(--transition-base),
			color var(--transition-base),
			background var(--transition-base);
	}

	.category-button:hover {
		border-color: var(--accent-color);
		color: var(--text-color);
	}

	.category-button[aria-pressed='true'] {
		color: var(--accent-color);
		background: color-mix(in srgb, var(--accent-color) 10%, var(--bg-darker));
		border-color: var(--accent-color);
	}

	.search-wrapper {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		font-family: var(--font-mono);
		transition: border-color var(--transition-base);
	}

	.search-wrapper:focus-within {
		border-color: var(--accent-color);
	}

	.search-prefix {
		color: var(--accent-color);
		font-size: var(--font-size-sm);
		user-select: none;
	}

	.search-input {
		flex: 1;
		padding: 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-color);
		background: transparent;
		border: none;
		outline: none;
	}

	.search-input::placeholder {
		color: var(--text-muted);
	}

	.active-filters {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2);
	}

	.filter-pill {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		padding: var(--space-1) var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--accent-color);
		background: color-mix(in srgb, var(--accent-color) 10%, transparent);
		border: 1px solid color-mix(in srgb, var(--accent-color) 30%, transparent);
		border-radius: var(--radius-sm);
	}

	.pill-remove {
		padding: 0;
		font-size: var(--font-size-xs);
		color: var(--text-muted);
		background: none;
		border: none;
		cursor: pointer;
		line-height: 1;
	}

	.pill-remove:hover {
		color: var(--accent-color);
	}

	.result-count {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.clear-button {
		padding: var(--space-1) var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-muted);
		background: none;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		cursor: pointer;
	}

	.clear-button:hover {
		border-color: var(--accent-color);
		color: var(--accent-color);
	}
</style>

<div class="filter-bar">
	<div class="category-buttons" role="group" aria-label="Filter by category">
		<button
			class="category-button"
			aria-pressed={activeCategory === null}
			onclick={() => onCategoryChange(null)}
		>
			All
		</button>
		{#each categories as category (category)}
			<button
				class="category-button"
				aria-pressed={activeCategory === category}
				onclick={() => onCategoryChange(activeCategory === category ? null : category)}
			>
				{category}
			</button>
		{/each}
	</div>

	<div class="search-wrapper">
		<span class="search-prefix" aria-hidden="true">$</span>
		<input
			class="search-input"
			type="search"
			placeholder='grep -i "..."'
			value={searchQuery}
			oninput={(e) => onSearchChange(e.currentTarget.value)}
			aria-label="Search resources"
		/>
	</div>

	{#if isFiltered}
		<div class="active-filters">
			{#each activeTags as tag (tag)}
				<span class="filter-pill">
					{tag}
					<button
						class="pill-remove"
						onclick={() => onTagRemove(tag)}
						aria-label="Remove {tag} filter"
					>
						&times;
					</button>
				</span>
			{/each}
			<span class="result-count">
				{#if resultCount < totalCount}
					{resultCount} of {totalCount} resources
				{:else}
					{totalCount} resources
				{/if}
			</span>
			<button class="clear-button" onclick={onClearFilters}>clear</button>
		</div>
	{:else}
		<div class="active-filters">
			<span class="result-count">{totalCount} resources</span>
		</div>
	{/if}
</div>
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:unit:run -- src/lib/components/resources/ResourceFilter.svelte.test.ts`
Expected: ALL PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/resources/ResourceFilter.svelte src/lib/components/resources/ResourceFilter.svelte.test.ts
git commit -m "feat: ResourceFilter component with category toggles and CLI search

Category buttons, tag filter pills, CLI-styled search input,
result count, and clear-all button."
```

---

### Task 7: Rewire page loader, page component, and add ResourceGrid

**Files:**
- Create: `src/lib/components/resources/ResourceGrid.svelte`
- Modify: `src/routes/resources/+page.ts`
- Modify: `src/routes/resources/+page.svelte`

- [ ] **Step 1: Create ResourceGrid component**

Create `src/lib/components/resources/ResourceGrid.svelte`:

```svelte
<script lang="ts">
	import ResourceCard from './ResourceCard.svelte';
	import type { Resource } from '$lib/types/resource';

	const { groupedResources, onTagClick, onClearFilters } = $props<{
		groupedResources: Map<string, Resource[]>;
		onTagClick?: (tag: string) => void;
		onClearFilters?: () => void;
	}>();
</script>

<style>
	.resource-grid {
		display: grid;
		gap: var(--space-12);
	}

	.category-section {
		display: grid;
		gap: var(--space-4);
	}

	.category-title {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	.category-cards {
		container-type: inline-size;
		container-name: category-cards;
		display: grid;
		gap: var(--space-4);
	}

	@container category-cards (min-width: 50rem) {
		.category-cards {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.empty-state {
		padding: var(--space-8);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		text-align: center;
		color: var(--text-muted);
	}

	.empty-state p {
		margin: var(--space-1) 0;
	}

	.clear-button {
		margin-block-start: var(--space-4);
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		background: none;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		cursor: pointer;
	}

	.clear-button:hover {
		border-color: var(--accent-color);
		color: var(--accent-color);
	}
</style>

{#if groupedResources.size > 0}
	<div class="resource-grid">
		{#each [...groupedResources] as [category, resources] (category)}
			<section class="category-section" aria-label="{category} resources">
				<h2 class="category-title">{category}</h2>
				<div class="category-cards">
					{#each resources as resource (resource.title)}
						<ResourceCard {resource} {onTagClick} />
					{/each}
				</div>
			</section>
		{/each}
	</div>
{:else}
	<div class="empty-state" role="status">
		<p>$ grep "query" ./resources</p>
		<p>→ no matches</p>
		{#if onClearFilters}
			<button class="clear-button" onclick={onClearFilters}>clear filters</button>
		{/if}
	</div>
{/if}
```

- [ ] **Step 2: Rewire page loader**

Replace `src/routes/resources/+page.ts` with:

```typescript
import { loadResources } from '$lib/services/resource-loader';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const modules = import.meta.glob('$lib/data/resources/*.md', {
		query: '?raw',
		eager: true
	}) as Record<string, string>;

	// import.meta.glob with ?raw wraps content in { default: string }
	const rawModules: Record<string, string> = {};
	for (const [path, mod] of Object.entries(modules)) {
		rawModules[path] = typeof mod === 'string' ? mod : (mod as { default: string }).default;
	}

	const resources = loadResources(rawModules);

	return { resources };
};
```

- [ ] **Step 3: Rewire page component**

Replace `src/routes/resources/+page.svelte` with:

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import Hero from '$lib/components/ui/Hero.svelte';
	import ResourceFilter from '$lib/components/resources/ResourceFilter.svelte';
	import ResourceGrid from '$lib/components/resources/ResourceGrid.svelte';
	import { filterResources } from '$lib/services/resource-filter';
	import { groupByCategory, CATEGORY_ORDER } from '$lib/services/resource-loader';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();

	let activeCategory = $state<string | null>(null);
	let activeTags = $state<string[]>([]);
	let searchQuery = $state('');

	// Initialize filter state from URL params (client-side only)
	$effect(() => {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams(window.location.search);
		const cat = params.get('category');
		const tags = params.getAll('tag');
		const q = params.get('q');
		if (cat) activeCategory = cat;
		if (tags.length > 0) activeTags = tags;
		if (q) searchQuery = q;
	});

	const filtered = $derived(filterResources(data.resources, activeCategory, activeTags, searchQuery));
	const grouped = $derived(groupByCategory(filtered));

	function updateUrl() {
		const url = new URL(page.url);
		url.searchParams.delete('category');
		url.searchParams.delete('tag');
		url.searchParams.delete('q');
		if (activeCategory) url.searchParams.set('category', activeCategory);
		for (const tag of activeTags) url.searchParams.append('tag', tag);
		if (searchQuery) url.searchParams.set('q', searchQuery);
		goto(url.toString(), { replaceState: true, noScroll: true, keepFocus: true });
	}

	function handleCategoryChange(category: string | null) {
		activeCategory = category;
		updateUrl();
	}

	function handleTagClick(tag: string) {
		if (!activeTags.includes(tag)) {
			activeTags = [...activeTags, tag];
			updateUrl();
		}
	}

	function handleTagRemove(tag: string) {
		activeTags = activeTags.filter((t) => t !== tag);
		updateUrl();
	}

	function handleSearchChange(query: string) {
		searchQuery = query;
		updateUrl();
	}

	function handleClearFilters() {
		activeCategory = null;
		activeTags = [];
		searchQuery = '';
		updateUrl();
	}
</script>

<style>
	.resources {
		container-type: inline-size;
		container-name: resources-page;
		display: grid;
		width: 100%;
		padding: var(--space-16) 0;
		gap: var(--space-8);
	}

	.container {
		display: grid;
		width: 100%;
		margin-inline: auto;
		padding-inline: var(--space-4);
		max-width: min(var(--measure), 95cqi);
		gap: var(--space-8);
	}

	@container resources-page (min-width: 40rem) {
		.container {
			padding-inline: var(--space-8);
		}
	}

	@container resources-page (min-width: 48rem) {
		.container {
			padding-inline: var(--space-12);
		}
	}

	@container resources-page (min-width: 64rem) {
		.container {
			padding-inline: var(--space-16);
		}
	}

	@container resources-page (min-width: 80rem) {
		.container {
			padding-inline: var(--space-20);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			transition: none;
			animation: none;
		}
	}
</style>

<svelte:head>
	<title>Resources | Russell Jones - Curated Developer Toolkit</title>
	<meta
		name="description"
		content="My opinionated picks for languages, tools, libraries, and learning resources. Go, SvelteKit, Docker, Neovim, and more — with context on why I use each one."
	/>
</svelte:head>

<Hero title="Resources" subtitle="// cat bookmarks.md" variant="resources" />

<div class="resources">
	<div class="container">
		<ResourceFilter
			categories={CATEGORY_ORDER}
			{activeCategory}
			{activeTags}
			{searchQuery}
			resultCount={filtered.length}
			totalCount={data.resources.length}
			onCategoryChange={handleCategoryChange}
			onTagRemove={handleTagRemove}
			onSearchChange={handleSearchChange}
			onClearFilters={handleClearFilters}
		/>

		<ResourceGrid groupedResources={grouped} onTagClick={handleTagClick} onClearFilters={handleClearFilters} />
	</div>
</div>
```

- [ ] **Step 4: Run unit tests**

Run: `npm run test:unit:run`
Expected: ALL PASS

- [ ] **Step 5: Run type check**

Run: `npm run check`
Expected: PASS

- [ ] **Step 6: Run lint**

Run: `npm run lint`
Expected: PASS (fix any container query or unit issues)

- [ ] **Step 7: Commit**

```bash
git add src/lib/components/resources/ResourceGrid.svelte src/routes/resources/+page.ts src/routes/resources/+page.svelte
git commit -m "feat: rewire resources page with markdown loader and filter UI

ResourceGrid with category sections, ResourceFilter with category
toggles and CLI search, filter state synced to URL query params.
Data loaded from markdown files via import.meta.glob + gray-matter."
```

---

### Task 8: Cleanup old components and update E2E tests

**Files:**
- Delete: `src/lib/components/resources/ResourceSection.svelte`
- Delete: `src/lib/components/video/FeaturedVideos.svelte`
- Modify: `tests/resources.spec.ts`

- [ ] **Step 1: Delete old components**

```bash
rm src/lib/components/resources/ResourceSection.svelte
```

Check if `FeaturedVideos.svelte` is imported anywhere besides the old resources page:

```bash
grep -r "FeaturedVideos" src/ --include="*.svelte" --include="*.ts"
```

If only referenced in the old page (which has been replaced), delete:

```bash
rm src/lib/components/video/FeaturedVideos.svelte
```

- [ ] **Step 2: Update E2E tests**

Replace `tests/resources.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Resources Page', () => {
	test.setTimeout(90000);

	test('should load the resources page successfully', async ({ page }) => {
		await page.goto('/resources', { waitUntil: 'domcontentloaded' });

		await Promise.all([
			expect(page.locator('h1', { hasText: 'Resources' })).toBeVisible({ timeout: 15000 }),
			expect(page.locator('.filter-bar')).toBeVisible({ timeout: 15000 })
		]);

		const sections = page.locator('.category-section');
		const count = await sections.count();
		expect(count).toBeGreaterThanOrEqual(3);
	});

	test('should display resource cards with content', async ({ page }) => {
		await page.goto('/resources', { waitUntil: 'domcontentloaded' });

		await page.waitForSelector('.resource-card', { timeout: 30000 });

		const firstCard = page.locator('.resource-card').first();
		await Promise.all([
			expect(firstCard.locator('h3')).toBeVisible({ timeout: 10000 }),
			expect(firstCard.locator('a')).toBeVisible({ timeout: 10000 })
		]);
	});

	test('should filter by category', async ({ page }) => {
		await page.goto('/resources', { waitUntil: 'domcontentloaded' });

		await page.waitForSelector('.resource-card', { timeout: 30000 });

		const allCount = await page.locator('.resource-card').count();

		await page.getByRole('button', { name: 'Languages & Frameworks' }).click();

		const filteredCount = await page.locator('.resource-card').count();
		expect(filteredCount).toBeLessThan(allCount);
		expect(filteredCount).toBeGreaterThan(0);
	});

	test('should search resources', async ({ page }) => {
		await page.goto('/resources', { waitUntil: 'domcontentloaded' });

		await page.waitForSelector('.resource-card', { timeout: 30000 });

		await page.getByLabel('Search resources').fill('Go');

		const results = page.locator('.resource-card');
		const count = await results.count();
		expect(count).toBeGreaterThan(0);
	});

	test('should initialize filters from URL params', async ({ page }) => {
		await page.goto('/resources?category=Languages+%26+Frameworks', {
			waitUntil: 'domcontentloaded'
		});

		await page.waitForSelector('.resource-card', { timeout: 30000 });

		const sections = page.locator('.category-section');
		const count = await sections.count();
		expect(count).toBe(1);

		const sectionTitle = sections.first().locator('h2');
		await expect(sectionTitle).toHaveText('Languages & Frameworks');
	});

	test('should have proper external links', async ({ page }) => {
		await page.goto('/resources', { waitUntil: 'domcontentloaded' });

		await page.waitForSelector('.resource-card', { timeout: 30000 });

		const links = page.locator('.resource-card h3 a');
		const count = await links.count();
		for (let i = 0; i < Math.min(count, 5); i++) {
			const link = links.nth(i);
			await expect(link).toHaveAttribute('target', '_blank');
			await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
		}
	});
});
```

- [ ] **Step 3: Run unit tests**

Run: `npm run test:unit:run`
Expected: ALL PASS

- [ ] **Step 4: Run E2E tests**

Run: `npx playwright test --project=chromium tests/resources.spec.ts`
Expected: ALL PASS

- [ ] **Step 5: Run full validation**

Run: `npm run validate`
Expected: Types + lint + tests all pass

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: remove old resource components, update E2E tests

Remove ResourceSection.svelte and FeaturedVideos.svelte (replaced by
ResourceGrid + integrated video cards). E2E tests updated for new
filter UI, category sections, and search functionality."
```

## E2E Test Recipe

1. Run unit tests: `npm run test:unit:run`
2. Run E2E tests: `npx playwright test --project=chromium`
3. Run full validation: `npm run validate`
4. Visual check: `npm run dev` — verify resources page at `/resources`

## Conventions
- No `px` or `em` units — use `rem`, `ch`, `%`, `cqi`, design tokens
- Use logical properties (`start`/`end` not `left`/`right`, `inline`/`block` not top/bottom)
- Container queries preferred over media queries
- Svelte 5 runes only — `$state`, `$derived`, `$effect`, `$props`
- TDD: write failing tests first, then implement
- External links: `target="_blank"` + `rel="noopener noreferrer"`