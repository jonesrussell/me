# Series Subsystem Specification

## File Map

| File | Purpose |
|------|---------|
| `src/lib/services/series-code-service.ts` | Fetches code files from GitHub raw URLs with language detection |
| `src/lib/stores/series-progress.svelte.ts` | localStorage-backed progress tracking per series entry |
| `src/lib/types/series.ts` | ISeriesEntry, ISeriesGroup, ISeriesCodeFile interfaces |
| `src/lib/data/series/psr.ts` | PSR (PHP Standards Recommendation) series data definitions |
| `src/lib/components/series/SeriesEntryCard.svelte` | Card for individual series entry |
| `src/lib/components/series/SeriesCodeView.svelte` | Code viewer with syntax highlighting (3.2K LOC) |
| `src/lib/components/series/SeriesHeader.svelte` | Series title and description header |
| `src/lib/components/series/SeriesProgressBar.svelte` | Visual progress indicator |
| `src/lib/components/series/FeaturedSeriesCard.svelte` | Highlighted series card for home page |
| `src/routes/blog/series/psr/+page.svelte` | PSR series listing page |

## Interface Signatures

### ISeriesEntry
```typescript
interface ISeriesEntry {
  psrNumber: number;
  slug: string;
  title: string;
  summary: string;
  companionFiles: string[];   // GitHub raw file paths
  testFiles: string[];         // Associated test file paths
  prerequisites: string[];     // Slugs of prerequisite entries
}
```

### ISeriesGroup
```typescript
interface ISeriesGroup {
  title: string;
  description: string;
  entries: ISeriesEntry[];
}
```

### ISeriesCodeFile
```typescript
interface ISeriesCodeFile {
  filename: string;
  content: string;
  language: string;    // Detected from file extension
}
```

### series-code-service.ts
```typescript
// Fetches a code file from GitHub raw URL, detects language from extension
export const fetchCodeFile: (
  fetchFn: typeof fetch,
  url: string
) => Promise<ISeriesCodeFile>;
```

### series-progress.svelte.ts
```typescript
// Rune-based state with localStorage persistence
export const seriesProgress: {
  completed: Set<string>;       // Set of completed entry slugs
  get completedCount(): number;
  get totalCount(): number;
};

export function markCompleted(slug: string): void;
export function markIncomplete(slug: string): void;
export function isCompleted(slug: string): boolean;
```

## Data Flow

### Series listing
1. Route loads, imports PSR series data from `src/lib/data/series/psr.ts`
2. Static data — no fetch needed, series definitions are bundled
3. `SeriesHeader` renders group info
4. `SeriesEntryCard` renders each entry with progress state from store
5. `SeriesProgressBar` shows overall completion

### Code viewing
1. User clicks an entry with companion files
2. `SeriesCodeView` calls `fetchCodeFile()` for each companion/test file
3. Service fetches from `raw.githubusercontent.com` URLs
4. Language detected from file extension (.php → PHP, .js → JavaScript, etc.)
5. Code rendered with syntax highlighting via `highlight-code` action

### Progress persistence
- `seriesProgress` store syncs to `localStorage` on every mutation
- Key format: `series-progress-{slug}`
- Loaded on component mount, persists across sessions

## External Dependencies

- **GitHub Raw**: `raw.githubusercontent.com` for companion code files
- **highlight-code action**: `src/lib/actions/highlight-code.ts` for syntax highlighting

## Edge Cases

- GitHub raw fetch failure: displays error in code view, doesn't break page
- Missing companion files: entry renders without code view
- localStorage unavailable (SSR): progress defaults to empty, hydrates on client
- File extension not recognized: language defaults to `'text'`
