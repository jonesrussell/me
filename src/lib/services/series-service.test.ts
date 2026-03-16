import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchSeriesIndex, fetchSeries } from './series-service';

const mockSeriesIndex = {
	series: [
		{
			id: 'php-fig-standards',
			title: 'PHP-FIG Standards Guide',
			description: 'A guide to PSRs',
			postCount: 15,
			repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
			groups: [
				{
					name: 'Foundation',
					entries: [
						{
							title: 'PSR-1: Basic Coding Standard',
							slug: 'psr-1-basic-coding-standard',
							permalink: 'https://jonesrussell.github.io/blog/psr-1-basic-coding-standard/',
							date: '2025-01-15',
							summary: 'Fundamental coding standards.',
							seriesOrder: 1,
							companionFiles: ['src/PSR1/UserManager.php'],
							testFiles: ['tests/PSR1/UserManagerTest.php']
						}
					]
				}
			]
		},
		{
			id: 'docker-fundamentals',
			title: 'Docker Fundamentals',
			description: 'Docker guide',
			postCount: 5,
			groups: [{ name: 'Main', entries: [] }]
		}
	]
};

describe('series-service', () => {
	const mockFetch = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('fetchSeriesIndex', () => {
		it('fetches and returns series index', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockSeriesIndex)
			});

			const result = await fetchSeriesIndex(mockFetch);
			expect(result.series).toHaveLength(2);
			expect(result.series[0].id).toBe('php-fig-standards');
		});

		it('throws on fetch failure', async () => {
			mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });
			await expect(fetchSeriesIndex(mockFetch)).rejects.toThrow('HTTP error');
		});

		it('throws on malformed JSON', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve({ invalid: true })
			});
			await expect(fetchSeriesIndex(mockFetch)).rejects.toThrow('Invalid series data');
		});
	});

	describe('fetchSeries', () => {
		it('returns a single series by id', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockSeriesIndex)
			});

			const result = await fetchSeries(mockFetch, 'php-fig-standards');
			expect(result).not.toBeNull();
			expect(result!.title).toBe('PHP-FIG Standards Guide');
			expect(result!.repoUrl).toBe('https://github.com/jonesrussell/php-fig-guide');
		});

		it('returns null for unknown series', async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockSeriesIndex)
			});

			const result = await fetchSeries(mockFetch, 'nonexistent');
			expect(result).toBeNull();
		});
	});
});
