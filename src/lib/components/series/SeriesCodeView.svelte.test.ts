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
	{
		path: 'tests/PSR1/UserManagerTest.php',
		content: '<?php\nclass UserManagerTest {}',
		language: 'php'
	}
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
