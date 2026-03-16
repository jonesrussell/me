# Blog Subsystem Specification

## File Map

| File | Purpose |
|------|---------|
| `src/lib/services/blog-service.ts` | Fetches Dev.to RSS feed, parses XML, caches results (30-min TTL) |
| `src/lib/stores/blog.svelte.ts` | Svelte 5 rune store: posts, loading, error, pagination state |
| `src/lib/types/blog.ts` | BlogPost, BlogError type definitions |
| `src/lib/components/blog/BlogPostContent.svelte` | Full blog post body rendering (222 LOC) |
| `src/lib/components/blog/BlogPostHeader.svelte` | Post metadata header (title, date, categories) |
| `src/lib/components/blog/BlogHeroPost.svelte` | Featured/hero post card for blog listing |
| `src/lib/components/blog/BlogPostCard.svelte` | Standard post card for grid display |
| `src/lib/components/blog/BlogPostGrid.svelte` | Responsive grid layout for post cards |
| `src/lib/components/blog/BlogTerminalHeader.svelte` | Terminal-styled header for blog section |
| `src/lib/components/blog/DevTo.svelte` | Dev.to branding/attribution component |
| `src/routes/blog/+page.svelte` | Blog listing page |
| `src/routes/blog/+page.ts` | Universal load — disabled, prerender=false |
| `src/routes/blog/+page.server.ts` | Server load — fetches feed to avoid CORS |
| `src/routes/blog/[slug]/+page.svelte` | Blog detail page |
| `src/routes/blog/[slug]/+page.server.ts` | Server load for individual post (no prerender) |

## Interface Signatures

### BlogPost (type)
```typescript
interface BlogPost {
  title: string;
  link: string;
  content: string;       // Raw HTML from RSS
  published: string;     // ISO date string
  slug: string;          // URL-friendly identifier
  categories: string[];  // Tag list
}
```

### BlogError (type)
```typescript
interface BlogError {
  type: 'network' | 'parse' | 'unknown';
  message: string;
  details?: string;
}
```

### blog-service.ts
```typescript
// Main fetch function — accepts SvelteKit fetch for SSR compatibility
export const fetchFeed: (
  fetchFn: typeof fetch,
  options?: PaginationOptions
) => Promise<PaginatedResult<BlogPost>>;

// Cache management — call in tests to reset between test cases
export const resetFeedCache: () => void;
```

### blog.svelte.ts (store)
```typescript
// Rune-based state object
export const blogState: {
  posts: BlogPost[];
  loading: boolean;
  error: BlogError | null;
  currentPage: number;
  totalPages: number;
};
```

## Data Flow

### Blog listing page load
1. `+page.server.ts` calls `fetchFeed(fetch)` during SSR
2. `blog-service.ts` checks in-memory cache (30-min TTL)
3. Cache miss: fetches RSS XML from `https://jonesrussell.github.io/blog/feed.xml`
4. Parses XML → `BlogPost[]` with pagination
5. Returns `PaginatedResult<BlogPost>` to page
6. `+page.svelte` renders `BlogHeroPost` (first post) + `BlogPostGrid` (rest)

### Blog detail page load
1. `blog/[slug]/+page.server.ts` receives `params.slug`
2. Fetches full feed, finds matching post by slug
3. Returns single `BlogPost` to page
4. `BlogPostContent.svelte` renders sanitized HTML via `SafeHtml.svelte`

### Cache behavior
- In-memory Map keyed by pagination params
- 30-minute TTL per cache entry
- `resetFeedCache()` clears all entries (for tests)
- Cache lives in module scope — shared across requests in dev, fresh per cold start in prod

## External Dependencies

- **RSS Feed URL**: `https://jonesrussell.github.io/blog/feed.xml` (Dev.to cross-posted)
- **SafeHtml.svelte**: Required for rendering blog HTML content safely
- **sanitize-html**: Library used by SafeHtml for XSS prevention

## Edge Cases

- RSS feed unavailable: returns `BlogError` with type `'network'`
- Malformed XML: returns `BlogError` with type `'parse'`
- Empty feed: returns empty `BlogPost[]`, not an error
- Slug not found in feed: server load returns 404
- CORS: blog detail uses `+page.server.ts` (not universal load) because RSS feed doesn't set CORS headers
- HTML entities in titles: decoded via `html-entities.ts` utility
- Content sanitization: all blog HTML passes through `sanitize-html` before rendering

## Testing Patterns

- **Cache reset**: Call `resetFeedCache()` in `beforeEach` to prevent test pollution
- **Mock fetch**: Pass a mock `fetchFn` that returns test XML/JSON
- **Component tests**: Use `@testing-library/svelte` render with mock blog data props
- **Co-location**: Tests live next to components as `*.svelte.test.ts`
