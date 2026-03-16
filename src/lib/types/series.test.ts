import { describe, it, expect } from 'vitest';
import type { Series, SeriesEntry, SeriesGroup, SeriesCodeFile } from './series';

describe('Series types', () => {
	it('should allow constructing a valid SeriesEntry', () => {
		const entry: SeriesEntry = {
			slug: 'psr-1-basic-coding-standard',
			title: 'Basic Coding Standard',
			permalink: '/psr-1-basic-coding-standard/',
			date: '2025-01-01',
			summary: 'The foundational coding standard for PHP.',
			seriesOrder: 1,
			companionFiles: ['src/PSR1/UserManager.php'],
			testFiles: ['tests/PSR1/UserManagerTest.php'],
			prerequisites: []
		};
		expect(entry.seriesOrder).toBe(1);
		expect(entry.slug).toBe('psr-1-basic-coding-standard');
	});

	it('should allow constructing a valid SeriesGroup', () => {
		const group: SeriesGroup = {
			name: 'Foundation',
			entries: []
		};
		expect(group.name).toBe('Foundation');
	});

	it('should allow constructing a valid SeriesCodeFile', () => {
		const file: SeriesCodeFile = {
			path: 'src/PSR1/UserManager.php',
			content: '<?php // code',
			language: 'php'
		};
		expect(file.language).toBe('php');
	});

	it('should allow constructing a valid Series', () => {
		const series: Series = {
			id: 'psr',
			title: 'PHP-FIG Standards',
			description: 'A guide to PSR standards.',
			postCount: 14,
			repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
			groups: []
		};
		expect(series.id).toBe('psr');
	});

	it('should allow constructing a Series without repoUrl', () => {
		const series: Series = {
			id: 'golang',
			title: 'Go Programming',
			description: 'A guide to Go.',
			postCount: 5,
			groups: []
		};
		expect(series.repoUrl).toBeUndefined();
	});
});
