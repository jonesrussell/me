import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatPostDate, generateSlug, fetchFeed, fetchPost, blogStore, resetFeedCache } from './blog-service';
import { get } from 'svelte/store';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Enable timers
vi.useFakeTimers();

// Centralized mock data
const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry>
    <title>Test Post 1</title>
    <link href="https://example.com/post-1" rel="alternate"/>
    <content>Test content 1</content>
    <published>2024-03-14T12:00:00Z</published>
    <category term="test"/>
    <category term="blog"/>
  </entry>
  <entry>
    <title>Test Post 2</title>
    <link href="https://example.com/post-2" rel="alternate"/>
    <content>Test content 2</content>
    <published>2024-03-13T12:00:00Z</published>
    <category term="blog"/>
  </entry>
</feed>`;

const malformedXml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry>
    <title>Test Post 1</title>
    <link href="https://example.com/post-1" rel="alternate"/>
    <content>Test content 1</content>
    <published>2024-03-14T12:00:00Z</published>
    <category term="test"/>
    <category term="blog"/>
  </entry>
  <entry>
    <title>Test Post 2</title>
    <link href="https://example.com/post-2" rel="alternate"/>
    <content>Test content 2</content>
    <published>2024-03-13T12:00:00Z</published>
    <category term="blog"/>
  </entry>
</feed>`;

describe('Utilities', () => {
  describe('formatPostDate', () => {
    it('should format dates correctly', () => {
      expect(formatPostDate('2024-03-14')).toBe('March 14, 2024');
    });

    it('should handle invalid dates gracefully', () => {
      expect(formatPostDate('invalid-date')).toBe('invalid-date');
    });

    it('should handle empty strings', () => {
      expect(formatPostDate('')).toBe('');
    });
  });

  describe('generateSlug', () => {
    it('should convert titles to valid slugs', () => {
      expect(generateSlug('Hello World')).toBe('hello-world');
      expect(generateSlug('Test: Article 123')).toBe('test-article-123');
      expect(generateSlug('Multiple   Spaces')).toBe('multiple-spaces');
    });

    it('should handle special characters', () => {
      expect(generateSlug('Hello & World')).toBe('hello-world');
      expect(generateSlug('Title with (parentheses)')).toBe('title-with-parentheses');
      expect(generateSlug('Special @Chars!')).toBe('special-chars');
    });

    it('should handle edge cases', () => {
      expect(generateSlug('')).toBe('');
      expect(generateSlug('   ')).toBe('');
      expect(generateSlug('!!!!')).toBe('');
    });
  });
});

describe('API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    blogStore.set({ posts: [], loading: false, error: null });
    resetFeedCache(); // Reset cache before each test
    mockFetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(sampleXml),
        headers: new Headers(),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    resetFeedCache(); // Reset cache after each test
  });

  describe('fetchFeed', () => {
    it('should fetch and parse the feed successfully', async () => {
      const result = await fetchFeed();

      expect(result.items).toHaveLength(2);
      expect(result.items[0]).toMatchObject({
        title: 'Test Post 1',
        link: 'https://example.com/post-1',
        content: 'Test content 1',
        published: '2024-03-14T12:00:00Z',
        categories: ['test', 'blog'],
        slug: 'test-post-1',
      });
    });

    it('should handle pagination correctly', async () => {
      const page1 = await fetchFeed({ page: 1, pageSize: 1 });
      expect(page1.items).toHaveLength(1);
      expect(page1.hasMore).toBe(true);
      expect(page1.items[0].title).toBe('Test Post 1');

      const page2 = await fetchFeed({ page: 2, pageSize: 1 });
      expect(page2.items).toHaveLength(1);
      expect(page2.hasMore).toBe(false);
      expect(page2.items[0].title).toBe('Test Post 2');
    });

    it('should handle HTTP errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchFeed()).rejects.toThrow('Network error');
      expect(get(blogStore).error).toMatchObject({
        type: 'FETCH_ERROR',
        message: 'Network error',
      });
    });

    it('should handle malformed XML', async () => {
      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve(malformedXml),
          headers: new Headers(),
        })
      );

      const result = await fetchFeed();
      expect(result.items).toHaveLength(2);
    });

    it('should use cache when available', async () => {
      // First fetch to populate cache
      await fetchFeed();
      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Second fetch should use cache
      await fetchFeed();
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should handle cache expiration', async () => {
      // First fetch to populate cache
      await fetchFeed();
      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Simulate cache expiration
      vi.advanceTimersByTime(1000 * 60 * 31); // 31 minutes

      // Second fetch should hit the network again
      await fetchFeed();
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('fetchPost', () => {
    it('should fetch a post by slug', async () => {
      const post = await fetchPost('test-post-1');
      expect(post).toMatchObject({
        title: 'Test Post 1',
        slug: 'test-post-1',
      });
    });

    it('should throw error for non-existent post', async () => {
      await expect(fetchPost('non-existent')).rejects.toThrow('Post not found');
    });

    it('should handle network errors when fetching post', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));
      await expect(fetchPost('test-post-1')).rejects.toThrow('Network error');
    });
  });
});

describe('Stores', () => {
  beforeEach(() => {
    blogStore.set({ posts: [], loading: false, error: null });
    mockFetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(sampleXml),
        headers: new Headers(),
      })
    );
  });

  it('should update blogStore state during feed fetch', async () => {
    // Initial state
    expect(get(blogStore).loading).toBe(false);
    expect(get(blogStore).posts).toHaveLength(0);

    // Start fetch
    const fetchPromise = fetchFeed();

    // Check loading state immediately
    expect(get(blogStore).loading).toBe(true);
    expect(get(blogStore).posts).toHaveLength(0);

    // Wait for fetch to complete
    await fetchPromise;

    // Check final state
    expect(get(blogStore).loading).toBe(false);
    expect(get(blogStore).posts).toHaveLength(2);
    expect(get(blogStore).error).toBeNull();
  });
});
