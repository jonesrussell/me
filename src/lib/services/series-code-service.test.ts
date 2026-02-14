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
