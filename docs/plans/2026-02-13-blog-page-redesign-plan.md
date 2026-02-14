# Blog Page Redesign: "Terminal Feed" Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the blog page with a terminal/hacker aesthetic featuring a compact terminal header, hero post treatment for the latest article, pinned-process series card, log-entry post grid, and minimal footer zone.

**Architecture:** Replace the generic Hero banner with a BlogTerminalHeader component, extract the latest post into a new BlogHeroPost component, restyle existing components (BlogPostCard, BlogPostGrid, FeaturedSeriesCard, DevTo) in place, and rewire the blog +page.svelte to compose the new layout with staggered animations and scanline overlay.

**Tech Stack:** SvelteKit, Svelte 5 runes, CSS custom properties (existing design token system), Vitest + Testing Library (unit), Playwright (E2E)

---

### Task 1: BlogTerminalHeader Component

**Files:**
- Create: `src/lib/components/blog/BlogTerminalHeader.svelte`
- Create: `src/lib/components/blog/BlogTerminalHeader.svelte.test.ts`

**Step 1: Write the failing test**

```typescript
// src/lib/components/blog/BlogTerminalHeader.svelte.test.ts
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import BlogTerminalHeader from './BlogTerminalHeader.svelte';

describe('BlogTerminalHeader', () => {
	it('should render the terminal path', () => {
		render(BlogTerminalHeader, {
			props: { postCount: 24, lastUpdated: '2025-01-15' }
		});
		expect(screen.getByText('/blog')).toBeTruthy();
	});

	it('should render the command prompt', () => {
		render(BlogTerminalHeader, {
			props: { postCount: 24, lastUpdated: '2025-01-15' }
		});
		expect(screen.getByText(/ls -la \.\/posts/)).toBeTruthy();
	});

	it('should display post count and last updated date', () => {
		render(BlogTerminalHeader, {
			props: { postCount: 24, lastUpdated: '2025-01-15' }
		});
		expect(screen.getByText(/24 articles/)).toBeTruthy();
		expect(screen.getByText(/2025-01-15/)).toBeTruthy();
	});

	it('should have terminal window chrome', () => {
		const { container } = render(BlogTerminalHeader, {
			props: { postCount: 12, lastUpdated: '2025-03-01' }
		});
		expect(container.querySelector('.terminal-header')).toBeTruthy();
		expect(container.querySelector('.terminal-chrome')).toBeTruthy();
	});
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:unit:run -- src/lib/components/blog/BlogTerminalHeader.svelte.test.ts`
Expected: FAIL — module not found

**Step 3: Write the component**

```svelte
<!-- src/lib/components/blog/BlogTerminalHeader.svelte -->
<script lang="ts">
	const { postCount, lastUpdated } = $props<{
		postCount: number;
		lastUpdated: string;
	}>();
</script>

<style>
	.terminal-header {
		container-type: inline-size;
		width: 100%;
		max-width: min(var(--measure), 95cqi);
		margin-inline: auto;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		overflow: hidden;
		background: var(--bg-darker);
	}

	.terminal-chrome {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		background: color-mix(in srgb, var(--bg-darker) 80%, var(--bg-color));
		border-block-end: 1px solid var(--border-color);
	}

	.terminal-dot {
		width: 0.625rem;
		height: 0.625rem;
		border-radius: var(--radius-full);
		background: var(--border-color);
	}

	.terminal-path {
		margin-inline-start: var(--space-2);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-muted);
	}

	.terminal-body {
		padding: var(--space-4) var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.terminal-prompt {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--accent-color);
	}

	.terminal-prompt .cmd {
		color: var(--text-color);
	}

	.terminal-output {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	/* Scanline overlay */
	.terminal-header::after {
		content: '';
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			transparent,
			transparent 0.125rem,
			rgb(0 0 0 / 3%) 0.125rem,
			rgb(0 0 0 / 3%) 0.1875rem
		);
		pointer-events: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.terminal-header::after {
			display: none;
		}
	}
</style>

<div class="terminal-header" role="banner">
	<div class="terminal-chrome">
		<span class="terminal-dot"></span>
		<span class="terminal-dot"></span>
		<span class="terminal-dot"></span>
		<span class="terminal-path">/blog</span>
	</div>
	<div class="terminal-body">
		<p class="terminal-prompt">$ <span class="cmd">ls -la ./posts</span></p>
		<p class="terminal-output">total {postCount} articles · last updated {lastUpdated}</p>
	</div>
</div>
```

