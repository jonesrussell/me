# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Russell Jones built with SvelteKit and Svelte 5 (runes). Features a blog (Dev.to RSS integration), project showcase, resources section, and terminal emulation. Deployed to GitHub Pages as a static site at https://jonesrussell.github.io/me/.

## Quick Commands

```bash
npm run dev              # Start dev server (localhost:5173)
npm run build            # Build for production
npm run preview          # Preview production build
npm run check            # TypeScript type checking
npm run lint             # ESLint + Stylelint
npm run lint:fix         # Auto-fix lint issues
npm run format           # Prettier formatting
npm run validate         # Full validation (types + lint + tests)
npm run knip             # Find unused exports/dependencies

# Testing
npm run test:unit:run    # Run all unit tests once
npm run test:unit        # Run unit tests (watch mode)
npm run test:e2e         # Run Playwright E2E tests
npm run test             # Run all tests

# Run a single test file
npm run test:unit:run -- src/lib/components/ui/Hero.svelte.test.ts

# Run by test name pattern
npm run test:unit:run -- --testNamePattern="should render title"

# Run only client (Svelte component) or server tests
npm run test:unit:run -- --project=client
npm run test:unit:run -- --project=server
```

## Orchestration

| File pattern | Spec |
|---|---|
| `src/lib/services/blog*`, `src/lib/stores/blog*`, `src/lib/components/blog/`, `src/routes/blog/` | `docs/specs/blog.md` |
| `src/lib/services/series*`, `src/lib/stores/series*`, `src/lib/components/series/`, `src/lib/data/series/` | `docs/specs/series.md` |
| `src/lib/services/form*`, `src/lib/components/newsletter/`, `src/lib/components/forms/`, `src/lib/config/env*` | `docs/specs/forms.md` |
| `src/styles/`, `src/lib/stores/theme*`, `src/lib/components/ThemeToggle*` | `docs/specs/theme-css.md` |
| `src/lib/stores/terminal*`, `src/lib/components/terminal/` | `docs/specs/terminal.md` |
| GitHub issues, milestones, new features, roadmap | `docs/specs/workflow.md` |

## Architecture

### Test Infrastructure

Vitest with **two projects** in `vite.config.ts`: **`client`** (jsdom, `*.svelte.{test,spec}.ts`, setup: `vitest-setup-client.ts`) and **`server`** (Node, non-Svelte tests, setup: `src/test/setup.ts`). PostCSS also inline in `vite.config.ts`.

### Routing & Data Loading

- All routes prerender by default (`+layout.server.ts` sets `prerender = true`)
- Blog detail pages (`blog/[slug]/+page.server.ts`) disable prerendering for dynamic slugs
- Data loading uses `+page.ts` (universal) for most routes, `+page.server.ts` for blog detail
- Root layout (`+layout.svelte`) uses grid layout with Header, children, newsletter slot, Footer

### Deployment & Base Path

- **Base path**: Set via `BASE_PATH` env var in `svelte.config.js`: `paths.base = process.env.BASE_PATH || ''`
- Production build sets `BASE_PATH=/me` (configured in `.github/workflows/deploy.yml`)
- Static adapter with `fallback: 'fallback.html'` for SPA fallback
- CI pipeline: build → unit-tests + e2e-tests (parallel) → deploy to GitHub Pages

### CSS Architecture

**CSS Layers** (defined in `src/app.css`):
```css
@layer reset, base, components, utilities;
```

**Custom Media Breakpoints** (defined in `src/styles/custom-media.css`, enforced by Stylelint):
```css
@custom-media --container-sm (width >= 40rem);   /* 640px */
@custom-media --container-md (width >= 48rem);   /* 768px */
@custom-media --container-lg (width >= 64rem);   /* 1024px */
@custom-media --container-xl (width >= 80rem);   /* 1280px */
```

Stylelint **blocks** raw `min-width`/`max-width` in media queries — always use custom media variables. Stylelint also **blocks `px` and `em` units** — use `rem`, `ch`, `%`, `cqi`, etc.

**Theme system**: `data-theme` attribute on `<html>` switches between light/dark CSS custom properties defined in `src/styles/themes/`.

