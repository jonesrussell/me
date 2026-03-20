# Page Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Slim down non-homepage page heroes from 50vh centered layout to ~120px left-aligned compact layout with refreshed CLI-style subtitles.

**Architecture:** The `Hero.svelte` component uses a `variant` prop to distinguish page heroes from the homepage hero (which has no variant). We'll add CSS overrides keyed on `[data-variant]` to make variant heroes compact, left-aligned, with a left accent border and radial glow from the left edge. The topo SVG block is deleted entirely. Page files get updated subtitle/title props.

**Tech Stack:** SvelteKit, Svelte 5 (runes), CSS custom properties, Vitest, Playwright

**Spec:** `docs/superpowers/specs/2026-03-19-page-hero-redesign-design.md`

---

### Task 1: Update Hero.svelte unit tests for compact layout

**Files:**
- Modify: `src/lib/components/ui/Hero.svelte.test.ts`

- [ ] **Step 1: Add test — variant hero does not render topo SVG**

```typescript
it('does not render topo SVG when variant is set', () => {
	const { container } = render(Hero, { props: { title: 'Blog', variant: 'blog' } });
	const svg = container.querySelector('svg.hero-topo');
	expect(svg).toBeNull();
});
```

- [ ] **Step 2: Add test — homepage hero (no variant) does not render topo SVG**

```typescript
it('does not render topo SVG when variant is omitted', () => {
	const { container } = render(Hero, { props: { title: 'Home' } });
	const svg = container.querySelector('svg.hero-topo');
	expect(svg).toBeNull();
});
```

- [ ] **Step 3: Run tests to verify the variant test fails**

Run: `npm run test:unit:run -- src/lib/components/ui/Hero.svelte.test.ts`
Expected: 1 FAIL (variant test fails because SVG still renders for variant heroes). The no-variant test already passes because the current code only renders the SVG `{#if variant}`.

---

### Task 2: Update Hero.svelte — remove topo SVG and add compact variant styles

**Files:**
- Modify: `src/lib/components/ui/Hero.svelte`

- [ ] **Step 1: Delete the topo SVG block from the template**

Remove lines 142-158 (the entire `{#if variant}` block containing the SVG element). Also remove the `.hero-topo` CSS rule (lines 121-129).

The template should go from:
```svelte
	{#if children}
		{@render children()}
	{/if}
	{#if variant}
		<svg ...>...</svg>
	{/if}
</section>
```
To:
```svelte
	{#if children}
		{@render children()}
	{/if}
</section>
```

- [ ] **Step 2: Run tests to verify SVG tests now pass**

Run: `npm run test:unit:run -- src/lib/components/ui/Hero.svelte.test.ts`
Expected: ALL PASS

- [ ] **Step 3: Add compact variant CSS overrides**

Add these CSS rules inside the `<style>` block, after the existing `.hero-topo` removal and before the closing `</style>`:

```css
/* Compact variant layout */
.hero[data-variant] {
	min-height: auto;
	padding: var(--space-8) var(--space-10);
	align-items: flex-start;
	text-align: start;
	border-inline-start: 0.1875rem solid var(--hero-accent);
	border-radius: 0;
}

/* Override responsive min-height for compact variants */
@media (--container-md) {
	.hero[data-variant] {
		min-height: auto;
		padding: var(--space-8) var(--space-10);
	}
}

/* Radial glow from left edge for compact variants */
.hero[data-variant]::before {
	background: radial-gradient(
		ellipse 80% 100% at 0% 50%,
		var(--hero-accent) 0%,
		transparent 60%
	);
	opacity: 0.1;
}

/* No grain texture for compact variants */
.hero[data-variant]::after {
	display: none;
}

/* Override child text-align for compact variants */
.hero[data-variant] .hero-content {
	text-align: start;
}
```

Note: `.hero-content` has explicit `text-align: center` which would override the parent's inherited value, so we need this direct override on the child.

- [ ] **Step 4: Run all unit tests**

Run: `npm run test:unit:run -- src/lib/components/ui/Hero.svelte.test.ts`
Expected: ALL PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/ui/Hero.svelte src/lib/components/ui/Hero.svelte.test.ts
git commit -m "feat: compact left-aligned hero layout for variant pages

