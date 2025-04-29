import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatPostDate, generateSlug, fetchFeed, fetchPost, blogStore } from './blog-service';
import { get } from 'svelte/store';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Sample XML response
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

describe('Blog Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset store
    blogStore.set({ posts: [], loading: false, error: null });
    // Clear console.error and console.log
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
    // Reset fetch mock default behavior
    mockFetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(sampleXml),
        headers: new Headers({
          'etag': '"123"',
          'last-modified': 'Wed, 14 Mar 2024 12:00:00 GMT'
        })
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('formatPostDate', () => {
    it('should format dates correctly', () => {
      expect(formatPostDate('2024-03-14')).toBe('March 14, 2024');
    });

    it('should handle invalid dates', () => {
      expect(formatPostDate('invalid-date')).toBe('invalid-date');
    });
  });

  describe('generateSlug', () => {
    it('should generate valid slugs from titles', () => {
      expect(generateSlug('Hello World!')).toBe('hello-world');
      expect(generateSlug('Test: Article 123')).toBe('test-article-123');
      expect(generateSlug('Multiple   Spaces')).toBe('multiple-spaces');
    });

    it('should handle special characters', () => {
      expect(generateSlug('Hello & World')).toBe('hello-world');
      expect(generateSlug('Title with (parentheses)')).toBe('title-with-parentheses');
    });

    it('should handle edge cases', () => {
      expect(generateSlug('')).toBe('');
      expect(generateSlug('   ')).toBe('');
      expect(generateSlug('!!!!')).toBe('');
    });
  });

  describe('fetchFeed', () => {
    it('should fetch and parse feed successfully', async () => {
      const result = await fetchFeed();

      expect(result.items).toHaveLength(2);
      expect(result.items[0]).toMatchObject({
        title: 'Test Post 1',
        link: 'https://example.com/post-1',
        content: 'Test content 1',
        published: '2024-03-14T12:00:00Z',
        categories: ['test', 'blog'],
        slug: 'test-post-1'
      });
    });

    it('should handle pagination correctly', async () => {
      const page1 = await fetchFeed({ page: 1, pageSize: 1 });
      expect(page1.items).toHaveLength(1);
      expect(page1.hasMore).toBe(true);

      const page2 = await fetchFeed({ page: 2, pageSize: 1 });
      expect(page2.items).toHaveLength(1);
      expect(page2.hasMore).toBe(false);
    });

    it('should update blogStore correctly', async () => {
      let storeState = get(blogStore);
      expect(storeState.loading).toBe(false);

      const fetchPromise = fetchFeed();
      storeState = get(blogStore);
      expect(storeState.loading).toBe(true);

      await fetchPromise;
      storeState = get(blogStore);
      expect(storeState.loading).toBe(false);
      expect(storeState.posts).toHaveLength(2);
      expect(storeState.error).toBeNull();
    });

    it('should handle fetch errors', async () => {
      // Reset all mocks and setup error case
      vi.resetAllMocks();
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const promise = fetchFeed();
      await expect(promise).rejects.toThrow('Network error');

      const storeState = get(blogStore);
      expect(storeState.error).toMatchObject({
        type: 'FETCH_ERROR'
      });
    });

    it('should use cache when available', async () => {
      // Clear any existing cache and mocks
      vi.resetAllMocks();

      // Setup successful fetch mock
      mockFetch.mockImplementation(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve(sampleXml),
          headers: new Headers({
            'etag': '"123"',
            'last-modified': 'Wed, 14 Mar 2024 12:00:00 GMT'
          })
        })
      );

      // First call should hit the network
      await fetchFeed();
      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Second call should use cache
      await fetchFeed();
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchPost', () => {
    it('should fetch a single post by slug', async () => {
      const post = await fetchPost('test-post-1');
      expect(post).toMatchObject({
        title: 'Test Post 1',
        slug: 'test-post-1'
      });
    });

    it('should throw error for non-existent post', async () => {
      await expect(fetchPost('non-existent')).rejects.toThrow('Failed to fetch blog post');
    });
  });
});
