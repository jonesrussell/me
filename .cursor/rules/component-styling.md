# Component Styling Standards

## Core Principles

- Use container queries for responsive design
- Implement mobile-first approach
- Follow CSS custom properties for theming
- Maintain consistent spacing using design tokens
- Use `var(--measure)` for max-width constraints
- Apply `95cqi` for container-based sizing

## Layout Patterns

- Use CSS Grid for complex layouts
- Implement Flexbox for alignment
- Define container queries for component-level responsiveness
- Use `minmax()` for flexible grid layouts
- Maintain consistent container structure:

  ```css
  .component {
  	container-type: inline-size;
  	container-name: component-name;
  	width: 100%;
  	padding: var(--space-16) 0;
  }

  .container {
  	width: 100%;
  	max-width: min(var(--measure), 95cqi);
  	margin: 0 auto;
  	padding: 0 var(--space-4);
  }
  ```

## Modern CSS Features (2024)

- **CSS Nesting** (2023)
  ```css
  .component {
  	& .child {
  	}
  	@media (min-width: 30rem) {
  	}
  }
  ```
- **CSS Container Queries** (2023)
  ```css
  @container (min-width: 30rem) {
  }
  @container style(--theme: dark) {
  }
  ```
- **CSS Scroll-Driven Animations** (2023)
  ```css
  @scroll-timeline {
  }
  animation-timeline: scroll();
  ```
- **CSS View Transitions API** (2023)
  ```css
  @keyframes fade-in {
  }
  view-transition-name: fade;
  ```
- **CSS Container Style Queries** (2024)
  ```css
  @container style(--theme: dark) {
  }
  ```
- **CSS Anchor Positioning** (2024)
  ```css
  position: absolute;
  anchor-name: --anchor;
  ```
- **CSS Color Mix** (2023)
  ```css
  color: color-mix(in srgb, var(--color-1), var(--color-2));
  ```
- **CSS Subgrid** (2023)
  ```css
  grid-template-columns: subgrid;
  ```

## Modern Units & Sizing

- **Relative Units**

  - `rem` - For typography and spacing (root-relative)
  - `em` - For component-specific scaling
  - `%` - For fluid layouts and grid systems
  - `cqi` - For container-based sizing
  - `dvh` - For viewport height (dynamic)
  - `svh` - For viewport height (small)
  - `lvh` - For viewport height (large)

- **Modern Sizing Functions**

  ```css
  /* Fluid typography */
  font-size: clamp(1rem, 2.5vw + 1rem, 2rem);

  /* Container-based sizing */
  width: min(100%, 95cqi);

  /* Responsive padding */
  padding: clamp(1rem, 5vw, 2rem);
  ```

- **Container Units**
  - `cqw` - Container query width
  - `cqh` - Container query height
  - `cqi` - Container query inline
  - `cqb` - Container query block

## Responsive Design

- Start with mobile layout (min-width: 0)
- Use container queries for component-level breakpoints
- Implement fluid typography with `clamp()`
- Use relative units for responsive sizing:
  - Use `rem` for media query breakpoints:
    - `30rem` (≈ 480px) for tablet
    - `50rem` (≈ 800px) for small desktop
    - `75rem` (≈ 1200px) for large desktop
  - Use `cqi` for container-based sizing
  - Use `%` for fluid layouts

## CSS Best Practices

- Use `:global()` for targeting child components
- Implement CSS custom properties for dynamic values
- Follow BEM-like naming conventions
- Keep styles scoped to components
- Use modern CSS features:
  - Container queries
  - CSS Grid
  - Logical properties
  - Custom properties
  - CSS Nesting
  - Scroll-driven animations
  - View transitions
  - Style queries
  - Color mixing
  - Subgrid

## Component Structure

- Define container type and name for queries
- Use semantic class names
- Implement consistent spacing with design tokens
- Follow accessibility guidelines for styling
- Maintain consistent container structure across all pages

## Example Patterns

```css
.component {
	container-type: inline-size;
	container-name: component-name;
	width: 100%;
	padding: var(--space-16) 0;
}

.container {
	width: 100%;
	max-width: min(var(--measure), 95cqi);
	margin: 0 auto;
	padding: 0 var(--space-4);
}

@container component-name (min-width: 30rem) {
	.container {
		max-width: min(var(--measure), 95cqi);
	}
}

@container component-name (min-width: 50rem) {
	.container {
		max-width: min(var(--measure), 95cqi);
	}
}

@container component-name (min-width: 75rem) {
	.container {
		max-width: min(var(--measure), 95cqi);
	}
}
```

## Design Tokens

- Use `--space-*` for consistent spacing
- Implement `--font-*` for typography
- Define `--color-*` for theming
- Use `--radius-*` for border radius
- Apply `--shadow-*` for elevation
- Use `--measure` for max-width constraints
- Use `--breakpoint-*` for responsive breakpoints