**Step 4: Run test to verify it passes**

Run: `npm run test:unit:run -- src/lib/components/blog/BlogTerminalHeader.svelte.test.ts`
Expected: PASS (all 4 tests)

**Step 5: Commit**

```bash
git add src/lib/components/blog/BlogTerminalHeader.svelte src/lib/components/blog/BlogTerminalHeader.svelte.test.ts
git commit -m "feat(blog): add BlogTerminalHeader component"
```

---

### Task 2: BlogHeroPost Component

**Files:**
- Create: `src/lib/components/blog/BlogHeroPost.svelte`
- Create: `src/lib/components/blog/BlogHeroPost.svelte.test.ts`

**Step 1: Write the failing test**

```typescript
// src/lib/components/blog/BlogHeroPost.svelte.test.ts
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import BlogHeroPost from './BlogHeroPost.svelte';

const mockPost = {
	title: 'Building CLI Tools with Go',
	link: 'https://example.com/go-cli',
	content: '<p>A deep dive into building CLI tools with Go and Cobra.</p>',
	published: '2025-01-15',
	formattedDate: 'January 15, 2025',
	categories: ['go', 'cli'],
	slug: 'building-cli-tools-with-go'
};

describe('BlogHeroPost', () => {
	it('should render the post title with terminal marker', () => {
		render(BlogHeroPost, { props: { post: mockPost } });
		expect(screen.getByText('Building CLI Tools with Go')).toBeTruthy();
	});

	it('should display the LATEST badge', () => {
		render(BlogHeroPost, { props: { post: mockPost } });
		expect(screen.getByText('[LATEST]')).toBeTruthy();
	});

	it('should show metadata with date and categories', () => {
		render(BlogHeroPost, { props: { post: mockPost } });
		expect(screen.getByText(/2025-01-15/)).toBeTruthy();
		expect(screen.getByText(/go/)).toBeTruthy();
	});

	it('should render excerpt from content', () => {
		render(BlogHeroPost, { props: { post: mockPost } });
		expect(screen.getByText(/A deep dive into building CLI tools/)).toBeTruthy();
	});

	it('should link to the post', () => {
		const { container } = render(BlogHeroPost, { props: { post: mockPost } });
		const link = container.querySelector('a[href="https://example.com/go-cli"]');
		expect(link).toBeTruthy();
	});
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:unit:run -- src/lib/components/blog/BlogHeroPost.svelte.test.ts`
Expected: FAIL — module not found

**Step 3: Write the component**

