# Blog Page Redesign: "Terminal Feed"

## Motivation

The current blog page suffers from three problems:
1. **Too generic** — looks like every other dev blog, no personality
2. **Poor content hierarchy** — featured content doesn't stand out, everything has equal visual weight
3. **Cluttered** — 5 sections competing for attention without clear priority

## Direction

**Aesthetic**: Terminal/hacker — lean into the monospace identity with command-line aesthetics, scanline textures, and restrained glow effects. Builds on the existing terminal component on the home page.

**Content hierarchy** (top to bottom):
1. Terminal prompt header (compact, functional)
2. Hero post (latest article, full-width, prominent)
3. Pinned series (compact process-style block)
4. Post grid (log-entry cards, 2-column max)
5. Footer zone (NorthCloud feed + Dev.to attribution)

## Section Designs

### 1. Page Header

Replace the 50vh Hero banner with a compact terminal-prompt header.

- Terminal window chrome with path label (`/blog`)
- Command prompt line: `$ ls -la ./posts`
- Result line: post count and last updated date
- Subtle scanline overlay via CSS `repeating-linear-gradient`
- Accent color glow on border, used sparingly
- Compact height — functional, not decorative

### 2. Hero Post (Latest Article)

Full-width "stdout" card — the star of the page.

- Left accent border (3-4px) with subtle glow/box-shadow
- Large monospace title with terminal marker prefix (`>`)
- Metadata as terminal info string: `published: YYYY-MM-DD | tags: [go, testing] | read: 5min`
- 2-3 line excerpt in muted color
- Whole card is a link
- Hover: accent border intensifies, no lift/transform
- `[LATEST]` badge in accent color

### 3. Featured Series ("Pinned Process")

Compact block between hero post and grid.

- Styled as a running process notification
- Layout: `[PID 001] PSR Standards Deep Dive ·········· 3/12 completed`
- Description line with `>` prefix
- Monospace `[SERIES]` label in accent color
- Thin inline progress indicator
- Subtle pulsing dot to suggest "active/ongoing"
- Entire block links to series page

### 4. Post Grid (Log Entries)

Remaining articles in a tight grid.

- 1 column mobile, 2 columns from 48rem+ (no 3/4 column)
- Compact cards with minimal padding
- Subtle left border (1-2px, muted — accent reserved for hero)
- Terminal-style link titles (monospace, underline on hover, no lift)
- Metadata: `YYYY-MM-DD · [go, cloud] · 4min`
- Categories in `[brackets]` not pill badges
- 2-line truncated excerpt in muted text
- Hover: left border → accent, background shifts darker
- "Load More" styled as terminal command: `$ load --more` with blinking cursor when loading

### 5. Footer Zone (Secondary Content)

NorthCloud and Dev.to grouped in a bottom zone, separated by dashed border.

**North Cloud** (piped output):
- Compact strip with header: `$ pipe --from northcloud.biz`
- Article titles as simple list with `>` markers
- No cards, no borders — clean monospaced text links
- "More" link as `... | more`

**Dev.to** (attribution line):
- Replace heavy background-image section with minimal text line
- `syndicated from: jonesrussell.github.io/blog → dev.to/jonesrussell`
- Terminal footnote styling, informational not decorative

### 6. Motion & Effects

- **Scanline overlay**: `repeating-linear-gradient` across page, near-transparent horizontal lines every 2-3px. Disabled for `prefers-reduced-motion`.
- **Hover effects**: Border color transitions (muted → accent), background shifts. No translateY lifts.
- **Page load**: Staggered fade-in with `animation-delay` (header → hero → series → grid items). CSS-only, respects reduced motion.
- **Load more**: Blinking cursor animation (`$ loading...█`) while fetching.
- **No heavy effects**: No particles, WebGL, or parallax.

## Components Affected

### Modified
- `src/routes/blog/+page.svelte` — complete rewrite of template and styles
- `src/lib/components/blog/BlogPostCard.svelte` — restyle as log-entry card
- `src/lib/components/blog/BlogPostGrid.svelte` — 2-column max, tighter gaps
- `src/lib/components/series/FeaturedSeriesCard.svelte` — restyle as pinned process
- `src/lib/components/blog/DevTo.svelte` — simplify to attribution line

### New
- `src/lib/components/blog/BlogTerminalHeader.svelte` — terminal prompt page header
- `src/lib/components/blog/BlogHeroPost.svelte` — hero treatment for latest post

### Potentially Removed
- The `Hero` component is no longer used on the blog page (still used on home page)
- `BlogPostsSection.svelte` may be inlined or removed if it becomes trivial

## Design Tokens Used

All existing CSS custom properties from the theme system. No new tokens needed:
- `--bg-color`, `--bg-darker`, `--text-color`, `--text-muted`
- `--accent-color`, `--accent-color-hover`
- `--border-color`, `--font-mono`
- `--space-*`, `--font-size-*`, `--radius-*`, `--shadow-*`
- `--transition-base`

## Out of Scope

- North Cloud contextual/related content (tracked separately)
- Blog post detail page redesign
- New fonts (staying with JetBrains Mono + Fira Mono)
