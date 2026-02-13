# Blog Series Feature Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a series feature to the portfolio blog, starting with a PSR (PHP-FIG Standards) series that groups 14 posts into a guided reading path with progress tracking and inline code examples from a companion GitHub repo.

**Architecture:** Static TypeScript data module defines series structure. A dedicated route (`/blog/series/psr`) renders the series page with grouped entries, localStorage-persisted progress, and PHP source code fetched at build time from GitHub raw content API. A featured card on `/blog` links visitors to the series.

**Tech Stack:** SvelteKit, Svelte 5 runes, TypeScript, highlight.js (PHP already registered), GitHub raw content API, localStorage.

**Design doc:** `docs/plans/2026-02-13-blog-series-design.md`

---

### Task 1: Series Types

**Files:**
- Create: `src/lib/types/series.ts`
- Test: `src/lib/types/series.test.ts`

**Step 1: Write the type definitions**

```typescript
// src/lib/types/series.ts

export interface ISeriesEntry {
  psrNumber: number;
  slug: string;
  title: string;
  summary: string;
  companionFiles: string[];
  testFiles: string[];
  prerequisites: number[];
}

export interface ISeriesGroup {
  name: string;
  entries: ISeriesEntry[];
}

export interface ISeriesCodeFile {
  path: string;
  content: string;
  language: string;
}

export interface ISeries {
  id: string;
  title: string;
  description: string;
  repoUrl: string;
  groups: ISeriesGroup[];
}
```

**Step 2: Write the failing test**

```typescript
// src/lib/types/series.test.ts
import { describe, it, expect } from 'vitest';
import type { ISeries, ISeriesEntry, ISeriesGroup, ISeriesCodeFile } from './series';

describe('Series types', () => {
  it('should allow constructing a valid ISeriesEntry', () => {
    const entry: ISeriesEntry = {
      psrNumber: 1,
      slug: 'psr-1-basic-coding-standard',
      title: 'Basic Coding Standard',
      summary: 'The foundational coding standard for PHP.',
      companionFiles: ['src/PSR1/UserManager.php'],
      testFiles: ['tests/PSR1/UserManagerTest.php'],
      prerequisites: []
    };
    expect(entry.psrNumber).toBe(1);
    expect(entry.slug).toBe('psr-1-basic-coding-standard');
  });

  it('should allow constructing a valid ISeriesGroup', () => {
    const group: ISeriesGroup = {
      name: 'Foundation',
      entries: []
    };
    expect(group.name).toBe('Foundation');
  });

  it('should allow constructing a valid ISeriesCodeFile', () => {
    const file: ISeriesCodeFile = {
      path: 'src/PSR1/UserManager.php',
      content: '<?php // code',
      language: 'php'
    };
    expect(file.language).toBe('php');
  });

  it('should allow constructing a valid ISeries', () => {
    const series: ISeries = {
      id: 'psr',
      title: 'PHP-FIG Standards',
      description: 'A guide to PSR standards.',
      repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
      groups: []
    };
    expect(series.id).toBe('psr');
  });
});
```

**Step 3: Run test to verify it passes**

Run: `npm run test:unit:run -- src/lib/types/series.test.ts`
Expected: PASS (4 tests)

**Step 4: Commit**

```bash
git add src/lib/types/series.ts src/lib/types/series.test.ts
git commit -m "feat(series): add series type definitions"
```

---

### Task 2: PSR Series Data Module

**Files:**
- Create: `src/lib/data/series/psr.ts`
- Test: `src/lib/data/series/psr.test.ts`

**Step 1: Write the failing test**

The test validates the series data integrity: no duplicate slugs, valid prerequisites, companion file paths follow patterns, all groups have entries.

```typescript
// src/lib/data/series/psr.test.ts
import { describe, it, expect } from 'vitest';
import { psrSeries } from './psr';

describe('PSR series data', () => {
  it('should have the correct id and metadata', () => {
    expect(psrSeries.id).toBe('psr');
    expect(psrSeries.title).toBe('PHP-FIG Standards Guide');
    expect(psrSeries.repoUrl).toBe('https://github.com/jonesrussell/php-fig-guide');
  });

  it('should have 5 groups', () => {
    expect(psrSeries.groups).toHaveLength(5);
    const names = psrSeries.groups.map(g => g.name);
    expect(names).toEqual([
      'Foundation',
      'Core Infrastructure',
      'HTTP Stack',
      'Data & Caching',
      'Specialized'
    ]);
  });

  it('should have 14 total entries', () => {
    const total = psrSeries.groups.reduce((sum, g) => sum + g.entries.length, 0);
    expect(total).toBe(14);
  });

  it('should have no duplicate slugs', () => {
    const allEntries = psrSeries.groups.flatMap(g => g.entries);
    const slugs = allEntries.map(e => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('should have no duplicate PSR numbers', () => {
    const allEntries = psrSeries.groups.flatMap(g => g.entries);
    const numbers = allEntries.map(e => e.psrNumber);
    expect(new Set(numbers).size).toBe(numbers.length);
  });

  it('should only reference valid PSR numbers in prerequisites', () => {
    const allEntries = psrSeries.groups.flatMap(g => g.entries);
    const validNumbers = new Set(allEntries.map(e => e.psrNumber));
    for (const entry of allEntries) {
      for (const prereq of entry.prerequisites) {
        expect(validNumbers.has(prereq)).toBe(true);
      }
    }
  });

  it('should have companion files for every entry', () => {
    const allEntries = psrSeries.groups.flatMap(g => g.entries);
    for (const entry of allEntries) {
      expect(entry.companionFiles.length).toBeGreaterThan(0);
      expect(entry.testFiles.length).toBeGreaterThan(0);
    }
  });

  it('should have every group non-empty', () => {
    for (const group of psrSeries.groups) {
      expect(group.entries.length).toBeGreaterThan(0);
    }
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:unit:run -- src/lib/data/series/psr.test.ts`
Expected: FAIL — `psrSeries` not found

**Step 3: Write the PSR series data module**