```svelte
<!-- src/lib/components/blog/BlogHeroPost.svelte -->
<script lang="ts">
	import type { BlogPost } from '$lib/types/blog';

	const { post } = $props<{ post: BlogPost }>();

	function excerpt(content: string): string {
		return content.replace(/<[^>]+>/g, '').slice(0, 280) + (content.length > 280 ? '...' : '');
	}

	function formatCategories(categories: string[]): string {
		return categories.map((c) => c).join(', ');
	}
</script>

<style>
	.hero-post {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: var(--space-8);
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-inline-start: 0.25rem solid var(--accent-color);
		border-radius: var(--radius-md);
		box-shadow: inset 0.25rem 0 0 0 color-mix(in srgb, var(--accent-color) 20%, transparent);
		text-decoration: none;
		color: inherit;
		transition:
			border-color var(--transition-base),
			box-shadow var(--transition-base);
	}

	.hero-post:hover {
		border-color: var(--accent-color);
		box-shadow: inset 0.25rem 0 0 0 color-mix(in srgb, var(--accent-color) 40%, transparent);
	}

	.hero-post-badge {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-bold);
		color: var(--accent-color);
		letter-spacing: 0.05ch;
	}

	.hero-post-title {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
		line-height: var(--line-height-tight);
	}

	.hero-post-meta {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.hero-post-excerpt {
		font-family: var(--font-mono);
		font-size: var(--font-size-base);
		color: var(--text-muted);
		line-height: var(--line-height-relaxed);
	}

	@container blog-page (width >= 48rem) {
		.hero-post-title {
			font-size: var(--font-size-3xl);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-post {
			transition: none;
		}
	}
</style>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a href={post.link} class="hero-post" target="_blank" rel="noopener noreferrer">
	<span class="hero-post-badge">[LATEST]</span>
	<h2 class="hero-post-title">{post.title}</h2>
	<p class="hero-post-meta">
		published: {post.published}{post.categories.length > 0
			? ` | tags: [${formatCategories(post.categories)}]`
			: ''}
	</p>
	<p class="hero-post-excerpt">{excerpt(post.content)}</p>
</a>
```

**Step 4: Run test to verify it passes**

Run: `npm run test:unit:run -- src/lib/components/blog/BlogHeroPost.svelte.test.ts`
Expected: PASS (all 5 tests)

**Step 5: Commit**

```bash
git add src/lib/components/blog/BlogHeroPost.svelte src/lib/components/blog/BlogHeroPost.svelte.test.ts
git commit -m "feat(blog): add BlogHeroPost component for latest article"
```

---

### Task 3: Restyle BlogPostCard as Log Entry

**Files:**
- Modify: `src/lib/components/blog/BlogPostCard.svelte`

**Step 1: Write a test for the new bracket-style categories**

Create `src/lib/components/blog/BlogPostCard.svelte.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import BlogPostCard from './BlogPostCard.svelte';

const mockPost = {
	title: 'Testing in Go',
	link: 'https://example.com/testing-go',
	content: '<p>Learn how to write effective tests in Go.</p>',
	published: '2025-01-10',
	formattedDate: 'January 10, 2025',
	categories: ['go', 'testing'],
	slug: 'testing-in-go'
};

describe('BlogPostCard', () => {
	it('should render the post title', () => {
		render(BlogPostCard, { props: { post: mockPost } });
		expect(screen.getByText('Testing in Go')).toBeTruthy();
	});

	it('should display categories in bracket format', () => {
		render(BlogPostCard, { props: { post: mockPost } });
		expect(screen.getByText(/\[go, testing\]/)).toBeTruthy();
	});

	it('should show published date', () => {
		render(BlogPostCard, { props: { post: mockPost } });
		expect(screen.getByText(/2025-01-10/)).toBeTruthy();
	});

	it('should render truncated excerpt', () => {
		render(BlogPostCard, { props: { post: mockPost } });
		expect(screen.getByText(/Learn how to write effective tests/)).toBeTruthy();
	});

	it('should link to the post', () => {
		const { container } = render(BlogPostCard, { props: { post: mockPost } });
		const link = container.querySelector('a[href="https://example.com/testing-go"]');
		expect(link).toBeTruthy();
	});
});
```

**Step 2: Run test to verify current state**

Run: `npm run test:unit:run -- src/lib/components/blog/BlogPostCard.svelte.test.ts`
Expected: Some tests FAIL (bracket format not yet implemented)

**Step 3: Restyle the component**

Replace the content of `src/lib/components/blog/BlogPostCard.svelte` with log-entry styling:
- Remove `.card:hover` translateY transform
- Remove box-shadow hover
- Change category rendering from `<span class="category">` pills to inline `[brackets]`
- Metadata as single line: `2025-01-10 · [go, testing]`
- Compact padding, subtle left border
- Hover: left border → accent, slight background darkening

