# Contributing Guidelines

This project follows a monospace-first design approach, where all layouts and measurements are based on character units (ch) to maintain perfect grid alignment.

## Design Principles

### Monospace Grid System

All components should align to the character grid:

- Use character units (`ch`) for measurements
- Ensure whole number values for grid alignment
- Use the Grid component for layouts
- Follow monospace design patterns

Example:

```svelte
<Grid cols={2} gap={2}>
	<div>Column 1</div>
	<div>Column 2</div>
</Grid>
```

### Terminal Components

When creating terminal-based interfaces:

- Use the Terminal component for command demonstrations
- Follow the command/output pattern
- Maintain proper typing animations
- Handle terminal resizing appropriately

Example:

```typescript
const commands = [
	{
		cmd: 'echo "Hello"',
		output: 'Hello'
	}
];

terminal.loadCommands(commands);
```

## Development Workflow

1. **Setup**

   ```bash
   npm install
   npm run dev
   ```

2. **Code Style**

   - Use TypeScript for type safety
   - Follow the monospace grid system
   - Maintain character-based alignments
   - Use Svelte runes for reactivity

3. **Testing**

   - Write unit tests for utilities
   - Test components in isolation
   - Verify grid alignments
   - Check terminal animations

4. **Documentation**
   - Document component props
   - Explain grid measurements
   - Provide usage examples
   - Update relevant docs

## Component Guidelines

### Creating New Components

1. Use the monospace grid system:

   ```typescript
   import { alignToGrid, toCharUnit } from '$lib/utils/grid';
   const width = toCharUnit(alignToGrid(40)); // "40ch"
   ```

2. Follow the terminal pattern when needed:

   ```typescript
   import { terminal } from '$lib/stores/terminal';
   terminal.loadCommands(myCommands);
   ```

3. Maintain proper types:
   ```typescript
   interface Props {
   	cols?: number;
   	gap?: number;
   }
   ```

### Styling Rules

1. Use character units:

   ```css
   .element {
   	width: var(--ch40);
   	padding: var(--ch2);
   	gap: var(--ch);
   }
   ```

2. Maintain grid alignment:
   ```css
   .grid {
   	display: grid;
   	grid-template-columns: repeat(var(--cols), 1fr);
   	gap: var(--grid-gap);
   }
   ```

## Pull Request Process

1. Ensure code follows monospace grid system
2. Update documentation if needed
3. Add tests for new features
4. Update type definitions
5. Verify terminal animations
6. Check grid alignments

## Questions?

Feel free to open an issue for:

- Grid alignment questions
- Terminal component usage
- Animation issues
- Type definitions
- Documentation improvements
