import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
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

	it('should be collapsible via details element', () => {
		const { container } = render(SeriesGroup, {
			props: {
				group: mockGroup,
				seriesId: 'psr',
				repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
				codeDataMap: {},
				suggestedSlug: null
			}
		});
		const details = container.querySelector('details');
		expect(details).toBeTruthy();
		expect(details?.hasAttribute('open')).toBe(true);
	});
});
