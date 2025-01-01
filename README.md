# Personal Website of Me

My personal website built with SvelteKit, featuring a monospace-first design approach and modern web development practices.

Visit the website at https://jonesrussell.github.io/me/

## Features

- Monospace Design System
  - Character-grid based layouts
  - Precise character unit measurements
  - Grid component for perfect alignment
  - Terminal-style interfaces
- Interactive Guides
  - Go project setup walkthrough
  - Terminal command demonstrations
  - Step-by-step tutorials
- Modern Development
  - SvelteKit with TypeScript
  - Svelte Runes for state management
  - Character-based CSS
  - Responsive monospace layouts
- Development Tools
  - Grid alignment utilities
  - Terminal animation system
  - Character-based measurements
  - Monospace validation

## Tech Stack

- SvelteKit
- TypeScript
- Modern CSS
  - Character Units (ch)
  - CSS Grid
  - CSS Custom Properties
  - CSS Transitions
- Testing
  - Playwright for integration tests
  - Vitest for unit tests
- ESLint + Prettier for code quality
- Custom monospace utilities

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable components
│   │   ├── Grid.svelte      # Monospace grid system
│   │   ├── Terminal.svelte  # Terminal interface
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
└── TESTING.md       # Testing procedures
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

# Run tests
npm run test
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

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines on:

- Using the monospace grid system
- Creating terminal interfaces
- Following character-based layouts
- Adding interactive guides

## License

MIT - see [LICENSE](LICENSE)
