# Theme & CSS Architecture Specification

## File Map

| File | Purpose |
|------|---------|
| `src/app.css` | Entry point: declares CSS layer order |
| `src/styles/reset.css` | CSS reset (layer: reset) |
| `src/styles/base.css` | Design tokens: spacing, font sizes, radii, shadows (layer: base) |
| `src/styles/custom-media.css` | Custom media breakpoint definitions |
| `src/styles/animations.css` | Keyframe animations |
| `src/styles/modules/animations.css` | Animation utility classes |
| `src/styles/modules/code.css` | Code block styling |
| `src/styles/modules/forms.css` | Form element styling |
| `src/styles/modules/interactive.css` | Hover, focus, active states |
| `src/styles/modules/layout.css` | Grid, flex, container layout patterns |
| `src/styles/modules/surface.css` | Card, panel, surface styles |
| `src/styles/modules/typography.css` | Type scale, prose styles |
| `src/styles/modules/utilities.css` | Utility classes |
| `src/styles/themes/base.css` | Shared theme custom properties |
| `src/styles/themes/light.css` | Light theme color values |
| `src/styles/themes/dark.css` | Dark theme color values |
| `src/styles/system/colors.css` | System color definitions |
| `src/lib/stores/theme.svelte.ts` | Theme state management (auto/light/dark) |
| `src/lib/components/ThemeToggle.svelte` | Theme switcher UI component |

## CSS Layer Order

```css
@layer reset, base, components, utilities;
```

Layers cascade in this order — `utilities` wins over `components` wins over `base` wins over `reset`.

## Design Tokens

Defined in `src/styles/base.css`:

```css
/* Spacing scale */
--space-1 through --space-768

/* Font size scale */
--font-size-xs through --font-size-9xl

/* Border radius */
--radius-sm, --radius-md, --radius-lg, --radius-xl, --radius-full

/* Shadows */
--shadow-sm, --shadow-md, --shadow-lg, --shadow-xl

/* Layout constraint */
--measure: 80rem   /* max content width */
```

## Custom Media Breakpoints

Defined in `src/styles/custom-media.css`:

```css
@custom-media --container-sm (width >= 40rem);   /* 640px */
@custom-media --container-md (width >= 48rem);   /* 768px */
@custom-media --container-lg (width >= 64rem);   /* 1024px */
@custom-media --container-xl (width >= 80rem);   /* 1280px */
```

**Enforced rules (Stylelint):**
- Raw `min-width`/`max-width` in media queries → BLOCKED, use custom media
- `px` and `em` units → BLOCKED, use `rem`, `ch`, `%`, `cqi`

## Theme System

### How it works
1. `data-theme` attribute on `<html>` element controls active theme
2. Values: `'light'` | `'dark'` (auto resolves to one of these)
3. Theme CSS files define custom properties scoped to `[data-theme="light"]` / `[data-theme="dark"]`
4. Components use theme custom properties (e.g., `var(--color-bg)`, `var(--color-text)`)

### theme.svelte.ts store
```typescript
export const themeState: {
  current: 'auto' | 'light' | 'dark';
  get effective(): 'light' | 'dark';   // Resolved from system preference when 'auto'
};

export function setTheme(value: 'auto' | 'light' | 'dark'): void;
// Updates state, sets data-theme attribute, persists to localStorage
```

### ThemeToggle.svelte
- Cycles through: auto → light → dark → auto
- Displays current effective theme with icon
- Calls `setTheme()` on click

## Responsive Patterns

### Container queries (preferred)
```css
.component {
  container-type: inline-size;
}

.component__child {
  max-width: min(var(--measure), 95cqi);
}
```

### Logical properties (required)
```css
/* Use these */
margin-inline, padding-block, border-inline-start

/* NOT these */
margin-left, padding-top, border-left
```

## Common Mistakes

- Using `px` or `em` units → Stylelint will block. Use `rem` for sizing, `ch` for text widths
- Using raw `min-width` in `@media` → Use `@media (--container-md)` custom media
- Using `left`/`right`/`top`/`bottom` in spacing → Use logical properties (`inline`/`block`)
- Adding styles outside layer system → All new styles must be in a layer
- Hardcoding colors → Use theme custom properties from `themes/*.css`
- Using `vw` in `sizes` attribute for images works; `cqi` does not (evaluated before CSS layout)
