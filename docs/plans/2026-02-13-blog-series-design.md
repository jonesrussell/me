# Blog Series Feature Design

## Overview

Add a "series" feature to the portfolio blog, starting with the PHP-FIG Standards (PSR) series. A series groups related blog posts into a guided reading path with progress tracking, inline code examples from a companion repository, and interactive navigation.

## Data Model

### Approach: Static TypeScript Module

Series data is defined as a hand-curated TypeScript module in SvelteKit (`src/lib/data/series/psr.ts`). This gives full control over reading order, descriptions, and code file mappings without external dependencies.

### Types

```typescript
interface SeriesEntry {
  psrNumber: number;          // PSR-1, PSR-3, etc.
  slug: string;               // Matches blog post slug for linking
  title: string;              // "Basic Coding Standard"
  summary: string;            // One-liner description
  companionFiles: string[];   // Paths in php-fig-guide repo
  testFiles: string[];        // Corresponding test files
  prerequisites: number[];    // PSR numbers to read first
}

interface SeriesGroup {
  name: string;               // "Foundation", "Core Infrastructure", etc.
  entries: SeriesEntry[];
}

interface Series {
  id: string;                 // "psr"
  title: string;              // "PHP-FIG Standards"
  description: string;
  repoUrl: string;            // "https://github.com/jonesrussell/php-fig-guide"
  groups: SeriesGroup[];
}
```

### PSR Series Structure (14 posts, 5 groups)

- **Foundation:** PSR-1 (Basic Coding Standard), PSR-12 (Extended Coding Style), PSR-4 (Autoloading)
- **Core Infrastructure:** PSR-3 (Logger), PSR-11 (Container), PSR-14 (Event Dispatcher)
- **HTTP Stack:** PSR-7 (HTTP Messages), PSR-17 (HTTP Factories), PSR-15 (HTTP Handlers), PSR-18 (HTTP Client)
- **Data & Caching:** PSR-6 (Caching Interface), PSR-16 (Simple Cache)
- **Specialized:** PSR-13 (Hypermedia Links), PSR-20 (Clock)

## Route & Page Structure

### Route: `/blog/series/psr`

Prerendered static page nested under the blog.

### Page Zones

**1. Series Header**
- Title: "PHP-FIG Standards Guide"
- Description paragraph
- Companion repo link with clone instructions
- Overall progress bar ("5 of 14 completed")

**2. Series Map**
- 5 collapsible groups (Foundation, Core Infrastructure, HTTP Stack, Data & Caching, Specialized)
- Each group shows mini-progress ("2/3")
- Each entry card shows:
  - PSR number + title
  - One-line summary
  - Read status checkbox (persisted to localStorage)
  - Prerequisites indicator ("Requires: PSR-1, PSR-12")
  - Link to blog post (`/blog/{slug}`)
  - "View Code" expandable section with inline PHP source + tests
- "Suggested next" indicator on the first unread post in reading order

**3. Getting Started**
- Clone instructions for companion repo
- How to run tests (`composer test`, `composer test -- --filter=PSR1`)
- Links to PHP-FIG website and repo

## Progress Tracking

### Store: `src/lib/stores/series-progress.svelte.ts`

- `$state` rune: `{ [seriesId]: string[] }` (array of completed slugs)
- Reads from `localStorage` key `series-progress` in `$effect` (SSR-safe)
- Functions: `toggleCompleted(seriesId, slug)`, `isCompleted(seriesId, slug)`
- Computed: `completionPercentage(seriesId)`, `completedCount(seriesId)`

### UX

- Checkbox per post to mark as read
- Overall progress bar in header
- Per-group mini-progress counts
- "Suggested next" highlights first unread post

## Code Integration

### Inline Code Viewing (Build-time)

- PHP source files fetched from GitHub raw content API at build time
- `https://raw.githubusercontent.com/jonesrussell/php-fig-guide/main/{path}`
- Baked into prerendered HTML — no runtime API calls
- Each entry card has a "View Code" toggle showing:
  - Tabbed view: Source file | Test file
  - Syntax-highlighted PHP code (using existing `highlight-code` action)
  - "View on GitHub" link for full context
  - Test command snippet (`composer test -- --filter=PSR1`)

### Companion Repository

- `jonesrussell/php-fig-guide` on GitHub
- Structure: `src/PSR{N}/` for implementations, `tests/PSR{N}/` for tests
- Each PSR has corresponding source and test files

## Blog Page Integration

### Featured Series Card

A prominent card on `/blog` above the post grid:
- Series title ("PHP-FIG Standards Guide")
- Progress display if visitor has started ("3 of 14 read")
- Brief description
- Link to `/blog/series/psr`

Single card for now; becomes a grid if more series are added later.

## Testing

### Unit Tests

- Series data module: validates structure, no duplicate slugs, valid prerequisites
- Progress store: toggle, persistence to localStorage, computed values
- Series page component: renders groups, entries, progress bar
- GitHub raw content fetch service: success, error handling

### E2E Test

- Navigate to `/blog/series/psr`
- Verify series structure renders (groups, entries)
- Click a checkbox, verify visual update
- Reload page, verify persistence via localStorage

## File Structure

```
src/lib/
  data/series/psr.ts              # PSR series definition
  types/series.ts                 # Series interfaces
  stores/series-progress.svelte.ts # Progress tracking store
  services/series-code-service.ts  # Fetch code from GitHub raw API
  components/series/
    SeriesHeader.svelte           # Title, description, progress bar
    SeriesGroup.svelte            # Collapsible group with entries
    SeriesEntryCard.svelte        # Individual PSR entry card
    SeriesCodeView.svelte         # Inline code viewer with tabs
    SeriesProgressBar.svelte      # Reusable progress bar
    FeaturedSeriesCard.svelte     # Card for /blog page

src/routes/blog/series/psr/
  +page.ts                        # Data loader (fetches code at build time)
  +page.svelte                    # Series page
```
