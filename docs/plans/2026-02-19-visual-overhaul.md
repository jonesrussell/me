# Visual Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix three visual issues — too-green dark theme, insufficient contrast, and boring/condensed page heroes — by updating theme tokens and enhancing the shared `Hero.svelte` component with a topographic contour background and per-page variant tints.

**Architecture:** Update `dark.css` for color/contrast tokens, update `Hero.svelte` for spacing/variant prop/inline SVG, update four page templates to pass `variant`. No new files, no new abstractions.

**Tech Stack:** Svelte 5, CSS custom properties, SVG, Vitest + Testing Library

---

### Task 1: Update dark theme accent — emerald → muted sage

**Files:**
- Modify: `src/styles/themes/dark.css`

**Step 1: Open the file and replace accent tokens**

In `src/styles/themes/dark.css`, replace the Primary Accent block and Color Mixes block:

```css
/* Primary Accent - Sage */
--accent-color: rgb(101 130 95);
--accent-color-hover: rgb(134 164 118);

/* Color Mixes - Using Sage */
--color-mix-light: rgb(101 130 95 / 10%);
--color-mix-medium: rgb(101 130 95 / 20%);
--color-mix-faint: rgb(101 130 95 / 5%);
```

Also replace the Tag Colors block:

```css
/* Tag Colors */
--tag-bg: rgb(101 130 95 / 20%);
--tag-color: rgb(200 218 195);
--tag-border: 1px solid rgb(101 130 95 / 50%);
```

**Step 2: Verify lint passes**

```bash
npm run lint
```

Expected: no errors. Stylelint will catch any `px` or `min-width` violations if accidentally introduced.

**Step 3: Commit**

```bash
git add src/styles/themes/dark.css
git commit -m "feat(theme): replace emerald accent with muted sage"
```

---

### Task 2: Update dark theme contrast — borders, text-muted, shadows

**Files:**
- Modify: `src/styles/themes/dark.css`

**Step 1: Lift border and muted text values**

In `src/styles/themes/dark.css`, update the Base Colors block:

```css
--border-color: rgb(55 70 85);    /* was rgb(40 50 60) */
--text-muted: rgb(168 185 205);   /* was rgb(148 163 184) */
```

**Step 2: Add shadows block to dark.css**

The dark theme has no shadow overrides — light shadows are invisible on dark backgrounds. Add after the existing blocks:

```css
/* Shadows */
--shadow-sm: 0 1px 3px rgb(0 0 0 / 30%);
--shadow-md: 0 4px 8px rgb(0 0 0 / 35%);
--shadow-lg: 0 8px 16px rgb(0 0 0 / 40%);
--shadow-xl: 0 20px 40px rgb(0 0 0 / 50%);
```

**Step 3: Verify lint passes**

```bash
npm run lint
```

Expected: no errors.

**Step 4: Commit**

```bash
git add src/styles/themes/dark.css
git commit -m "feat(theme): increase dark theme contrast for borders, text-muted, and shadows"
```

---

### Task 3: Write failing test for Hero variant prop

**Files:**
- Create: `src/lib/components/ui/Hero.svelte.test.ts`

**Step 1: Create the test file**

```typescript
import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Hero from './Hero.svelte';

describe('Hero', () => {
  it('renders title', () => {
    const { getByRole } = render(Hero, { props: { title: 'Blog' } });
    expect(getByRole('heading', { level: 1 })).toHaveTextContent('Blog');
  });

  it('renders subtitle when provided', () => {
    const { getByText } = render(Hero, { props: { title: 'Blog', subtitle: 'Latest writing' } });
    expect(getByText('Latest writing')).toBeInTheDocument();
  });

  it('does not render subtitle when omitted', () => {
    const { queryByRole } = render(Hero, { props: { title: 'Projects' } });
    expect(queryByRole('paragraph')).toBeNull();
  });

  it('sets data-variant attribute when variant prop is provided', () => {
    const { container } = render(Hero, { props: { title: 'Blog', variant: 'blog' } });
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('data-variant', 'blog');
  });

  it('does not set data-variant when variant is omitted', () => {
    const { container } = render(Hero, { props: { title: 'Home' } });
    const section = container.querySelector('section');
    expect(section).not.toHaveAttribute('data-variant');
  });
});
```

