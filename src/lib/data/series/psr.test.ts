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
});