```typescript
// src/lib/data/series/psr.ts
import type { ISeries } from '$lib/types/series';

export const psrSeries: ISeries = {
  id: 'psr',
  title: 'PHP-FIG Standards Guide',
  description:
    'A practical guide to PHP-FIG\'s PSR standards with real-world examples. Each post explores a PSR with analogies, interface commentary, working implementations, and common mistakes.',
  repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
  groups: [
    {
      name: 'Foundation',
      entries: [
        {
          psrNumber: 1,
          slug: 'psr-1-basic-coding-standard-in-php',
          title: 'Basic Coding Standard',
          summary: 'The "house rules" for PHP code — files, namespaces, classes, and methods.',
          companionFiles: ['src/PSR1/UserManager.php'],
          testFiles: ['tests/PSR1/UserManagerTest.php'],
          prerequisites: []
        },
        {
          psrNumber: 12,
          slug: 'psr-12-extended-coding-style-guide-in-php',
          title: 'Extended Coding Style',
          summary: 'Detailed formatting rules that extend PSR-1 for consistent code style.',
          companionFiles: ['src/PSR12/ExampleClass.php', 'src/PSR12/ExtendedCodingStyleGuide.php'],
          testFiles: ['tests/PSR12/ExtendedCodingStyleGuideTest.php'],
          prerequisites: [1]
        },
        {
          psrNumber: 4,
          slug: 'psr-4-autoloading-standard-in-php',
          title: 'Autoloading Standard',
          summary: 'How PHP finds your classes automatically via namespace-to-directory mapping.',
          companionFiles: ['src/PSR4/Core/Database/Connection.php', 'src/PSR4/Post/PostController.php'],
          testFiles: ['tests/PSR4/Core/Database/ConnectionTest.php', 'tests/PSR4/Post/PostControllerTest.php'],
          prerequisites: [1]
        }
      ]
    },
    {
      name: 'Core Infrastructure',
      entries: [
        {
          psrNumber: 3,
          slug: 'psr-3-logger-interface-in-php',
          title: 'Logger Interface',
          summary: 'Standardized logging across your application with severity levels.',
          companionFiles: ['src/PSR3/SmartLogger.php'],
          testFiles: ['tests/PSR3/SmartLoggerTest.php'],
          prerequisites: [1, 4]
        },
        {
          psrNumber: 11,
          slug: 'psr-11-container-interface-in-php',
          title: 'Container Interface',
          summary: 'Dependency injection made interoperable across frameworks.',
          companionFiles: ['src/PSR11/ExampleContainer.php', 'src/PSR11/DatabaseConnection.php', 'src/PSR11/Logger.php'],
          testFiles: ['tests/PSR11/ExampleContainerTest.php'],
          prerequisites: [1, 4]
        },
        {
          psrNumber: 14,
          slug: 'psr-14-event-dispatcher-in-php',
          title: 'Event Dispatcher',
          summary: 'Decoupled communication between components via events and listeners.',
          companionFiles: ['src/Event/PostCreatedEvent.php', 'src/Event/SimpleEventDispatcher.php', 'src/Event/SimpleListenerProvider.php'],
          testFiles: ['tests/Event/SimpleEventDispatcherTest.php'],
          prerequisites: [1, 4, 11]
        }
      ]
    },
    {
      name: 'HTTP Stack',
      entries: [
        {
          psrNumber: 7,
          slug: 'psr-7-http-message-interfaces-in-php',
          title: 'HTTP Message Interfaces',
          summary: 'The standard "shape" of HTTP requests and responses in PHP.',
          companionFiles: ['src/PSR7/Request.php', 'src/PSR7/Response.php', 'src/PSR7/Stream.php', 'src/PSR7/Uri.php'],
          testFiles: ['tests/PSR7/RequestTest.php', 'tests/PSR7/ResponseTest.php'],
          prerequisites: [1, 4]
        },
        {
          psrNumber: 17,
          slug: 'psr-17-http-factories-in-php',
          title: 'HTTP Factories',
          summary: 'Creating PSR-7 objects without coupling to implementations.',
          companionFiles: ['src/Http/Factory/ResponseFactory.php', 'src/Http/Factory/StreamFactory.php'],
          testFiles: ['tests/Http/Factory/ResponseFactoryTest.php'],
          prerequisites: [7]
        },
        {
          psrNumber: 15,
          slug: 'psr-15-http-handlers-and-middleware-in-php',
          title: 'HTTP Handlers & Middleware',
          summary: 'Processing HTTP requests through a middleware pipeline.',
          companionFiles: ['src/Http/Middleware/AuthMiddleware.php', 'src/Http/Middleware/LoggingMiddleware.php', 'src/Http/Middleware/MiddlewarePipeline.php'],
          testFiles: ['tests/Http/Middleware/MiddlewarePipelineTest.php'],
          prerequisites: [7, 17]
        },
        {
          psrNumber: 18,
          slug: 'psr-18-http-client-in-php',
          title: 'HTTP Client',
          summary: 'Sending HTTP requests the standard way.',
          companionFiles: ['src/Http/Client/SimpleHttpClient.php', 'src/Http/Client/NetworkException.php'],
          testFiles: ['tests/Http/Client/SimpleHttpClientTest.php'],
          prerequisites: [7, 17]
        }
      ]
    },
    {
      name: 'Data & Caching',
      entries: [
        {
          psrNumber: 6,
          slug: 'psr-6-caching-interface-in-php',
          title: 'Caching Interface',
          summary: 'Full-featured cache pools and items for complex caching needs.',
          companionFiles: ['src/PSR6/CacheItem.php', 'src/PSR6/FileCachePool.php'],
          testFiles: ['tests/PSR6/CacheItemTest.php', 'tests/PSR6/FileCachePoolTest.php'],
          prerequisites: [1, 4]
        },
        {
          psrNumber: 16,
          slug: 'psr-16-simple-cache-in-php',
          title: 'Simple Cache',
          summary: 'Lightweight key-value caching for straightforward use cases.',
          companionFiles: ['src/Cache/SimpleCache/FileCache.php'],
          testFiles: ['tests/Cache/SimpleCache/FileCacheTest.php'],
          prerequisites: [1, 4]
        }
      ]
    },
    {
      name: 'Specialized',
      entries: [
        {
          psrNumber: 13,
          slug: 'psr-13-hypermedia-links-in-php',
          title: 'Hypermedia Links',
          summary: 'Self-documenting REST APIs with HATEOAS link relations.',
          companionFiles: ['src/PSR13/HypermediaLink.php', 'src/PSR13/HypermediaLinkProvider.php'],
          testFiles: ['tests/PSR13/HypermediaLinkTest.php', 'tests/PSR13/HypermediaLinkProviderTest.php'],
          prerequisites: [1, 4, 7]
        },
        {
          psrNumber: 20,
          slug: 'psr-20-clock-in-php',
          title: 'Clock Interface',
          summary: 'Testable time handling by abstracting the system clock.',
          companionFiles: ['src/Clock/SystemClock.php', 'src/Clock/FrozenClock.php'],
          testFiles: ['tests/Clock/FrozenClockTest.php'],
          prerequisites: [1, 4]
        }
      ]
    }
  ]
};

/** Flat list of all entries across all groups, in reading order. */
export function getAllEntries(): ISeries['groups'][number]['entries'] {
  return psrSeries.groups.flatMap(g => g.entries);
}

/** Total number of entries in the series. */
export function getTotalEntries(): number {
  return getAllEntries().length;
}
```