Remove topo SVG, add compact styles for [data-variant] heroes:
left-aligned, ~120px padding-based height, left accent border,
radial glow from left edge, no grain texture."
```

---

### Task 3: Update page subtitles and titles

**Files:**
- Modify: `src/routes/blog/+page.svelte` (line 328)
- Modify: `src/routes/projects/+page.svelte` (line 238)
- Modify: `src/routes/resources/+page.svelte` (line 141)
- Modify: `src/routes/contact/+page.svelte` (line 107)

- [ ] **Step 1: Update blog page**

Change line 328:
```svelte
<!-- Before -->
<Hero title="Blog" subtitle="Latest writing" variant="blog" />
<!-- After -->
<Hero title="Blog" subtitle="// thoughts.log" variant="blog" />
```

- [ ] **Step 2: Update projects page**

Change line 238:
```svelte
<!-- Before -->
<Hero title="Projects" variant="projects" />
<!-- After -->
<Hero title="Projects" subtitle="// ls ~/builds" variant="projects" />
```

- [ ] **Step 3: Update resources page**

Change line 141:
```svelte
<!-- Before -->
<Hero title="Developer Resources" subtitle="Essential Tools & Learning Materials" variant="resources" />
<!-- After -->
<Hero title="Resources" subtitle="// cat bookmarks.md" variant="resources" />
```

- [ ] **Step 4: Update contact page**

Change line 107:
```svelte
<!-- Before -->
<Hero title="Establish Connection" subtitle="// ready to receive" variant="contact" />
<!-- After -->
<Hero title="Contact" subtitle="// open for connections" variant="contact" />
```

- [ ] **Step 5: Run full unit test suite to check nothing broke**

Run: `npm run test:unit:run`
Expected: ALL PASS

- [ ] **Step 6: Commit**

```bash
git add src/routes/blog/+page.svelte src/routes/projects/+page.svelte src/routes/resources/+page.svelte src/routes/contact/+page.svelte
git commit -m "feat: refresh page hero subtitles with CLI-style text

Blog: '// thoughts.log', Projects: '// ls ~/builds',
Resources: '// cat bookmarks.md', Contact: '// open for connections'.
Simplify titles for Resources and Contact pages."
```

---

### Task 4: Clean up global hero styles

**Files:**
- Modify: `src/styles/modules/layout.css` (lines 16-24)

- [ ] **Step 1: Check if layout.css `.hero` styles conflict with the compact layout**

Read `src/styles/modules/layout.css` lines 16-24. The global `.hero` class sets `min-height: 50vh`. Since the component's scoped styles have higher specificity, this may not matter — but if it causes issues, override or remove the global rule.

If the global `.hero` rule is only used by `Hero.svelte` (check with grep), it can be removed since the component has its own scoped styles.

- [ ] **Step 2: Run lint to verify CSS compliance**

Run: `npm run lint`
Expected: No new errors (verify no `px` or raw media query violations)

- [ ] **Step 3: Commit if changes were made**

```bash
git add src/styles/modules/layout.css
git commit -m "refactor: remove redundant global .hero styles"
```

---

### Task 5: Visual verification and E2E smoke tests

**Files:**
- Read: `tests/*.spec.ts` (find existing E2E patterns)

- [ ] **Step 1: Start dev server and visually verify all pages**

Run: `npm run dev`

Check each page in browser:
- Homepage (`/`) — hero should be unchanged (tall, centered, Terminal component)
- Blog (`/blog`) — compact left-aligned hero, sage green accent, `// thoughts.log` subtitle
- Projects (`/projects`) — compact, blue-gray accent, `// ls ~/builds` subtitle
- Resources (`/resources`) — compact, brown accent, `// cat bookmarks.md` subtitle
- Contact (`/contact`) — compact, sage green accent, `// open for connections` subtitle

- [ ] **Step 2: Run existing E2E tests to verify nothing is broken**

Run: `npm run test:e2e`
Expected: ALL PASS (existing tests should still work with compact heroes)

- [ ] **Step 3: Run full validation**

Run: `npm run validate`
Expected: ALL PASS (types + lint + tests)
