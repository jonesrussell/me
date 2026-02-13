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