**Step 2: Run to confirm failure**

```bash
npm run test:unit:run -- src/lib/components/ui/Hero.svelte.test.ts
```

Expected: tests for `data-variant` FAIL — the prop doesn't exist yet. Other tests may pass or fail depending on current markup.

**Step 3: Commit the test**

```bash
git add src/lib/components/ui/Hero.svelte.test.ts
git commit -m "test(Hero): add tests for variant prop and data-variant attribute"
```

---

### Task 4: Implement Hero variant prop and spacing

**Files:**
- Modify: `src/lib/components/ui/Hero.svelte`

**Step 1: Add `variant` to props and `data-variant` to the element**

Replace the `<script>` block:

```typescript
const { title, subtitle, variant, children } = $props<{
  title?: string;
  subtitle?: string;
  variant?: 'blog' | 'projects' | 'resources' | 'contact';
  children?: () => unknown;
}>();
```

Add `data-variant={variant || undefined}` to the `<section>`:

```svelte
<section class="hero" data-variant={variant || undefined}>
```

**Step 2: Update spacing in the style block**

Replace the `.hero` padding and the `@media (--container-md)` block:

```css
.hero {
  display: flex;
  position: relative;
  width: 100%;
  padding: var(--space-20) var(--space-8);
  background: linear-gradient(to bottom, var(--bg-color), var(--bg-darker));
  border-radius: var(--radius-lg);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  overflow: hidden;
}

@media (--container-md) {
  .hero {
    min-height: 30vh;
    padding: var(--space-32) var(--space-12);
  }

  .hero-title {
    font-size: var(--font-size-5xl);
  }
}
```

Update `.hero-title` base size:

```css
.hero-title {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-color);
}
```

Update `.hero-subtitle` margin and color:

```css
.hero-subtitle {
  margin: var(--space-4) 0 0 0;
  font-family: var(--font-mono);
  font-size: var(--font-size-base);
  letter-spacing: var(--letter-spacing-loose);
  color: var(--hero-accent, var(--text-muted));
}
```

**Step 3: Add per-variant CSS custom properties**

Add after `.hero-subtitle`:

```css
/* Per-variant accent tints */
.hero[data-variant='blog'] {
  --hero-accent: rgb(101 130 95);
}

.hero[data-variant='projects'] {
  --hero-accent: rgb(85 115 125);
}

.hero[data-variant='resources'] {
  --hero-accent: rgb(130 120 80);
}

.hero[data-variant='contact'] {
  --hero-accent: rgb(101 130 95);
}
```

Update the `::before` radial gradient to use `--hero-accent`:

```css
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse 80% 60% at 50% 40%,
      var(--hero-accent, var(--color-mix-light)) 0%,
      transparent 70%
    );
  opacity: 0.12;
  pointer-events: none;
}
```

**Step 4: Run the tests**

```bash
npm run test:unit:run -- src/lib/components/ui/Hero.svelte.test.ts
```

Expected: all 5 tests PASS.

**Step 5: Run lint and type check**

```bash
npm run lint && npm run check
```

Expected: no errors.

**Step 6: Commit**

```bash
git add src/lib/components/ui/Hero.svelte
git commit -m "feat(Hero): add variant prop, increase spacing, accent-tinted subtitle"
```

---

### Task 5: Add topographic contour SVG to Hero

**Files:**
- Modify: `src/lib/components/ui/Hero.svelte`

**Step 1: Add the inline SVG to the template**

After `{@render children()}`, add (inside `<section class="hero">`):

