import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import FeaturedSeriesCard from './FeaturedSeriesCard.svelte';

vi.mock('$lib/stores/series-progress.svelte', () => ({
	completedCount: vi.fn(() => 0)
}));

describe('FeaturedSeriesCard', () => {
	it('should render the series title', () => {
		render(FeaturedSeriesCard, {
			props: {
				title: 'PHP-FIG Standards Guide',
				description: 'A practical guide to PSR standards.',
				seriesId: 'psr',
				totalEntries: 14,
				href: '/blog/series/psr'
			}
		});
		expect(screen.getByText('PHP-FIG Standards Guide')).toBeTruthy();
	});

	it('should link to the series page', () => {
		const { container } = render(FeaturedSeriesCard, {
			props: {
				title: 'PHP-FIG Standards Guide',
				description: 'A practical guide.',
				seriesId: 'psr',
				totalEntries: 14,
				href: '/blog/series/psr'
			}
		});
		const link = container.querySelector('a[href="/blog/series/psr"]');
		expect(link).toBeTruthy();
	});

	it('should show description', () => {
		render(FeaturedSeriesCard, {
			props: {
				title: 'PHP-FIG Standards Guide',
				description: 'A practical guide.',
				seriesId: 'psr',
				totalEntries: 14,
				href: '/blog/series/psr'
			}
		});
		expect(screen.getByText('A practical guide.')).toBeTruthy();
	});
});