**Step 4: Run tests to verify they pass**

Run: `npm run test:unit:run -- src/lib/components/blog/BlogPostCard.svelte.test.ts`
Expected: PASS (all 5 tests)

**Step 5: Commit**

```bash
git add src/lib/components/blog/BlogPostCard.svelte src/lib/components/blog/BlogPostCard.svelte.test.ts
git commit -m "refactor(blog): restyle BlogPostCard as terminal log entry"
```

---

### Task 4: Update BlogPostGrid to 2-Column Max

**Files:**
- Modify: `src/lib/components/blog/BlogPostGrid.svelte`

**Step 1: Modify the grid layout**

In `BlogPostGrid.svelte`:
- Remove the `@container (width >= 64rem)` rule with `repeat(3, 1fr)`
- Remove the `@container (width >= 80rem)` rule with `repeat(4, 1fr)`
- Max grid is `repeat(2, 1fr)` at 48rem+
- Reduce gaps to tighter spacing

**Step 2: Run existing E2E tests to verify nothing breaks**

Run: `npm run test:e2e -- tests/blog.spec.ts`
Expected: PASS

**Step 3: Commit**

```bash
git add src/lib/components/blog/BlogPostGrid.svelte
git commit -m "refactor(blog): limit post grid to 2-column max layout"
```

---

### Task 5: Restyle FeaturedSeriesCard as Pinned Process

**Files:**
- Modify: `src/lib/components/series/FeaturedSeriesCard.svelte`
- Modify: `src/lib/components/series/FeaturedSeriesCard.svelte.test.ts`

**Step 1: Update tests for new structure**

Update `FeaturedSeriesCard.svelte.test.ts` to test for:
- `[SERIES]` label text
- Progress text format: `X/Y completed`
- Compact single-line layout (presence of `.pinned-process` class)
- Description with `>` prefix

**Step 2: Run tests to verify they fail**

Run: `npm run test:unit:run -- src/lib/components/series/FeaturedSeriesCard.svelte.test.ts`
Expected: FAIL (new selectors/text not found)

**Step 3: Restyle the component**

Replace the FeaturedSeriesCard styles and markup:
- Compact horizontal layout
- `[SERIES]` label in accent color
- Title inline with progress dots: `PSR Standards Deep Dive ·········· 3/12 completed`
- Description line with `>` prefix
- Subtle pulsing dot animation for "active" indicator
- No translateY hover, border-color transition only

**Step 4: Run tests to verify they pass**

Run: `npm run test:unit:run -- src/lib/components/series/FeaturedSeriesCard.svelte.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/components/series/FeaturedSeriesCard.svelte src/lib/components/series/FeaturedSeriesCard.svelte.test.ts
git commit -m "refactor(blog): restyle FeaturedSeriesCard as pinned process"
```

---

### Task 6: Simplify DevTo Component

**Files:**
- Modify: `src/lib/components/blog/DevTo.svelte`

**Step 1: Simplify to attribution line**

Replace the current DevTo component (background image section, overlay, large text) with a minimal terminal-footnote attribution:

```
syndicated from: jonesrussell.github.io/blog → dev.to/jonesrussell
```

- Remove the `section::before` background image
- Remove the `.dev-to-section` flex overlay
- Remove all the responsive height rules
- Replace with a simple `<p>` containing two links
- Style as monospace, muted text, compact

**Step 2: Run E2E tests**