**Important:** The slugs above are generated from the blog post titles by the `generateSlug()` function in `src/lib/services/blog-service.ts`. The actual slugs must match. Before committing, verify by running `generateSlug("PSR-1: Basic Coding Standard in PHP")` etc. to confirm. The slugs in Hugo frontmatter (e.g., `psr-1-basic-coding-standard`) may differ from the SvelteKit-generated slugs (from the title). Check both and use whichever the SvelteKit blog service produces.

**Step 4: Run test to verify it passes**

Run: `npm run test:unit:run -- src/lib/data/series/psr.test.ts`
Expected: PASS (8 tests)

**Step 5: Commit**

```bash
git add src/lib/data/series/psr.ts src/lib/data/series/psr.test.ts
git commit -m "feat(series): add PSR series data module with validation tests"
```

---

### Task 3: Series Progress Store

**Files:**
- Create: `src/lib/stores/series-progress.svelte.ts`
- Test: `src/lib/stores/series-progress.test.ts`

**Step 1: Write the failing test**

```typescript
// src/lib/stores/series-progress.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage before importing the store
const mockStorage: Record<string, string> = {};
vi.stubGlobal('localStorage', {
  getItem: vi.fn((key: string) => mockStorage[key] ?? null),
  setItem: vi.fn((key: string, value: string) => { mockStorage[key] = value; }),
  removeItem: vi.fn((key: string) => { delete mockStorage[key]; })
});

import {
  seriesProgressState,
  toggleCompleted,
  isCompleted,
  completedCount,
  completionPercentage,
  suggestedNext,
  resetProgress
} from './series-progress.svelte';
import { psrSeries, getAllEntries } from '$lib/data/series/psr';

describe('series-progress store', () => {
  beforeEach(() => {
    Object.keys(mockStorage).forEach(k => delete mockStorage[k]);
    vi.clearAllMocks();
    resetProgress();
  });

  it('should start with no completed entries', () => {
    expect(seriesProgressState.completed).toEqual({});
  });

  it('should toggle a post as completed', () => {
    toggleCompleted('psr', 'psr-1-basic-coding-standard-in-php');
    expect(isCompleted('psr', 'psr-1-basic-coding-standard-in-php')).toBe(true);
  });

  it('should toggle a completed post back to incomplete', () => {
    toggleCompleted('psr', 'psr-1-basic-coding-standard-in-php');
    toggleCompleted('psr', 'psr-1-basic-coding-standard-in-php');
    expect(isCompleted('psr', 'psr-1-basic-coding-standard-in-php')).toBe(false);
  });

  it('should count completed entries', () => {
    toggleCompleted('psr', 'psr-1-basic-coding-standard-in-php');
    toggleCompleted('psr', 'psr-12-extended-coding-style-guide-in-php');
    expect(completedCount('psr')).toBe(2);
  });

  it('should calculate completion percentage', () => {
    toggleCompleted('psr', 'psr-1-basic-coding-standard-in-php');
    // 1 of 14 = ~7.14%
    expect(completionPercentage('psr', 14)).toBeCloseTo(7.14, 0);
  });

  it('should return the suggested next entry', () => {
    const allEntries = getAllEntries();
    const next = suggestedNext('psr', allEntries);
    // First entry is suggested when nothing is completed
    expect(next?.slug).toBe(allEntries[0].slug);
  });

  it('should skip completed entries for suggested next', () => {
    const allEntries = getAllEntries();
    toggleCompleted('psr', allEntries[0].slug);
    const next = suggestedNext('psr', allEntries);
    expect(next?.slug).toBe(allEntries[1].slug);
  });

  it('should persist to localStorage on toggle', () => {
    toggleCompleted('psr', 'psr-1-basic-coding-standard-in-php');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'series-progress',
      expect.any(String)
    );
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:unit:run -- --project=server src/lib/stores/series-progress.test.ts`
Expected: FAIL — module not found

**Step 3: Write the store**

```typescript
// src/lib/stores/series-progress.svelte.ts
import type { ISeriesEntry } from '$lib/types/series';

const STORAGE_KEY = 'series-progress';

interface SeriesProgressType {
  completed: Record<string, string[]>;
}

export const seriesProgressState = $state<SeriesProgressType>({
  completed: {}
});

/** Load progress from localStorage. Call from $effect in a component. */
export function loadProgress(): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      seriesProgressState.completed = parsed;
    }
  } catch {
    // Invalid data — start fresh
  }
}

function persist(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seriesProgressState.completed));
  } catch {
    // localStorage full or unavailable
  }
}

export function toggleCompleted(seriesId: string, slug: string): void {
  const current = seriesProgressState.completed[seriesId] ?? [];
  if (current.includes(slug)) {
    seriesProgressState.completed = {
      ...seriesProgressState.completed,
      [seriesId]: current.filter(s => s !== slug)
    };
  } else {
    seriesProgressState.completed = {
      ...seriesProgressState.completed,
      [seriesId]: [...current, slug]
    };
  }
  persist();
}

export function isCompleted(seriesId: string, slug: string): boolean {
  return (seriesProgressState.completed[seriesId] ?? []).includes(slug);
}

export function completedCount(seriesId: string): number {
  return (seriesProgressState.completed[seriesId] ?? []).length;
}

export function completionPercentage(seriesId: string, total: number): number {
  if (total === 0) return 0;
  return (completedCount(seriesId) / total) * 100;
}

export function suggestedNext(
  seriesId: string,
  allEntries: ISeriesEntry[]
): ISeriesEntry | null {
  const completed = seriesProgressState.completed[seriesId] ?? [];
  return allEntries.find(e => !completed.includes(e.slug)) ?? null;
}

/** Reset all progress (for testing). */
export function resetProgress(): void {
  seriesProgressState.completed = {};
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test:unit:run -- --project=server src/lib/stores/series-progress.test.ts`
Expected: PASS (8 tests)

**Step 5: Commit**

```bash
git add src/lib/stores/series-progress.svelte.ts src/lib/stores/series-progress.test.ts
git commit -m "feat(series): add progress tracking store with localStorage persistence"
```

---

### Task 4: Series Code Service

**Files:**
- Create: `src/lib/services/series-code-service.ts`
- Test: `src/lib/services/series-code-service.test.ts`

**Step 1: Write the failing test**

