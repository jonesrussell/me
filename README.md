# Personal Website

A modern personal website built with SvelteKit 5, featuring a clean and modern design approach with cutting-edge web development practices.

Visit the website at https://jonesrussell.github.io/me/

## Features

- Terminal emulation fun
- Modern Svelte 5
  - Runes for state management
  - `$state` and `$derived` values
  - `$effect` for side effects
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
  - SvelteKit with TypeScript
  - Responsive layouts
  - Performance optimizations
  - Accessibility first
- Development Tools
  - Testing infrastructure
- (soon to be) Curated Resources
  - Essential Tools & Platforms
  - Documentation
  - Go Resources
  - Web Development
  - DevOps
  - Learning Paths
  - Featured YouTube Content

## Tech Stack

- SvelteKit 5
- TypeScript 5
- Modern CSS
  - CSS Grid and Flexbox
  - CSS Container Queries
  - CSS Nesting
  - CSS Logical Properties
  - CSS Cascade Layers
- Testing
  - Vitest for unit tests
  - Testing Library for component tests
  - Playwright for E2E tests
- Development
  - ESLint + Prettier
  - TypeScript strict mode
  - Modern build tools

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable components
│   │   ├── content/    # Content components
│   │   │   ├── SpecialtyGrid.svelte  # Specialties grid
│   │   │   └── ...
│   │   ├── resources/  # Resource components
│   │   │   ├── ResourceSection.svelte # Resource sections
│   │   │   └── ...
│   │   └── ...
│   ├── services/      # Business logic
│   │   ├── blog.ts    # Blog service
│   │   └── ...
│   ├── utils/
│   │   └── ...
│   └── stores/
│       └── ...
├── routes/           # SvelteKit routes
│   ├── resources/    # Resources page
│   │   ├── +page.svelte
│   │   └── +page.ts
│   └── ...
└── app.css          # Global CSS variables

docs/
├── CONTRIBUTING.md   # Contribution guidelines
├── TESTING.md       # Testing procedures
└── STYLE.md        # Style guide
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
npm run test          # Run unit tests once
npm run test:watch    # Run unit tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:unit     # Run unit tests
npm run test:client   # Run client-side tests
npm run test:server   # Run server-side tests

# Code quality
npm run format        # Format code with Prettier
npm run lint         # Run ESLint and Prettier checks

# GitHub Actions
npm run workflow     # Test GitHub Actions locally
```

## Example: Creating a New Route (a new page)

Here's how to create a new route using our codebase patterns:

```svelte
<!-- src/routes/fraggle-friends/+page.svelte -->
<script lang="ts">
	import Hero from '$lib/components/ui/Hero.svelte';

	const fraggles = [
		{
			name: 'Gobo',
			role: 'Explorer',
			quote: 'The magic is in the journey!'
		}
	];
</script>

<svelte:head>
	<title>Fraggle Rock | Russell Jones</title>
	<meta name="description" content="Meet the Fraggles - Yea!" />
</svelte:head>

<Hero title="Fraggle Rock Heros!" subtitle="Dance Your Cares Away" />

<main class="fraggles">
	<div class="container">
		{#each fraggles as fraggle}
			<article class="fraggle-card">
				<h2>{fraggle.name}</h2>
				<p class="role">{fraggle.role}</p>
				<blockquote>{fraggle.quote}</blockquote>
			</article>
		{/each}
	</div>
</main>
```

## I welcome any improvements.

Here are some ways you can help:

- Rip apart the code, point out all the mistakes I've made.
- Make the code better; Not worse is fine.
- Do Everyday Good? Do Only Good EveryOtherEpoch. That's the one.
- Bring Motley Crue.
- Don't watch The Dirt.

## License MIT - see [LICENSE](LICENSE)
