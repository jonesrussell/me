import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import SeriesHeader from './SeriesHeader.svelte';

vi.mock('$lib/stores/series-progress.svelte', () => ({
	completedCount: vi.fn(() => 3)
}));

describe('SeriesHeader', () => {
	it('should render the series title', () => {
		render(SeriesHeader, {
			props: {
				title: 'PHP-FIG Standards Guide',
				description: 'A practical guide.',
				repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
				seriesId: 'psr',
				totalEntries: 14
			}
		});
		expect(screen.getByText('PHP-FIG Standards Guide')).toBeTruthy();
	});

	it('should render the description', () => {
		render(SeriesHeader, {
			props: {
				title: 'PHP-FIG Standards Guide',
				description: 'A practical guide.',
				repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
				seriesId: 'psr',
				totalEntries: 14
			}
		});
		expect(screen.getByText('A practical guide.')).toBeTruthy();
	});

	it('should render a link to the companion repo', () => {
		const { container } = render(SeriesHeader, {
			props: {
				title: 'PHP-FIG Standards Guide',
				description: 'A practical guide.',
				repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
				seriesId: 'psr',
				totalEntries: 14
			}
		});
		const link = container.querySelector(
			'a[href="https://github.com/jonesrussell/php-fig-guide"]'
		);
		expect(link).toBeTruthy();
	});

	it('should render the progress bar', () => {
		const { container } = render(SeriesHeader, {
			props: {
				title: 'PHP-FIG Standards Guide',
				description: 'A practical guide.',
				repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
				seriesId: 'psr',
				totalEntries: 14
			}
		});
		expect(container.querySelector('[role="progressbar"]')).toBeTruthy();
	});
});