```typescript
// src/lib/services/series-code-service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCodeFile, fetchSeriesCode } from './series-code-service';

const mockFetch = vi.fn();

describe('series-code-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch a single code file from GitHub raw content API', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('<?php\nclass UserManager {}')
    });

    const result = await fetchCodeFile(
      mockFetch,
      'jonesrussell/php-fig-guide',
      'src/PSR1/UserManager.php'
    );

    expect(result).toEqual({
      path: 'src/PSR1/UserManager.php',
      content: '<?php\nclass UserManager {}',
      language: 'php'
    });
    expect(mockFetch).toHaveBeenCalledWith(
      'https://raw.githubusercontent.com/jonesrussell/php-fig-guide/main/src/PSR1/UserManager.php'
    );
  });

  it('should return error content on fetch failure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    const result = await fetchCodeFile(
      mockFetch,
      'jonesrussell/php-fig-guide',
      'src/Missing.php'
    );

    expect(result.content).toContain('Failed to load');
    expect(result.language).toBe('text');
  });

  it('should detect PHP language from file extension', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('<?php')
    });

    const result = await fetchCodeFile(mockFetch, 'owner/repo', 'src/File.php');
    expect(result.language).toBe('php');
  });

  it('should fetch all code files for a series entry', async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve('source code') })
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve('test code') });

    const result = await fetchSeriesCode(
      mockFetch,
      'jonesrussell/php-fig-guide',
      ['src/PSR1/UserManager.php'],
      ['tests/PSR1/UserManagerTest.php']
    );

    expect(result.sourceFiles).toHaveLength(1);
    expect(result.testFiles).toHaveLength(1);
    expect(result.sourceFiles[0].content).toBe('source code');
    expect(result.testFiles[0].content).toBe('test code');
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:unit:run -- --project=server src/lib/services/series-code-service.test.ts`
Expected: FAIL — module not found

**Step 3: Write the service**

```typescript
// src/lib/services/series-code-service.ts
import type { ISeriesCodeFile } from '$lib/types/series';

const RAW_BASE = 'https://raw.githubusercontent.com';

function detectLanguage(path: string): string {
  if (path.endsWith('.php')) return 'php';
  if (path.endsWith('.json')) return 'json';
  if (path.endsWith('.xml')) return 'xml';
  return 'text';
}

export async function fetchCodeFile(
  fetchFn: typeof fetch,
  repoSlug: string,
  filePath: string,
  branch = 'main'
): Promise<ISeriesCodeFile> {
  const url = `${RAW_BASE}/${repoSlug}/${branch}/${filePath}`;

  try {
    const response = await fetchFn(url);
    if (!response.ok) {
      return {
        path: filePath,
        content: `// Failed to load ${filePath} (HTTP ${response.status})`,
        language: 'text'
      };
    }
    const content = await response.text();
    return {
      path: filePath,
      content,
      language: detectLanguage(filePath)
    };
  } catch {
    return {
      path: filePath,
      content: `// Failed to load ${filePath}`,
      language: 'text'
    };
  }
}

