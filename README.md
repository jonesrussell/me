# Personal Website

A modern personal website built with SvelteKit 5, featuring a clean and modern design approach with cutting-edge web development practices.

Visit the website at https://jonesrussell.github.io/me/

## Features

- Terminal emulation fun
- Modern Svelte 5
  - Runes for state management (`$state`, `$derived`, `$effect`)
  - `$props` for component properties
  - `{@render}` for component composition
  - TypeScript-first development
- Modern Design System
  - Clean and consistent layouts
  - Responsive design with container queries
  - CSS Grid and Flexbox
  - CSS Nesting
  - CSS Container Queries
  - CSS Logical Properties
  - CSS Cascade Layers
- Interactive Guides
  - Go project setup walkthrough
  - Terminal command demonstrations
  - Step-by-step tutorials
- Modern Development
  - SvelteKit 2 with TypeScript 5.9
  - Responsive layouts
  - Performance optimizations
  - Accessibility first
- Development Tools
  - Testing infrastructure (Vitest, Playwright)
- Blog Integration
  - Dev.to RSS feed integration
  - Blog post showcase
- Curated Resources
  - Essential Tools & Platforms
  - Documentation
  - Go Resources
  - Web Development
  - DevOps
  - Learning Paths
  - Featured YouTube Content

## Tech Stack

- **Framework:** SvelteKit 2.49.4
- **UI Library:** Svelte 5.46.1 (runes-based reactivity)
- **Language:** TypeScript 5.9.3 (strict mode)
- **Build Tool:** Vite 7.3.1
- **Testing:**
  - Vitest 4.0.16 (unit tests)
  - Testing Library (component tests)
  - Playwright 1.57.0 (E2E tests)
- **CSS:** Modern CSS (nesting, container queries, logical properties, cascade layers)
- **Code Quality:**
  - ESLint 9.39.2
  - Stylelint 16.26.1
  - Prettier 3.7.4
  - TypeScript strict mode

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable components
│   │   ├── blog/      # Blog-related components
│   │   ├── layout/    # Header, Footer, SubtitleBar
│   │   ├── navigation/# Nav components
│   │   ├── newsletter/# Newsletter form components
│   │   ├── projects/  # Project showcase
│   │   ├── resources/ # Resource cards/sections
│   │   ├── terminal/  # Terminal emulation
│   │   ├── ui/        # Reusable UI components
│   │   └── video/     # YouTube/video components
│   ├── services/      # Business logic (pure functions)
│   │   └── blog-service.ts  # Blog API service
│   ├── stores/        # State management (runes-based)
│   │   ├── blog.svelte.ts   # Blog state
│   │   ├── theme.svelte.ts  # Theme state
│   │   └── terminal.svelte.ts # Terminal state
│   ├── types/         # TypeScript interfaces
│   └── utils/         # Utility functions
├── routes/           # SvelteKit routes
│   ├── blog/        # Blog pages
│   ├── contact/     # Contact page
│   ├── projects/    # Projects page
│   └── resources/   # Resources page
└── styles/          # Global CSS
    ├── modules/     # CSS modules
    ├── themes/      # Theme variables
    └── system/      # Color system
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking and validation
npm run check          # Run type checking
npm run check:watch    # Run type checking in watch mode
npm run validate       # Run all validations (types, lint, tests)

# Testing
npm run test:unit        # Run unit tests (watch mode)
npm run test:unit:run    # Run unit tests once
npm run test:e2e         # Run Playwright E2E tests
npm run test             # Run all tests

# Code quality
npm run format        # Format code with Prettier
npm run lint         # Run ESLint and Stylelint checks
npm run lint:fix     # Auto-fix lint issues

# Utilities
npm run knip         # Find unused exports/dependencies
```

## Example: Creating a New Route

Here's how to create a new route using our codebase patterns:

```svelte
<!-- src/routes/my-page/+page.svelte -->
<script lang="ts">
	import Hero from '$lib/components/ui/Hero.svelte';

	const data = $state({ count: 0 });
</script>

<svelte:head>
	<title>My Page | Russell Jones</title>
	<meta name="description" content="Description of my page" />
</svelte:head>

<Hero title="My Page" subtitle="Subtitle" />

<main>
	<div class="container">
		<p>Count: {data.count}</p>
		<button onclick={() => data.count++}>Increment</button>
	</div>
</main>
```

## State Management with Runes

This project uses Svelte 5 runes exclusively. State is managed using rune-based stores:

```typescript
// stores/example.svelte.ts
export const exampleState = $state({
  value: 0,
  items: []
});
```

Components access state directly (no `$` prefix needed):

```svelte
<script lang="ts">
  import { exampleState } from '$lib/stores/example.svelte';
</script>

<p>Value: {exampleState.value}</p>
<button onclick={() => exampleState.value++}>Increment</button>
```

## I welcome any improvements.

Here are some ways you can help:

- Rip apart the code, point out all the mistakes I've made.
- Make the code better; Not worse is fine.
- Do Everyday Good? Do Only Good EveryOtherEpoch. That's the one.
- Bring Motley Crue.
- Don't watch The Dirt.

## License MIT - see [LICENSE](LICENSE)
