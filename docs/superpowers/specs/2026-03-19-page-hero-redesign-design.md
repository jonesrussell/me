# Page Hero Redesign

## Problem

Non-homepage page heroes are too tall (50vh / 30vh) and have busy backgrounds (topographic SVG ellipses, grain texture, radial gradients). They waste vertical space and don't match the content density of the pages they introduce.

## Scope

- **In scope**: Blog, Projects, Resources, Contact page heroes; subtitle text refresh
- **Out of scope**: Homepage hero (keep as-is — it houses the Terminal component and works well)

## Design

### Layout Changes

| Property | Current | New |
|---|---|---|
| Height | `min-height: 50vh` (30vh on md) | `~120px` fixed padding-based |
| Alignment | Centered | Left-aligned |
| Background | Gradient + radial glow + topo SVG + grain | Diagonal gradient + radial glow from left edge only |
| Border | None | `0.1875rem` left border in accent color |
| Border radius | `var(--radius-lg)` | Removed for compact variants |
| Topo SVG | Yes (concentric ellipses) | Removed |
| Grain texture | Yes (`::after` pseudo) | Removed |
| Entry animation | Fade + slide-up (0.6s) | Kept |

### Implementation Approach

Modify `Hero.svelte` to support the new compact layout when a `variant` is set:

- When `variant` is set: use compact left-aligned layout (~120px, left border, no SVG/grain)
- When no `variant` (homepage): keep existing behavior unchanged
- The `::before` radial gradient shifts to originate from the left edge (`at 0% 50%`) instead of center
- The `::after` grain texture and topo SVG only render when no variant (homepage only)

### Per-Page Accent Colors

Kept as `--hero-accent` CSS custom property per variant. Current values can be adjusted freely during implementation:

- **Blog**: sage green `rgb(101 130 95)`
- **Projects**: blue-gray `rgb(85 115 125)`
- **Resources**: warm brown `rgb(130 120 80)`
- **Contact**: sage green `rgb(101 130 95)`

### Subtitle Refresh

All subtitles updated to terminal/CLI style matching the site's aesthetic:

| Page | Current | New |
|---|---|---|
| Blog | `Latest writing` | `// thoughts.log` |
| Projects | *(none)* | `// ls ~/builds` |
| Resources | `Essential Tools & Learning Materials` | `// cat bookmarks.md` |
| Contact | `// ready to receive` | `// open for connections` |

### Title Changes

Titles are simplified where overly formal:

| Page | Current | New |
|---|---|---|
| Blog | `Blog` | `Blog` (unchanged) |
| Projects | `Projects` | `Projects` (unchanged) |
| Resources | `Developer Resources` | `Resources` |
| Contact | `Establish Connection` | `Contact` |

## Files to Modify

1. **`src/lib/components/ui/Hero.svelte`** — Rework styles for variant-based compact layout
2. **`src/routes/blog/+page.svelte`** — Update subtitle
3. **`src/routes/projects/+page.svelte`** — Add subtitle
4. **`src/routes/resources/+page.svelte`** — Update title and subtitle
5. **`src/routes/contact/+page.svelte`** — Update title and subtitle
6. **`src/lib/components/ui/Hero.svelte.test.ts`** — Update/add tests for compact layout behavior

## CSS Details

```css
/* When variant is set: compact left-aligned hero */
.hero[data-variant] {
  min-height: auto;
  padding: 2rem 2.5rem;
  align-items: flex-start;
  text-align: left;
  border-inline-start: 0.1875rem solid var(--hero-accent);
  border-radius: 0;
}

/* Override responsive min-height for compact variants */
@media (--container-md) {
  .hero[data-variant] {
    min-height: auto;
    padding: 2rem 2.5rem;
  }
}

/* Radial glow shifts to left edge */
.hero[data-variant]::before {
  background: radial-gradient(
    ellipse 80% 100% at 0% 50%,
    var(--hero-accent) 0%,
    transparent 60%
  );
  opacity: 0.1;
}

/* No grain texture for compact heroes */
.hero[data-variant]::after {
  display: none;
}
```

The topo SVG currently renders `{#if variant}`. Since we're removing it from variant pages and the homepage doesn't use a variant, the entire SVG block should be deleted. The homepage never had it, so no behavior changes there.

## Testing

- Verify homepage hero is visually unchanged
- Verify all four page heroes render compact layout
- Verify per-page accent colors still shift
- Verify entry animation still works
- Check responsive behavior at all breakpoints
- Run existing Hero.svelte.test.ts tests (update assertions for new layout)
- E2E smoke tests: verify the four affected pages load correctly with compact heroes