```svelte
{#if variant}
  <svg
    class="hero-topo"
    aria-hidden="true"
    viewBox="0 0 800 400"
    preserveAspectRatio="xMaxYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="650" cy="200" rx="50" ry="35" fill="none" stroke="currentColor" stroke-width="1" opacity="0.45" />
    <ellipse cx="650" cy="200" rx="100" ry="72" fill="none" stroke="currentColor" stroke-width="1" opacity="0.32" />
    <ellipse cx="650" cy="200" rx="155" ry="110" fill="none" stroke="currentColor" stroke-width="1" opacity="0.22" />
    <ellipse cx="650" cy="200" rx="215" ry="155" fill="none" stroke="currentColor" stroke-width="1" opacity="0.15" />
    <ellipse cx="650" cy="200" rx="280" ry="205" fill="none" stroke="currentColor" stroke-width="1" opacity="0.10" />
    <ellipse cx="650" cy="200" rx="355" ry="260" fill="none" stroke="currentColor" stroke-width="1" opacity="0.06" />
    <ellipse cx="650" cy="200" rx="440" ry="320" fill="none" stroke="currentColor" stroke-width="1" opacity="0.04" />
  </svg>
{/if}
```

**Step 2: Add `.hero-topo` styles**

Add to the `<style>` block:

```css
.hero-topo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: var(--hero-accent, var(--accent-color));
  pointer-events: none;
  z-index: 0;
}
```

**Step 3: Run the tests**

```bash
npm run test:unit:run -- src/lib/components/ui/Hero.svelte.test.ts
```

Expected: all 5 tests still PASS (SVG is conditionally rendered and doesn't break existing assertions).

**Step 4: Verify in dev server**

```bash
npm run dev
```

Navigate to `/blog`, `/projects`, `/resources`, `/contact`. Each should show contour rings on the right side with per-page tint color. The rings should be visible but subtle.

**Step 5: Commit**

```bash
git add src/lib/components/ui/Hero.svelte
git commit -m "feat(Hero): add topographic contour SVG background for variant pages"
```

---

### Task 6: Wire up variant prop in page templates

**Files:**
- Modify: `src/routes/blog/+page.svelte`
- Modify: `src/routes/projects/+page.svelte`
- Modify: `src/routes/resources/+page.svelte`
- Modify: `src/routes/contact/+page.svelte`

**Step 1: Update blog page**

In `src/routes/blog/+page.svelte`, change:

```svelte
<Hero title="Blog" subtitle="Latest writing" />
```

To:

```svelte
<Hero title="Blog" subtitle="Latest writing" variant="blog" />
```

**Step 2: Update projects page**

In `src/routes/projects/+page.svelte`, change:

```svelte
<Hero title="Projects" />
```

To:

```svelte
<Hero title="Projects" variant="projects" />
```

**Step 3: Update resources page**

In `src/routes/resources/+page.svelte`, change:

```svelte
<Hero title="Developer Resources" subtitle="Essential Tools & Learning Materials" />
```

To:

```svelte
<Hero title="Developer Resources" subtitle="Essential Tools & Learning Materials" variant="resources" />
```

**Step 4: Update contact page**

In `src/routes/contact/+page.svelte`, change:

```svelte
<Hero title="Establish Connection" subtitle="// ready to receive" />
```

To:

```svelte
<Hero title="Establish Connection" subtitle="// ready to receive" variant="contact" />
```

**Step 5: Run full validation**

```bash
npm run validate
```

Expected: type check, lint, and all tests pass.

**Step 6: Commit**

```bash
git add src/routes/blog/+page.svelte src/routes/projects/+page.svelte src/routes/resources/+page.svelte src/routes/contact/+page.svelte
git commit -m "feat(pages): wire variant prop to Hero on blog, projects, resources, contact"
```

---

### Task 7: Final visual QA

**Step 1: Build and preview**

```bash
npm run build && npm run preview
```

**Step 2: Check each page in dark mode**

Visit `/blog`, `/projects`, `/resources`, `/contact`. Verify:
- [ ] Accent color is muted olive-sage, not neon green
- [ ] Tags have sage tint (not green-on-green)
- [ ] Borders are clearly visible against background
- [ ] Hero padding feels generous
- [ ] Topographic rings visible on right side with per-page tint
- [ ] Subtitle is accent-tinted, letter-spaced
- [ ] Homepage terminal hero is unchanged (no variant)

**Step 3: Check light mode**

Light theme was not changed — verify it still looks correct.

**Step 4: Run full test suite one final time**

```bash
npm run test
```

Expected: all tests pass.