Run: `npm run test:e2e -- tests/blog.spec.ts`
Expected: PASS (E2E tests don't check DevTo internals)

**Step 3: Commit**

```bash
git add src/lib/components/blog/DevTo.svelte
git commit -m "refactor(blog): simplify DevTo to minimal attribution line"
```

---

### Task 7: Rewire Blog Page Layout

**Files:**
- Modify: `src/routes/blog/+page.svelte`

This is the main integration task. Wire up all the new/restyled components.

**Step 1: Update the page template**

Replace the current `+page.svelte` template:

1. Remove `Hero` import, add `BlogTerminalHeader` and `BlogHeroPost` imports
2. Replace the hero wrapper with `<BlogTerminalHeader>`
3. Extract first post from `blogState.posts` for `<BlogHeroPost>`
4. Pass remaining posts to `<BlogPostsSection>`
5. Move FeaturedSeriesCard between hero and grid
6. Move NorthCloud and DevTo into a footer zone separated by dashed border
7. Replace `.northcloud-sidebar` styles with piped-output styling
8. Add scanline overlay to the main `.blog` container
9. Add staggered `animation-delay` to sections

**Step 2: Compute derived values**

```typescript
const heroPost = $derived(blogState.posts[0]);
const gridPosts = $derived(blogState.posts.slice(1));
const postCount = $derived(blogState.posts.length);
const lastUpdated = $derived(heroPost?.published ?? '');
```

**Step 3: Update the page structure**

```svelte
<BlogTerminalHeader {postCount} {lastUpdated} />

<div class="blog">
	<BlogError />

	<div class="container">
		{#if heroPost}
			<BlogHeroPost post={heroPost} />
		{/if}

		<FeaturedSeriesCard ... />

		{#if gridPosts.length > 0}
			<BlogPostsSection posts={gridPosts} />
		{/if}

		<!-- Load more / end states (same logic, updated button style) -->

		<footer class="blog-footer">
			<div class="footer-separator"></div>
			{#if data.northCloudArticles?.length}
				<div class="northcloud-feed">...</div>
			{/if}
			<DevTo />
		</footer>
	</div>
</div>
```

**Step 4: Update styles**

- Remove `.blog-hero-wrapper` and `broadcast-pulse` keyframes
- Add `.blog-footer` styles with dashed border separator
- Restyle NorthCloud as piped output (replace sidebar styles)
- Style load-more button as `$ load --more` with blinking cursor
- Add scanline overlay to `.blog::after`
- Add staggered animation delays for sections

**Step 5: Run all tests**

Run: `npm run test:unit:run -- --project=client && npm run test:e2e -- tests/blog.spec.ts`
Expected: Unit tests PASS, E2E tests may need updates (see Task 8)

**Step 6: Commit**

```bash
git add src/routes/blog/+page.svelte
git commit -m "feat(blog): rewire blog page with terminal feed layout"
```

---

### Task 8: Update E2E Tests

**Files:**
- Modify: `tests/blog.spec.ts`

**Step 1: Update selectors and assertions**

The E2E tests reference `.card`, `.title`, `.excerpt`, `.blog-section`, and `text=Web Developer Blog`. Update:

- Replace `text=Web Developer Blog` with selector for terminal header
- Replace `.card` with appropriate new class (`.hero-post` for first, then `.card` for grid items)
- Replace `.blog-section` with new section class
- Add test for hero post visibility
- Add test for terminal header elements

**Step 2: Run E2E tests**

Run: `npm run test:e2e -- tests/blog.spec.ts`
Expected: PASS

**Step 3: Commit**

```bash
git add tests/blog.spec.ts
git commit -m "test(blog): update E2E tests for terminal feed redesign"
```

---

### Task 9: Final Validation

**Step 1: Run full validation suite**

Run: `npm run validate`
Expected: PASS (types, lint, tests)

**Step 2: Run full E2E suite**

Run: `npm run test:e2e`
Expected: PASS (all specs)

**Step 3: Visual review**

Run: `npm run dev`
Manual check:
- Terminal header renders with post count
- Hero post is visually prominent with accent glow border
- Series card shows as pinned process
- Post grid is 2-column max
- NorthCloud appears as piped output in footer zone
- DevTo is a minimal attribution line
- Staggered animations on page load
- Hover effects work (border transitions, no lifts)
- Light theme and dark theme both work
- Mobile layout stacks correctly

**Step 4: Commit any final fixes**

```bash
git add -A
git commit -m "fix(blog): polish terminal feed redesign"
```