export async function fetchSeriesCode(
  fetchFn: typeof fetch,
  repoSlug: string,
  companionFiles: string[],
  testFiles: string[],
  branch = 'main'
): Promise<{ sourceFiles: ISeriesCodeFile[]; testFiles: ISeriesCodeFile[] }> {
  const [sourceFiles, testResults] = await Promise.all([
    Promise.all(companionFiles.map(f => fetchCodeFile(fetchFn, repoSlug, f, branch))),
    Promise.all(testFiles.map(f => fetchCodeFile(fetchFn, repoSlug, f, branch)))
  ]);

  return { sourceFiles, testFiles: testResults };
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test:unit:run -- --project=server src/lib/services/series-code-service.test.ts`
Expected: PASS (4 tests)

**Step 5: Commit**

```bash
git add src/lib/services/series-code-service.ts src/lib/services/series-code-service.test.ts
git commit -m "feat(series): add service to fetch code from GitHub raw content API"
```

---

### Task 5: SeriesProgressBar Component

**Files:**
- Create: `src/lib/components/series/SeriesProgressBar.svelte`
- Test: `src/lib/components/series/SeriesProgressBar.svelte.test.ts`

**Step 1: Write the failing test**

```typescript
// src/lib/components/series/SeriesProgressBar.svelte.test.ts
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import SeriesProgressBar from './SeriesProgressBar.svelte';

describe('SeriesProgressBar', () => {
  it('should render the progress text', () => {
    render(SeriesProgressBar, { props: { completed: 3, total: 14 } });
    expect(screen.getByText('3 of 14')).toBeTruthy();
  });

  it('should render a progress bar with correct width', () => {
    const { container } = render(SeriesProgressBar, { props: { completed: 7, total: 14 } });
    const fill = container.querySelector('.progress-fill') as HTMLElement;
    expect(fill.style.width).toBe('50%');
  });

  it('should show 0% when nothing is completed', () => {
    const { container } = render(SeriesProgressBar, { props: { completed: 0, total: 14 } });
    const fill = container.querySelector('.progress-fill') as HTMLElement;
    expect(fill.style.width).toBe('0%');
  });

  it('should show 100% when all completed', () => {
    const { container } = render(SeriesProgressBar, { props: { completed: 14, total: 14 } });
    const fill = container.querySelector('.progress-fill') as HTMLElement;
    expect(fill.style.width).toBe('100%');
  });

  it('should have accessible role and aria attributes', () => {
    render(SeriesProgressBar, { props: { completed: 5, total: 14 } });
    const bar = screen.getByRole('progressbar');
    expect(bar).toBeTruthy();
    expect(bar.getAttribute('aria-valuenow')).toBe('5');
    expect(bar.getAttribute('aria-valuemax')).toBe('14');
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:unit:run -- --project=client src/lib/components/series/SeriesProgressBar.svelte.test.ts`
Expected: FAIL — module not found

**Step 3: Write the component**

Create `src/lib/components/series/SeriesProgressBar.svelte`. Follow project CSS conventions: container queries, custom properties, rem units, no px/em.

**Step 4: Run test to verify it passes**

Run: `npm run test:unit:run -- --project=client src/lib/components/series/SeriesProgressBar.svelte.test.ts`
Expected: PASS (5 tests)

**Step 5: Commit**

```bash
git add src/lib/components/series/SeriesProgressBar.svelte src/lib/components/series/SeriesProgressBar.svelte.test.ts
git commit -m "feat(series): add SeriesProgressBar component"
```

---

### Task 6: SeriesCodeView Component

**Files:**
- Create: `src/lib/components/series/SeriesCodeView.svelte`
- Test: `src/lib/components/series/SeriesCodeView.svelte.test.ts`

This component shows inline PHP code with tabs (Source / Tests), syntax highlighting, and a GitHub link.

**Step 1: Write the failing test**

```typescript
// src/lib/components/series/SeriesCodeView.svelte.test.ts
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import SeriesCodeView from './SeriesCodeView.svelte';
import type { ISeriesCodeFile } from '$lib/types/series';

// Mock the highlight-code action (it requires DOM APIs not in jsdom)
vi.mock('$lib/actions/highlight-code', () => ({
  highlightCode: () => ({ destroy() {} })
}));

const mockSourceFiles: ISeriesCodeFile[] = [
  { path: 'src/PSR1/UserManager.php', content: '<?php\nclass UserManager {}', language: 'php' }
];
const mockTestFiles: ISeriesCodeFile[] = [
  { path: 'tests/PSR1/UserManagerTest.php', content: '<?php\nclass UserManagerTest {}', language: 'php' }
];

describe('SeriesCodeView', () => {
  it('should render source tab by default', () => {
    render(SeriesCodeView, {
      props: {
        sourceFiles: mockSourceFiles,
        testFiles: mockTestFiles,
        repoUrl: 'https://github.com/jonesrussell/php-fig-guide'
      }
    });
    expect(screen.getByText('Source')).toBeTruthy();
    expect(screen.getByText('Tests')).toBeTruthy();
  });

  it('should show source file content', () => {
    const { container } = render(SeriesCodeView, {
      props: {
        sourceFiles: mockSourceFiles,
        testFiles: mockTestFiles,
        repoUrl: 'https://github.com/jonesrussell/php-fig-guide'
      }
    });
    expect(container.textContent).toContain('class UserManager');
  });

  it('should switch to test tab on click', async () => {
    const { container } = render(SeriesCodeView, {
      props: {
        sourceFiles: mockSourceFiles,
        testFiles: mockTestFiles,
        repoUrl: 'https://github.com/jonesrussell/php-fig-guide'
      }
    });
    const testTab = screen.getByText('Tests');
    await fireEvent.click(testTab);
    expect(container.textContent).toContain('class UserManagerTest');
  });

  it('should render View on GitHub links', () => {
    render(SeriesCodeView, {
      props: {
        sourceFiles: mockSourceFiles,
        testFiles: mockTestFiles,
        repoUrl: 'https://github.com/jonesrussell/php-fig-guide'
      }
    });
    const links = screen.getAllByText('View on GitHub');
    expect(links.length).toBeGreaterThan(0);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:unit:run -- --project=client src/lib/components/series/SeriesCodeView.svelte.test.ts`
Expected: FAIL — module not found

**Step 3: Write the component**

Create `src/lib/components/series/SeriesCodeView.svelte`. Uses `highlightCode` action from `$lib/actions/highlight-code` for syntax highlighting. Has two tabs that switch between source and test file views. Each file shows its path as a header and a `<pre><code>` block. A "View on GitHub" link under each file opens `{repoUrl}/blob/main/{path}`.

**Step 4: Run test to verify it passes**

Run: `npm run test:unit:run -- --project=client src/lib/components/series/SeriesCodeView.svelte.test.ts`
Expected: PASS (4 tests)

**Step 5: Commit**

```bash
git add src/lib/components/series/SeriesCodeView.svelte src/lib/components/series/SeriesCodeView.svelte.test.ts
git commit -m "feat(series): add SeriesCodeView component with tabbed source/test display"
```

---

### Task 7: SeriesEntryCard Component

**Files:**
- Create: `src/lib/components/series/SeriesEntryCard.svelte`
- Test: `src/lib/components/series/SeriesEntryCard.svelte.test.ts`

This is the card for each PSR entry. Shows number, title, summary, checkbox, prerequisites, "View Code" toggle, and suggested-next indicator.

**Step 1: Write the failing test**

```typescript
// src/lib/components/series/SeriesEntryCard.svelte.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import SeriesEntryCard from './SeriesEntryCard.svelte';

// Mock progress store
vi.mock('$lib/stores/series-progress.svelte', () => ({
  isCompleted: vi.fn(() => false),
  toggleCompleted: vi.fn()
}));

// Mock highlight-code action
vi.mock('$lib/actions/highlight-code', () => ({
  highlightCode: () => ({ destroy() {} })
}));

const mockEntry = {
  psrNumber: 1,
  slug: 'psr-1-basic-coding-standard-in-php',
  title: 'Basic Coding Standard',
  summary: 'The foundational coding standard for PHP.',
  companionFiles: ['src/PSR1/UserManager.php'],
  testFiles: ['tests/PSR1/UserManagerTest.php'],
  prerequisites: []
};

const mockCodeData = {
  sourceFiles: [{ path: 'src/PSR1/UserManager.php', content: '<?php', language: 'php' }],
  testFiles: [{ path: 'tests/PSR1/UserManagerTest.php', content: '<?php', language: 'php' }]
};

describe('SeriesEntryCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render PSR number and title', () => {
    render(SeriesEntryCard, {
      props: {
        entry: mockEntry,
        seriesId: 'psr',
        repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
        codeData: mockCodeData,
        isSuggested: false
      }
    });
    expect(screen.getByText(/PSR-1/)).toBeTruthy();
    expect(screen.getByText(/Basic Coding Standard/)).toBeTruthy();
  });

  it('should render summary text', () => {
    render(SeriesEntryCard, {
      props: {
        entry: mockEntry,
        seriesId: 'psr',
        repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
        codeData: mockCodeData,
        isSuggested: false
      }
    });
    expect(screen.getByText('The foundational coding standard for PHP.')).toBeTruthy();
  });

  it('should show suggested indicator when isSuggested is true', () => {
    const { container } = render(SeriesEntryCard, {
      props: {
        entry: mockEntry,
        seriesId: 'psr',
        repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
        codeData: mockCodeData,
        isSuggested: true
      }
    });
    expect(container.querySelector('.suggested')).toBeTruthy();
  });

  it('should have a checkbox for completion', () => {
    render(SeriesEntryCard, {
      props: {
        entry: mockEntry,
        seriesId: 'psr',
        repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
        codeData: mockCodeData,
        isSuggested: false
      }
    });
    expect(screen.getByRole('checkbox')).toBeTruthy();
  });

  it('should have a View Code toggle button', () => {
    render(SeriesEntryCard, {
      props: {
        entry: mockEntry,
        seriesId: 'psr',
        repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
        codeData: mockCodeData,
        isSuggested: false
      }
    });
    expect(screen.getByText('View Code')).toBeTruthy();
  });

  it('should link to the blog post', () => {
    const { container } = render(SeriesEntryCard, {
      props: {
        entry: mockEntry,
        seriesId: 'psr',
        repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
        codeData: mockCodeData,
        isSuggested: false
      }
    });
    const link = container.querySelector('a[href*="psr-1"]') as HTMLAnchorElement;
    expect(link).toBeTruthy();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:unit:run -- --project=client src/lib/components/series/SeriesEntryCard.svelte.test.ts`
Expected: FAIL

**Step 3: Write the component**

Create `src/lib/components/series/SeriesEntryCard.svelte`. Props: `entry: ISeriesEntry`, `seriesId: string`, `repoUrl: string`, `codeData`, `isSuggested: boolean`. Uses `toggleCompleted` and `isCompleted` from the progress store. Has a collapsible code section that renders `SeriesCodeView`. Links to `/blog/{entry.slug}` using `base` from `$app/paths`.

Follow existing card patterns from `BlogPostCard.svelte`: card container, hover effects, BEM-like naming, container queries, `prefers-reduced-motion`.

**Step 4: Run test to verify it passes**

Run: `npm run test:unit:run -- --project=client src/lib/components/series/SeriesEntryCard.svelte.test.ts`
Expected: PASS (6 tests)

**Step 5: Commit**

```bash
git add src/lib/components/series/SeriesEntryCard.svelte src/lib/components/series/SeriesEntryCard.svelte.test.ts
git commit -m "feat(series): add SeriesEntryCard component with checkbox and code toggle"
```

---

### Task 8: SeriesGroup Component

**Files:**
- Create: `src/lib/components/series/SeriesGroup.svelte`
- Test: `src/lib/components/series/SeriesGroup.svelte.test.ts`

Collapsible group showing a header (name + mini-progress) and entry cards.

**Step 1: Write the failing test**

```typescript
// src/lib/components/series/SeriesGroup.svelte.test.ts
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import SeriesGroup from './SeriesGroup.svelte';

vi.mock('$lib/stores/series-progress.svelte', () => ({
  isCompleted: vi.fn(() => false),
  toggleCompleted: vi.fn(),
  completedCount: vi.fn(() => 0)
}));

vi.mock('$lib/actions/highlight-code', () => ({
  highlightCode: () => ({ destroy() {} })
}));

const mockGroup = {
  name: 'Foundation',
  entries: [
    {
      psrNumber: 1,
      slug: 'psr-1-basic-coding-standard-in-php',
      title: 'Basic Coding Standard',
      summary: 'The foundational coding standard.',
      companionFiles: ['src/PSR1/UserManager.php'],
      testFiles: ['tests/PSR1/UserManagerTest.php'],
      prerequisites: []
    }
  ]
};

describe('SeriesGroup', () => {
  it('should render the group name', () => {
    render(SeriesGroup, {
      props: {
        group: mockGroup,
        seriesId: 'psr',
        repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
        codeDataMap: {},
        suggestedSlug: null
      }
    });
    expect(screen.getByText('Foundation')).toBeTruthy();
  });

  it('should show mini progress count', () => {
    render(SeriesGroup, {
      props: {
        group: mockGroup,
        seriesId: 'psr',
        repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
        codeDataMap: {},
        suggestedSlug: null
      }
    });
    // Shows "0/1" (0 completed of 1 in this group)
    expect(screen.getByText(/0\/1/)).toBeTruthy();
  });

  it('should render entry cards', () => {
    render(SeriesGroup, {
      props: {
        group: mockGroup,
        seriesId: 'psr',
        repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
        codeDataMap: {},
        suggestedSlug: null
      }
    });
    expect(screen.getByText(/PSR-1/)).toBeTruthy();
  });

  it('should be collapsible', async () => {
    const { container } = render(SeriesGroup, {
      props: {
        group: mockGroup,
        seriesId: 'psr',
        repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
        codeDataMap: {},
        suggestedSlug: null
      }
    });
    // Should be open by default
    const details = container.querySelector('details');
    expect(details?.hasAttribute('open')).toBe(true);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:unit:run -- --project=client src/lib/components/series/SeriesGroup.svelte.test.ts`
Expected: FAIL

**Step 3: Write the component**

Create `src/lib/components/series/SeriesGroup.svelte`. Uses `<details open>` for collapsibility. Shows group name + mini-progress in `<summary>`. Renders `SeriesEntryCard` for each entry. Passes `isSuggested` based on `suggestedSlug` prop.

**Step 4: Run test to verify it passes**

Run: `npm run test:unit:run -- --project=client src/lib/components/series/SeriesGroup.svelte.test.ts`
Expected: PASS (4 tests)

**Step 5: Commit**

```bash
git add src/lib/components/series/SeriesGroup.svelte src/lib/components/series/SeriesGroup.svelte.test.ts
git commit -m "feat(series): add SeriesGroup component with collapsible sections"
```

---

### Task 9: SeriesHeader Component

**Files:**
- Create: `src/lib/components/series/SeriesHeader.svelte`
- Test: `src/lib/components/series/SeriesHeader.svelte.test.ts`

Shows title, description, repo link, and overall progress bar.

**Step 1: Write the failing test**

```typescript
// src/lib/components/series/SeriesHeader.svelte.test.ts
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import SeriesHeader from './SeriesHeader.svelte';

vi.mock('$lib/stores/series-progress.svelte', () => ({
  completedCount: vi.fn(() => 3)
}));

describe('SeriesHeader', () => {
  it('should render the series title', () => {
    render(SeriesHeader, {
      props: {
        title: 'PHP-FIG Standards Guide',
        description: 'A practical guide.',
        repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
        seriesId: 'psr',
        totalEntries: 14
      }
    });
    expect(screen.getByText('PHP-FIG Standards Guide')).toBeTruthy();
  });

  it('should render the description', () => {
    render(SeriesHeader, {
      props: {
        title: 'PHP-FIG Standards Guide',
        description: 'A practical guide.',
        repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
        seriesId: 'psr',
        totalEntries: 14
      }
    });
    expect(screen.getByText('A practical guide.')).toBeTruthy();
  });

  it('should render a link to the companion repo', () => {
    const { container } = render(SeriesHeader, {
      props: {
        title: 'PHP-FIG Standards Guide',
        description: 'A practical guide.',
        repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
        seriesId: 'psr',
        totalEntries: 14
      }
    });
    const link = container.querySelector('a[href="https://github.com/jonesrussell/php-fig-guide"]');
    expect(link).toBeTruthy();
  });

  it('should render the progress bar', () => {
    const { container } = render(SeriesHeader, {
      props: {
        title: 'PHP-FIG Standards Guide',
        description: 'A practical guide.',
        repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
        seriesId: 'psr',
        totalEntries: 14
      }
    });
    expect(container.querySelector('[role="progressbar"]')).toBeTruthy();
  });
});
```

**Step 2–5: Implement, test, commit**

Run: `npm run test:unit:run -- --project=client src/lib/components/series/SeriesHeader.svelte.test.ts`

```bash
git add src/lib/components/series/SeriesHeader.svelte src/lib/components/series/SeriesHeader.svelte.test.ts
git commit -m "feat(series): add SeriesHeader component with progress bar and repo link"
```

---

### Task 10: FeaturedSeriesCard Component

**Files:**
- Create: `src/lib/components/series/FeaturedSeriesCard.svelte`
- Test: `src/lib/components/series/FeaturedSeriesCard.svelte.test.ts`

Card that appears on `/blog` page above the post grid. Shows series title, description, progress, and link to series page.

**Step 1: Write the failing test**

```typescript
// src/lib/components/series/FeaturedSeriesCard.svelte.test.ts
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import FeaturedSeriesCard from './FeaturedSeriesCard.svelte';

vi.mock('$lib/stores/series-progress.svelte', () => ({
  completedCount: vi.fn(() => 0)
}));

describe('FeaturedSeriesCard', () => {
  it('should render the series title', () => {
    render(FeaturedSeriesCard, {
      props: {
        title: 'PHP-FIG Standards Guide',
        description: 'A practical guide to PSR standards.',
        seriesId: 'psr',
        totalEntries: 14,
        href: '/blog/series/psr'
      }
    });
    expect(screen.getByText('PHP-FIG Standards Guide')).toBeTruthy();
  });

  it('should link to the series page', () => {
    const { container } = render(FeaturedSeriesCard, {
      props: {
        title: 'PHP-FIG Standards Guide',
        description: 'A practical guide.',
        seriesId: 'psr',
        totalEntries: 14,
        href: '/blog/series/psr'
      }
    });
    const link = container.querySelector('a[href="/blog/series/psr"]');
    expect(link).toBeTruthy();
  });

  it('should show description', () => {
    render(FeaturedSeriesCard, {
      props: {
        title: 'PHP-FIG Standards Guide',
        description: 'A practical guide.',
        seriesId: 'psr',
        totalEntries: 14,
        href: '/blog/series/psr'
      }
    });
    expect(screen.getByText('A practical guide.')).toBeTruthy();
  });
});
```

**Step 2–5: Implement, test, commit**

Follow `BlogPostCard.svelte` card styling patterns. Link wraps entire card. Show progress count only when > 0.

```bash
git add src/lib/components/series/FeaturedSeriesCard.svelte src/lib/components/series/FeaturedSeriesCard.svelte.test.ts
git commit -m "feat(series): add FeaturedSeriesCard component for /blog page"
```

---

### Task 11: Series Page Route

**Files:**
- Create: `src/routes/blog/series/psr/+page.ts`
- Create: `src/routes/blog/series/psr/+page.svelte`

**Step 1: Write the data loader**

```typescript
// src/routes/blog/series/psr/+page.ts
import { base } from '$app/paths';
import type { PageLoad } from './$types';
import { psrSeries, getAllEntries } from '$lib/data/series/psr';
import { fetchSeriesCode } from '$lib/services/series-code-service';
import { canonicalUrl } from '$lib/config/seo';
import type { ISeriesCodeFile } from '$lib/types/series';

interface CodeDataType {
  sourceFiles: ISeriesCodeFile[];
  testFiles: ISeriesCodeFile[];
}

export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
  const allEntries = getAllEntries();

  // Fetch code for all entries at build time (parallel)
  const repoSlug = psrSeries.repoUrl.replace('https://github.com/', '');
  const codeResults = await Promise.all(
    allEntries.map(entry =>
      fetchSeriesCode(fetch, repoSlug, entry.companionFiles, entry.testFiles)
    )
  );

  // Build a map of slug -> code data
  const codeDataMap: Record<string, CodeDataType> = {};
  allEntries.forEach((entry, i) => {
    codeDataMap[entry.slug] = codeResults[i];
  });

  return {
    series: psrSeries,
    codeDataMap,
    canonical: canonicalUrl(base, '/blog/series/psr')
  };
};
```

**Step 2: Write the page component**

```svelte
<!-- src/routes/blog/series/psr/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
  import SeriesHeader from '$lib/components/series/SeriesHeader.svelte';
  import SeriesGroup from '$lib/components/series/SeriesGroup.svelte';
  import { loadProgress, suggestedNext } from '$lib/stores/series-progress.svelte';
  import { getAllEntries, getTotalEntries } from '$lib/data/series/psr';
  import type { PageData } from './$types';

  const { data } = $props<{ data: PageData }>();

  // Load progress from localStorage on mount (SSR-safe)
  $effect(() => {
    loadProgress();
  });

  const allEntries = getAllEntries();
  const totalEntries = getTotalEntries();
  const suggested = $derived(suggestedNext(data.series.id, allEntries));
</script>

<svelte:head>
  <title>{data.series.title} | Russell Jones</title>
  <meta name="description" content={data.series.description} />
  <link rel="canonical" href={data.canonical} />
</svelte:head>

<div class="series-page">
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="{base}/blog">Blog</a>
    <span aria-hidden="true">/</span>
    <span>Series</span>
  </nav>

  <SeriesHeader
    title={data.series.title}
    description={data.series.description}
    repoUrl={data.series.repoUrl}
    seriesId={data.series.id}
    {totalEntries}
  />

  <div class="series-groups">
    {#each data.series.groups as group (group.name)}
      <SeriesGroup
        {group}
        seriesId={data.series.id}
        repoUrl={data.series.repoUrl}
        codeDataMap={data.codeDataMap}
        suggestedSlug={suggested?.slug ?? null}
      />
    {/each}
  </div>

  <section class="getting-started" aria-label="Getting started">
    <h2>Getting Started</h2>
    <p>Clone the companion repository to follow along with working examples:</p>
    <pre><code>git clone {data.series.repoUrl}.git
cd php-fig-guide
composer install</code></pre>
    <p>Run the tests:</p>
    <pre><code>composer test                        # Run all tests
composer test -- --filter=PSR1       # Run tests for a specific PSR
composer check-style                 # Check coding standards</code></pre>
    <p>
      <a href={data.series.repoUrl} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
      &middot;
      <a href="https://www.php-fig.org/psr/" target="_blank" rel="noopener noreferrer">
        PHP-FIG PSR Index
      </a>
    </p>
  </section>
</div>
```

Style the page following project conventions (container queries, custom properties, rem units, no px/em, CSS layers). Reference patterns from `/blog/+page.svelte`.

**Step 3: Verify the page builds**

Run: `npm run build`
Expected: Build succeeds. The route `/blog/series/psr` is prerendered.

**Step 4: Verify visually**

Run: `npm run dev` → navigate to `http://localhost:5173/blog/series/psr`
Expected: Series page renders with header, groups, entry cards, and getting started section.

**Step 5: Commit**

```bash
git add src/routes/blog/series/psr/+page.ts src/routes/blog/series/psr/+page.svelte
git commit -m "feat(series): add PSR series page route with build-time code fetching"
```

---

### Task 12: Blog Page Integration

**Files:**
- Modify: `src/routes/blog/+page.svelte`

Add the `FeaturedSeriesCard` above the post grid on the `/blog` page.

**Step 1: Import and render the card**

In `src/routes/blog/+page.svelte`, add:

```svelte
<script lang="ts">
  // Add to existing imports:
  import FeaturedSeriesCard from '$lib/components/series/FeaturedSeriesCard.svelte';
  import { psrSeries, getTotalEntries } from '$lib/data/series/psr';
  import { base } from '$app/paths';
</script>
```

In the template, add the featured card above the `posts-section`:

```svelte
<!-- Add before <section class="posts-section"> -->
<section class="series-section" aria-label="Featured series">
  <FeaturedSeriesCard
    title={psrSeries.title}
    description={psrSeries.description}
    seriesId={psrSeries.id}
    totalEntries={getTotalEntries()}
    href="{base}/blog/series/psr"
  />
</section>
```

Add CSS for `.series-section`:
```css
.series-section {
  width: 100%;
  max-width: min(var(--measure), 95cqi);
  margin-inline: auto;
  padding-inline: var(--space-4);
}
```

**Step 2: Verify visually**

Run: `npm run dev` → navigate to `http://localhost:5173/blog`
Expected: Featured series card appears above the post grid.

**Step 3: Run existing blog tests to check nothing broke**

Run: `npm run test:unit:run -- src/lib/components/blog/`
Expected: All existing tests PASS.

**Step 4: Commit**

```bash
git add src/routes/blog/+page.svelte
git commit -m "feat(series): add featured PSR series card to blog page"
```

---

### Task 13: E2E Test

**Files:**
- Create: `tests/series.spec.ts`

**Step 1: Write the E2E test**

```typescript
// tests/series.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Blog Series - PSR', () => {
  test('should navigate to series page from blog', async ({ page }) => {
    await page.goto('/blog');
    const seriesCard = page.locator('text=PHP-FIG Standards Guide');
    await expect(seriesCard).toBeVisible();
    await seriesCard.click();
    await expect(page).toHaveURL(/\/blog\/series\/psr/);
  });

  test('should render all 5 groups', async ({ page }) => {
    await page.goto('/blog/series/psr');
    await expect(page.locator('text=Foundation')).toBeVisible();
    await expect(page.locator('text=Core Infrastructure')).toBeVisible();
    await expect(page.locator('text=HTTP Stack')).toBeVisible();
    await expect(page.locator('text=Data & Caching')).toBeVisible();
    await expect(page.locator('text=Specialized')).toBeVisible();
  });

  test('should render PSR entry cards', async ({ page }) => {
    await page.goto('/blog/series/psr');
    await expect(page.locator('text=PSR-1')).toBeVisible();
    await expect(page.locator('text=Basic Coding Standard')).toBeVisible();
  });

  test('should toggle completion checkbox and persist', async ({ page }) => {
    await page.goto('/blog/series/psr');

    // Find and click the first checkbox
    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // Reload and verify persistence
    await page.reload();
    const checkboxAfterReload = page.locator('input[type="checkbox"]').first();
    await expect(checkboxAfterReload).toBeChecked();
  });

  test('should show progress bar', async ({ page }) => {
    await page.goto('/blog/series/psr');
    const progressBar = page.locator('[role="progressbar"]');
    await expect(progressBar).toBeVisible();
  });

  test('should expand View Code section', async ({ page }) => {
    await page.goto('/blog/series/psr');
    const viewCodeButton = page.locator('text=View Code').first();
    await viewCodeButton.click();

    // Should show code content (PHP files loaded at build time)
    await expect(page.locator('pre code').first()).toBeVisible();
  });

  test('should have getting started section', async ({ page }) => {
    await page.goto('/blog/series/psr');
    await expect(page.locator('text=Getting Started')).toBeVisible();
    await expect(page.locator('text=composer install')).toBeVisible();
  });
});
```

**Step 2: Run E2E tests**

Run: `npm run test:e2e -- tests/series.spec.ts`
Expected: All tests PASS.

**Step 3: Commit**

```bash
git add tests/series.spec.ts
git commit -m "test(series): add E2E tests for PSR series page"
```

---

### Task 14: Slug Verification & Final Validation

**Important:** The slugs in `src/lib/data/series/psr.ts` must match what `generateSlug()` produces from the blog post titles in the RSS feed. If they don't match, posts won't link correctly.

**Step 1: Verify slugs match**

Write a quick verification script or test:

```typescript
// Add to src/lib/data/series/psr.test.ts
import { generateSlug } from '$lib/services/blog-service';

it('slugs should match generateSlug output from post titles', () => {
  const titleToSlugMap: Record<string, string> = {
    'PSR-1: Basic Coding Standard in PHP': 'psr-1-basic-coding-standard-in-php',
    'PSR-12: Extended Coding Style Guide in PHP': 'psr-12-extended-coding-style-guide-in-php',
    'PSR-4: Autoloading Standard in PHP': 'psr-4-autoloading-standard-in-php',
    'PSR-3: Logger Interface in PHP': 'psr-3-logger-interface-in-php',
    'PSR-11: Container Interface in PHP': 'psr-11-container-interface-in-php',
    'PSR-14: Event Dispatcher in PHP': 'psr-14-event-dispatcher-in-php',
    'PSR-7: HTTP Message Interfaces in PHP': 'psr-7-http-message-interfaces-in-php',
    'PSR-17: HTTP Factories in PHP': 'psr-17-http-factories-in-php',
    'PSR-15: HTTP Handlers and Middleware in PHP': 'psr-15-http-handlers-and-middleware-in-php',
    'PSR-18: HTTP Client in PHP': 'psr-18-http-client-in-php',
    'PSR-6: Caching Interface in PHP': 'psr-6-caching-interface-in-php',
    'PSR-16: Simple Cache in PHP': 'psr-16-simple-cache-in-php',
    'PSR-13: Hypermedia Links in PHP': 'psr-13-hypermedia-links-in-php',
    'PSR-20: Clock in PHP': 'psr-20-clock-in-php'
  };

  for (const [title, expectedSlug] of Object.entries(titleToSlugMap)) {
    expect(generateSlug(title)).toBe(expectedSlug);
  }
});
```

**Important:** The actual titles come from the Hugo blog posts' `title:` frontmatter field and may not exactly match the patterns above. Read each post's frontmatter to get the exact titles, then verify the slugs. If there's a mismatch, update the slugs in `psr.ts`.

**Step 2: Run full validation**

Run: `npm run validate`
Expected: Types, lint, and all tests pass.

**Step 3: Run build**

Run: `npm run build`
Expected: Build succeeds. All routes prerender including `/blog/series/psr`.

**Step 4: Commit any slug fixes**

```bash
git add -A
git commit -m "fix(series): correct slugs to match blog service generateSlug output"
```

---

## Task Dependency Graph

```
Task 1 (Types)
  └→ Task 2 (PSR Data)
  └→ Task 3 (Progress Store)
  └→ Task 4 (Code Service)

Task 2 + 3 + 4
  └→ Task 5 (ProgressBar)
  └→ Task 6 (CodeView)

Task 5 + 6
  └→ Task 7 (EntryCard)

Task 7
  └→ Task 8 (Group)

Task 5 + 8
  └→ Task 9 (Header)

Task 2
  └→ Task 10 (FeaturedCard)

Task 8 + 9 + 10
  └→ Task 11 (Page Route)

Task 10 + 11
  └→ Task 12 (Blog Integration)

Task 11 + 12
  └→ Task 13 (E2E Test)
  └→ Task 14 (Slug Verification)
```

Tasks 1–4 can be parallelized. Tasks 5–6 can be parallelized. Tasks 9–10 can be parallelized.
