# Personal Website

A modern personal website built with SvelteKit 5, featuring a monospace-first design approach and cutting-edge web development practices.

Visit the website at https://jonesrussell.github.io/me/

## Features

- Modern Svelte 5
  - Runes for state management
  - `$state` and `$derived` values
  - `$effect` for side effects
  - `{@render}` for component composition
  - TypeScript-first development
- Monospace Design System
  - Character-grid based layouts
  - Precise character unit measurements
  - Grid component for perfect alignment
  - Terminal-style interfaces
  - CSS Container Queries
  - CSS Nesting
  - CSS View Transitions
- Interactive Guides
  - Go project setup walkthrough
  - Terminal command demonstrations
  - Step-by-step tutorials
- Modern Development
  - SvelteKit with TypeScript
  - Character-based CSS
  - Responsive monospace layouts
  - Performance optimizations
  - Accessibility first
- Development Tools
  - Grid alignment utilities
  - Terminal animation system
  - Character-based measurements
  - Monospace validation
  - Testing infrastructure

## Tech Stack

- SvelteKit 5
- TypeScript 5
- Modern CSS
  - Character Units (ch)
  - CSS Grid and Subgrid
  - CSS Container Queries
  - CSS Nesting
  - CSS View Transitions
  - CSS Logical Properties
  - CSS Cascade Layers
- Testing
  - Vitest for unit tests
  - Testing Library for component tests
  - Playwright for E2E tests
- Development
  - ESLint + Prettier
  - TypeScript strict mode
  - Custom monospace utilities
  - Modern build tools

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable components
│   │   ├── Grid.svelte      # Monospace grid system
│   │   ├── Terminal.svelte  # Terminal interface
│   │   └── ...
│   ├── services/      # Business logic
│   │   ├── blog.ts    # Blog service
│   │   └── ...
│   ├── utils/
│   │   ├── grid.ts    # Grid alignment utilities
│   │   └── ...
│   └── stores/
│       ├── terminal.ts # Terminal state management
│       └── ...
├── routes/           # SvelteKit routes
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

## Modern Svelte 5 Example

Using runes for state management:

```svelte
<script lang="ts">
  const { count } = $props<{ count: number }>();
  let doubled = $derived(count * 2);

  $effect(() => {
    console.log('Count changed:', count);
  });
</script>

<div>Count: {count}</div>
<div>Doubled: {doubled}</div>
```

## Monospace Grid System

The project uses a character-based grid system for precise layouts:

```svelte
<Grid cols={2} gap={2}>
  <div>Perfectly</div>
  <div>Aligned</div>
</Grid>
```

Grid utilities ensure proper alignment:

```typescript
import { alignToGrid, toCharUnit } from '$lib/utils/grid';

const width = toCharUnit(alignToGrid(40)); // "40ch"
```

## Terminal Component

Interactive terminal interface for command demonstrations:

```typescript
const commands = [
	{
		cmd: 'echo "Hello"',
		output: 'Hello'
	}
];

terminal.loadCommands(commands);
```

## Contributing

Feel free to contribute! This is an open project and I welcome any improvements. Here are some ways you can help:

- Fix bugs or improve existing features
- Add new features or components
- Improve documentation
- Add tests
- Suggest improvements

Just fork the repository, make your changes, and submit a pull request. No formal process or guidelines - if it improves the project, aces!

## License

MIT - see [LICENSE](LICENSE)
