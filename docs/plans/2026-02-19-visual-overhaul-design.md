# Visual Overhaul Design

**Date:** 2026-02-19
**Status:** Approved

## Problem Statement

Three related issues degrade the site's visual quality:

1. **Too green** — dark theme uses neon emerald (`rgb(16 185 129)`) as primary accent; all color-mix derivatives and tags are also green, creating an overwhelming Matrix effect.
2. **Insufficient contrast** — border color (`rgb(40 50 60)`) barely separates from the background (`rgb(12 20 28)`); shadows are nearly invisible; muted text could be lighter.
3. **Condensed heroes** — `Hero.svelte` padding is tight (3rem/1rem), title-to-subtitle gap is only 0.5rem, and the background is a near-invisible gradient with no visual character.

## Approach

**Option B — Enhanced Hero component + theme token update.**

Update `dark.css` tokens, adjust spacing in `Hero.svelte`, and extend the component with a `variant` prop that controls per-page tint and injects a topographic contour background. All page files only change by adding `variant="blog"` etc.

---

## Section 1: Color

### Dark theme accent — emerald → muted sage

```css
--accent-color:       rgb(101 130 95)
--accent-color-hover: rgb(134 164 118)
--color-mix-light:    rgb(101 130 95 / 10%)
--color-mix-medium:   rgb(101 130 95 / 20%)
--color-mix-faint:    rgb(101 130 95 / 5%)
```

Same green family, ~60% less saturation, darker value. Secondary accent gold (`rgb(234 179 8)`) is unchanged and now contrasts more sharply against the muted sage.

### Dark theme tags — off green-on-green

```css
--tag-bg:     rgb(101 130 95 / 20%)
--tag-color:  rgb(200 218 195)
--tag-border: 1px solid rgb(101 130 95 / 50%)
```

---

## Section 2: Contrast

Changes go in `dark.css` only — light theme contrast is acceptable.

### Borders and muted text

```css
--border-color: rgb(55 70 85)    /* was rgb(40 50 60) */
--text-muted:   rgb(168 185 205) /* was rgb(148 163 184) */
```

### Shadows

```css
--shadow-sm:  0 1px 3px rgb(0 0 0 / 30%)
--shadow-md:  0 4px 8px rgb(0 0 0 / 35%)
--shadow-lg:  0 8px 16px rgb(0 0 0 / 40%)
--shadow-xl:  0 20px 40px rgb(0 0 0 / 50%)
```

---

## Section 3: Spacing

All changes in `Hero.svelte`.

### Padding

```css
/* Mobile */
padding: var(--space-20) var(--space-8);  /* was space-12 / space-4 */

/* md+ */
padding: var(--space-32) var(--space-12); /* was space-20 / space-8 */
```

`min-height` stays at `50vh`.

### Title and subtitle

```css
/* Title size */
font-size: var(--font-size-4xl);    /* mobile base, was 3xl */
/* md+ */
font-size: var(--font-size-5xl);    /* was 4xl */

/* Subtitle margin */
margin: var(--space-4) 0 0 0;       /* was space-2 */
```

---

## Section 4: Hero Component Redesign

### New `variant` prop

Accepted values: `blog | projects | resources | contact`. Unset = no variant (homepage terminal is unaffected).

### Per-page tint system

Each variant sets `--hero-accent` on the `.hero` element:

```
blog:      rgb(101 130 95)   — base sage
projects:  rgb(85 115 125)   — slate-sage (cooler)
resources: rgb(130 120 80)   — amber-sage (warmer)
contact:   rgb(101 130 95)   — same as blog / base
```

The topographic contour SVG strokes and the `::before` radial gradient both reference `--hero-accent`.

### Topographic background

An inline SVG of 6–8 closed bezier curves at varying scales and opacities — elevation-ring contours. Rendered as `background-image: url("data:image/svg+xml,…")` on a `::before` pseudo-element. Positioned to bleed off the **right edge** of the hero — text anchors left, contours breathe right. Asymmetric composition gives each hero visual weight without clashing with centered text.

### Subtitle styling

```css
font-size:      var(--font-size-base)
letter-spacing: var(--letter-spacing-loose)
color:          var(--hero-accent)   /* was text-muted */
```

### Page template changes

Each page file adds one prop:

```svelte
<!-- blog/+page.svelte -->
<Hero title="Blog" subtitle="Latest writing" variant="blog" />

<!-- projects/+page.svelte -->
<Hero title="Projects" variant="projects" />

<!-- resources/+page.svelte -->
<Hero title="Developer Resources" subtitle="Essential Tools & Learning Materials" variant="resources" />
```

---

## Files Changed

| File | Change |
|------|--------|
| `src/styles/themes/dark.css` | Sage accent, tag colors, border, text-muted, shadows |
| `src/lib/components/ui/Hero.svelte` | Variant prop, spacing, topographic SVG, subtitle style |
| `src/routes/blog/+page.svelte` | Add `variant="blog"` |
| `src/routes/projects/+page.svelte` | Add `variant="projects"` |
| `src/routes/resources/+page.svelte` | Add `variant="resources"` |
| `src/routes/contact/+page.svelte` | Add `variant="contact"` (if Hero is used) |