**Key design tokens** (in `src/styles/base.css`): `--space-{1..768}`, `--font-size-{xs..9xl}`, `--radius-{sm..full}`, `--shadow-{sm..xl}`, `--measure: 80rem`.

### Environment Config

**Forms:** Contact form uses GoFormX via `ContactForm.svelte`. Newsletter forms will use the existing FormService and the env below when GoFormX newsletter integration is complete.

GoForms API integration configured in `src/lib/config/env.ts`:
```
VITE_GOFORMS_API_URL        # GoForms API endpoint
VITE_GOFORMS_API_KEY        # API key
VITE_GOFORMS_CONTACT_FORM_ID
VITE_GOFORMS_NEWSLETTER_FORM_ID
```

## Svelte 5 Patterns

This project uses **Svelte 5 runes exclusively**. Do NOT use legacy Svelte 4 syntax.

### Store Pattern

Stores use `.svelte.ts` extension, export `$state` objects. No `$` prefix in components. Theme store: computed getters + exported setters. Terminal store: separate state (`terminalState`) from API (`terminal` object with `start`, `stop`, `reset`, `loadCommands`).

### Service Pattern

Pure functions accepting `fetch` as parameter, return data, never update stores. Blog service: in-memory cache with 30-min TTL (`resetFeedCache()` for tests). Form service: singleton `FormService.getInstance()`.

### Content Projection

Use `{#snippet}` + `{@render}` (not `<slot>`). Children via `let { header, children } = $props()`.

### App State

Use `$app/state` (NOT `$app/stores`): `import { page } from '$app/state'`

## Coding Standards

### TypeScript
- Strict mode enabled
- Interfaces in `src/lib/types/`, prefixed with "I"; type aliases suffixed with "Type"
- Component script order: props → state → derived → effects → functions

### CSS
- Container queries preferred over media queries
- Responsive pattern: `container-type: inline-size` + `max-width: min(var(--measure), 95cqi)`
- Use CSS nesting, logical properties (`inline`/`block` not `left`/`right`), custom properties from theme files
- BEM-like naming for classes

### Testing
- Co-locate component tests: `Component.svelte.test.ts` next to `Component.svelte`
- E2E tests in `tests/*.spec.ts` (Playwright, Chromium + WebKit)
- Use Testing Library for component tests, `vi.mock()` for mocking

### File Naming
- Components: `PascalCase.svelte`
- Services/utils: `kebab-case.ts`
- Stores: `kebab-case.svelte.ts` (`.svelte.ts` required for runes)
- Routes: `+page.svelte`, `+page.ts`, `+page.server.ts`

## Key Utilities

- **`ErrorBoundary.svelte`**: Wrap components that may fail
- **`SafeHtml.svelte`**: Render sanitized HTML (blog content). ESLint allows `{@html}` only in this file.
- **`src/lib/utils/error-handler.ts`**: `createError()`, `withErrorHandling()`, `logErrorDebounced()` — structured error handling with severity levels

## Path Aliases

- `$lib` → `src/lib`
- `$app` → SvelteKit app modules

## GitHub Workflow

1. All work begins with an issue — create one if missing
2. Every issue belongs to a milestone — unassigned = incomplete triage
3. Milestones define the roadmap — check before proposing work
4. PRs reference issues — title format: `feat(#N): description`
5. Read `bin/check-milestones` drift report before beginning work

Details: `docs/specs/workflow.md`

## Common Operations

- **Add a component**: create `PascalCase.svelte` + co-located `.svelte.test.ts`, add to parent, use runes
- **Add a route**: create `src/routes/name/+page.svelte` + `+page.ts`, prerender is on by default
- **Add a service**: create `src/lib/services/kebab-case.ts`, accept `fetch` param, add types to `src/lib/types/`
- **Update a subsystem**: change code, update relevant `docs/specs/` file if interfaces changed, run `tools/drift-detector.sh`

## Deprecated Features (Do NOT Use)

- `$:` reactive declarations → use `$derived`
- `writable`/`readable` stores → use `$state` runes
- `$app/stores` → use `$app/state`
- `onMount`, `beforeUpdate`, `afterUpdate`, `tick` → use `$effect`
- `<slot>` elements → use snippets (`{#snippet}` + `{@render}`)
- `on:` event directives → use `onclick`, `onchange`, etc.
