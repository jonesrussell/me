import { describe, it, expect } from 'vitest';
import { psrSeries } from './psr';
import { generateSlug } from '$lib/services/blog-service';

describe('PSR series data', () => {
	it('should have the correct id and metadata', () => {
		expect(psrSeries.id).toBe('psr');
		expect(psrSeries.title).toBe('PHP-FIG Standards Guide');
		expect(psrSeries.repoUrl).toBe('https://github.com/jonesrussell/php-fig-guide');
	});

	it('should have 5 groups', () => {
		expect(psrSeries.groups).toHaveLength(5);
		const names = psrSeries.groups.map((g) => g.name);
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
		const allEntries = psrSeries.groups.flatMap((g) => g.entries);
		const slugs = allEntries.map((e) => e.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});

	it('should have no duplicate PSR numbers', () => {
		const allEntries = psrSeries.groups.flatMap((g) => g.entries);
		const numbers = allEntries.map((e) => e.psrNumber);
		expect(new Set(numbers).size).toBe(numbers.length);
	});

	it('should only reference valid PSR numbers in prerequisites', () => {
		const allEntries = psrSeries.groups.flatMap((g) => g.entries);
		const validNumbers = new Set(allEntries.map((e) => e.psrNumber));
		for (const entry of allEntries) {
			for (const prereq of entry.prerequisites) {
				expect(validNumbers.has(prereq)).toBe(true);
			}
		}
	});

	it('should have companion files for every entry', () => {
		const allEntries = psrSeries.groups.flatMap((g) => g.entries);
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

	it('slugs should match generateSlug output from actual post titles', () => {
		const allEntries = psrSeries.groups.flatMap((g) => g.entries);

		// Actual titles from Hugo blog post frontmatter in /home/fsd42/dev/blog/content/posts/
		const titleMap: Record<number, string> = {
			1: 'PSR-1: Basic Coding Standard in PHP',
			3: 'PSR-3: Logger Interface in PHP',
			4: 'PSR-4: Autoloading Standard in PHP',
			6: 'PSR-6: Caching Interface in PHP',
			7: 'PSR-7: HTTP Message Interfaces in PHP',
			11: 'PSR-11: Container Interface in PHP',
			12: 'PSR-12: Extended Coding Style Guide in PHP',
			13: 'PSR-13: Hypermedia Links in PHP',
			14: 'PSR-14: Event Dispatcher in PHP',
			15: 'PSR-15: HTTP Handlers and Middleware in PHP',
			16: 'PSR-16: Simple Cache in PHP',
			17: 'PSR-17: HTTP Factories in PHP',
			18: 'PSR-18: HTTP Client in PHP',
			20: 'PSR-20: Clock Interface in PHP'
		};

		for (const entry of allEntries) {
			const actualTitle = titleMap[entry.psrNumber];
			expect(actualTitle).toBeDefined();
			if (actualTitle) {
				const expectedSlug = generateSlug(actualTitle);
				expect(entry.slug).toBe(expectedSlug);
			}
		}
	});
});
