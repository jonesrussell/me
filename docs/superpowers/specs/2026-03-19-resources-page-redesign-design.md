# Resources Page Redesign

## Problem

The resources page is a flat, generic link directory (~50 hardcoded links across 9 categories). It lacks personality, has no filtering or search, includes resources everyone already knows (MDN, Stack Overflow), and reads like a bookmark dump rather than a curated toolkit. It serves no clear audience and doesn't reflect what Russell actually uses daily.

## Scope

- **In scope**: Complete page redesign — data model, content curation, filtering/search, card layout, video integration
- **Out of scope**: Homepage, other pages, external API integrations, CMS/admin interface

## Audience

Three audiences, in priority order:

1. **Fellow developers** — "here's my curated toolkit, take what's useful"
2. **Potential employers/collaborators** — "here's my stack and how I think about tooling"
3. **Learners** — "here's a guided path through the tools I recommend"

## Design

### Data Model

Each resource is a markdown file in `src/lib/data/resources/` with frontmatter:

```
src/lib/data/resources/
  go.md
  sveltekit.md
  neovim.md
  docker.md
  ...
```

File structure:

```markdown
---
title: Go
url: https://go.dev
category: Languages & Frameworks
tags: [backend, microservices, cli]
dailyDriver: true
video: optional-youtube-embed-id
---

My primary backend language. Fast compilation, great stdlib,
and the concurrency model fits my microservices architecture perfectly.
```

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Resource name |
| `url` | string | yes | External link |
| `category` | string | yes | One of the 5 defined categories |
| `tags` | string[] | yes | Cross-cutting filter tags (every resource must have at least one) |
| `dailyDriver` | boolean | no | Highlights as a core pick (left accent border). Replaces the old `featured` flag with clearer intent — not every previously-featured resource is necessarily a daily driver |
| `video` | string | no | YouTube embed ID — card renders inline player when present |

The markdown body is the opinionated "why I use this" description. This is what gives the page personality — not a copy-paste from the tool's homepage, but Russell's take.

**Dropped fields**: The old `stars` (GitHub star counts) and `description` fields are removed. Star counts were noise — curation is the signal. The description is replaced by the markdown body, which allows for richer, more personal takes.

### Categories

5 curated sections, down from 9. Display order is hardcoded in the loader as an ordered array:

```typescript
const CATEGORY_ORDER = [
  'Languages & Frameworks',
  'Dev Environment',
  'DevOps & Infrastructure',
  'Libraries & Packages',
  'Learning',
];
```

| Category | Content |
|---|---|
| Languages & Frameworks | Go, SvelteKit, TypeScript, Laravel, PHP |
| Dev Environment | Neovim, tmux, lazygit, Cursor AI, terminal setup |
| DevOps & Infrastructure | Docker, GitHub Actions, Caddy, Deployer |
| Libraries & Packages | Uber FX, Zap, Testify, Pest, Tailwind |
| Learning | roadmap.sh, Exercism, Go by Example, Effective Go |

Each section should have 3-8 resources. Any resource with a `category` not in `CATEGORY_ORDER` is appended at the end (future-proofs adding categories without code changes).

### Page Layout

```
Hero (compact, left-aligned — already implemented)
Filter Bar (category toggles + search)
Active Filters (pills showing current state + result count)
Section: Languages & Frameworks
  [Card] [Card]
  [Card] [Card]
Section: Dev Environment
  [Card] [Card]
  ...
```

### Card Design

Detailed cards with editorial depth. Single column on mobile, loose 2-column grid on wider screens.

Each card contains:
- **Title** — resource name, linked to external URL
- **Daily driver badge** — accent-colored pill when `dailyDriver: true`
- **Description** — 1-2 sentence "why I use this" take (from markdown body)
- **Tags** — small clickable pills for cross-cutting metadata (clicking adds tag as filter)
- **Video embed** — inline YouTube player when `video` field is present
- **Left accent border** — on daily driver resources, using the page's accent color

### Filter & Search Interaction

**Filter bar**: Category toggle buttons above the resource sections. Clicking a category scopes the view to that category's resources only. Clicking again (or "All") shows everything.

**Tag filtering**: Clicking a tag on any card adds it as an active filter. Tags filter *within* the current category scope. Multiple tags use AND logic (narrowing).

**Search**: CLI-styled input (`$ grep -i "..."`) that filters by title, body text, and tags as the user types. Search is immediate (no debounce needed — with 15-25 resources, filtering is trivial). Search works within the current category/tag scope.

**Active filters**: Pills displayed between the filter bar and results showing the current category + active tags. Each pill has an X to remove it. A result count shows e.g. `"3 of 24 resources"`.

**URL state**: Filter state is encoded in URL query parameters (`?category=devops&tag=daily-driver`) so filtered views are shareable and bookmarkable. Since the site is statically prerendered, URL param reading happens client-side only: a `$effect` in the page component reads `page.url.searchParams` on mount and initializes the filter store. The page loader does NOT read query params.

**Empty state**: When no resources match the current filters:
```
$ grep "query" ./resources
→ no matches
[Clear filters]
```

### Video Integration

Videos are not a separate section. They are resources with a `video` frontmatter field. When present, the card renders an inline YouTube embed below the description. This means a Go tutorial video and the Go language itself can coexist naturally in the same category.

### Data Loading

The SvelteKit page loader (`+page.ts`) reads all markdown files from `src/lib/data/resources/` at build time using Vite's `import.meta.glob('$lib/data/resources/*.md', { query: '?raw', eager: true })`. Frontmatter is parsed using the `gray-matter` npm package (new dependency). Body text is extracted as the description string (plain text, not rendered as HTML).

Resources are grouped by category (using `CATEGORY_ORDER`) and sorted within each category: daily drivers first, then alphabetically by title.

Since this is a static site (prerendered), all parsing happens at build time. No runtime cost.

## Files to Modify/Create

### New files
- `src/lib/data/resources/*.md` — individual resource markdown files (15-25 files)
- `src/lib/components/resources/ResourceFilter.svelte` — filter bar + search component
- `src/lib/components/resources/ResourceGrid.svelte` — filtered grid layout with section headings
- `src/lib/components/resources/ResourceCard.svelte` — rebuilt card with new design (replaces old ResourceCard in-place)
- `src/lib/services/resource-loader.ts` — markdown parsing + glob loading service

### Modified files
- `src/lib/types/resource.ts` — updated Resource interface matching new schema (tags required, stars/description removed, dailyDriver/video added)
- `src/routes/resources/+page.svelte` — rewired to use new components and filter state
- `src/routes/resources/+page.ts` — rewired to use markdown loader instead of hardcoded data
- `tests/resources.spec.ts` — updated E2E tests for new page structure
- `package.json` — add `gray-matter` dependency

### Removed files
- `src/lib/components/resources/ResourceSection.svelte` — replaced by ResourceGrid
- `src/lib/components/video/FeaturedVideos.svelte` — only used on resources page, now integrated into resource cards

## Testing

- Unit tests for resource loader (markdown parsing, frontmatter extraction, category grouping)
- Unit tests for filter logic (category scoping, tag AND filtering, search matching)
- Component tests for ResourceFilter (toggle states, search input, active filter pills)
- Component tests for ResourceCard (daily driver badge, video embed, tag click behavior)
- E2E tests: page loads, filtering works, search works, URL state persists, empty state renders
- Update existing `tests/resources.spec.ts` for new page structure