# CLAUDE.md

This file provides guidance for AI assistants working with this codebase.

## Project Overview

Personal website for Russell Jones built with SvelteKit 5 and modern web technologies. Features a blog (via Dev.to RSS integration), project showcase, resources section, and terminal emulation. Deployed to GitHub Pages as a static site.

**Live site:** https://jonesrussell.github.io/me/

## Tech Stack

- **Framework:** SvelteKit 2.49.4 with static adapter
- **UI Library:** Svelte 5.46.1 (runes-based reactivity)
- **Language:** TypeScript 5.9.3 (strict mode)
- **Build Tool:** Vite 7.3.1
- **Testing:** Vitest 4.0.16 (unit), Playwright 1.57.0 (E2E), Testing Library
- **Linting:** ESLint 9.39.2, Stylelint 16.26.1, Prettier 3.7.4

## Quick Commands

```bash
# Development
npm run dev              # Start dev server (localhost:5173)
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run test:unit        # Run unit tests (watch mode)
npm run test:unit:run    # Run unit tests once
npm run test:e2e         # Run Playwright E2E tests
npm run test             # Run all tests

# Code Quality
npm run check            # TypeScript type checking
npm run lint             # ESLint + Stylelint
npm run lint:fix         # Auto-fix lint issues
npm run format           # Prettier formatting
npm run validate         # Full validation (types + lint + tests)

# Utilities
npm run knip             # Find unused exports/dependencies
```

## Project Structure

```
src/
├── lib/
│   ├── components/      # Svelte components by feature
│   │   ├── blog/        # Blog-related components
│   │   ├── layout/      # Header, Footer, SubtitleBar
│   │   ├── navigation/  # Nav components
│   │   ├── newsletter/  # Newsletter form components
│   │   ├── projects/    # Project showcase
│   │   ├── resources/   # Resource cards/sections
│   │   ├── terminal/    # Terminal emulation
│   │   ├── ui/          # Reusable UI (Hero, Box, Input, etc.)
│   │   └── video/       # YouTube/video components
│   ├── services/        # Business logic (pure functions)
│   │   └── blog-service.ts  # Blog API service (pure functions, no state)
│   ├── stores/          # State management (runes-based, .svelte.ts files)
│   │   ├── blog.svelte.ts      # Blog state
│   │   ├── theme.svelte.ts     # Theme state
│   │   └── terminal.svelte.ts  # Terminal state
│   ├── types/           # TypeScript interfaces
│   └── utils/           # Utility functions
├── routes/              # SvelteKit file-based routing
│   ├── blog/            # Blog pages
│   ├── contact/         # Contact page
│   ├── projects/        # Projects page
│   └── resources/       # Resources page
├── styles/              # Global CSS
│   ├── modules/         # CSS modules (typography, forms, etc.)
│   ├── themes/          # Light/dark theme variables
│   └── system/          # Color system
└── test/                # Test utilities and setup
tests/                   # Playwright E2E tests
```

## Svelte 5 Patterns

This project uses **Svelte 5 runes** exclusively. Do NOT use legacy Svelte 4 syntax.

### State Management with Runes

```svelte
<script lang="ts">
  // Reactive state
  let count = $state(0);

  // Derived values (auto-update when dependencies change)
  let doubled = $derived(count * 2);

  // Side effects
  $effect(() => {
    console.log('Count changed:', count);
  });
</script>
```

### Component Props

```svelte
<script lang="ts">
  // Props with defaults
  let { title, items = [] } = $props();

  // Bindable props
  let { value = $bindable() } = $props();
</script>
```

### Content Projection (Snippets)

```svelte
<!-- Parent.svelte -->
<Child>
  {#snippet header()}
    <h1>Title</h1>
  {/snippet}

  <p>Default content (children)</p>
</Child>

<!-- Child.svelte -->
<script lang="ts">
  let { header, children } = $props();
</script>

{@render header?.()}
{@render children?.()}
```

### Event Handling

```svelte
<!-- Direct handlers (no on: directive) -->
<button onclick={() => count++}>Click</button>

<!-- Component callbacks -->
<MyComponent onchange={(value) => handleChange(value)} />
```

### Store Patterns (Runes-based)

Stores use `.svelte.ts` extension and `$state` runes:

```typescript
// stores/example.svelte.ts
export const exampleState = $state({
  value: 0,
  items: []
});
```

Components import and use state directly (no `$` prefix):

```svelte
<script lang="ts">
  import { exampleState } from '$lib/stores/example.svelte';
</script>

<p>Value: {exampleState.value}</p>
<button onclick={() => exampleState.value++}>Increment</button>
```

### SvelteKit App State

Use `$app/state` (not `$app/stores`):

```svelte
<script lang="ts">
  import { page } from '$app/state';
</script>

<p>Current URL: {page.url}</p>
```

## Coding Standards

### TypeScript
- Use strict mode
- Define interfaces in `src/lib/types/`
- Interface names start with "I", type names end with "Type"
- Document complex types with JSDoc

### Components
- One component per file
- Co-locate tests with components (`Component.svelte.test.ts`)
- Use `<script lang="ts">` always
- Props first, then state, then derived, then effects, then functions

### CSS
- Use CSS nesting and container queries
- Follow BEM-like naming for classes
- Use CSS custom properties from theme files
- Prefer `container` queries over `media` queries
- Use logical properties (`inline`, `block`) over physical (`left`, `right`)

### Testing
- Unit tests: `*.test.ts` or `*.svelte.test.ts`
- E2E tests: `tests/*.spec.ts`
- Use Testing Library for component tests
- Use `vi.mock()` for mocking

### Services
- Services are **pure functions** - they return data, they don't manage state
- Services should not update stores or have side effects
- State management happens in stores or components

### Stores
- Stores use `.svelte.ts` extension
- Stores use `$state` runes (not `writable` stores)
- Stores export state objects directly
- Components access state directly (no `$` prefix)

## File Naming Conventions

- Components: `PascalCase.svelte`
- Component tests: `PascalCase.svelte.test.ts`
- Services/utils: `kebab-case.ts`
- Stores: `kebab-case.svelte.ts` (must use `.svelte.ts` for runes)
- Types: `kebab-case.ts`
- Routes: `+page.svelte`, `+page.ts`, `+page.server.ts`

## Important Patterns

### Error Boundaries
Wrap components that may fail with `ErrorBoundary.svelte`.

### Safe HTML Rendering
Use `SafeHtml.svelte` for rendering sanitized HTML content.

### Blog Integration
Blog posts are fetched from Dev.to RSS feed via `blog-service.ts`. The service contains pure functions that return data. State is managed in `stores/blog.svelte.ts`.

### Theme System
Theme is managed via `stores/theme.svelte.ts` with light/dark/auto modes. Use `themeState` and `setTheme()` function. CSS custom properties handle theming.

### Terminal Emulation
Terminal state is managed in `stores/terminal.svelte.ts`. The terminal component uses this state to display typed commands and outputs.

## Path Aliases

- `$lib` → `src/lib`
- `$app` → SvelteKit app modules

## Environment

- Static site deployment (no server runtime)
- GitHub Pages with base path `/me/` in production
- Local development on `http://localhost:5173`
