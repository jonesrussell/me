import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import SeriesEntryCard from './SeriesEntryCard.svelte';

// Mock progress store
vi.mock('$lib/stores/series-progress.svelte', () => ({
	isCompleted: vi.fn(() => false),
	toggleCompleted: vi.fn()
}));

// Mock highlight-code action
vi.mock('$lib/actions/highlight-code', () => ({
	highlightCode: () => ({ destroy() {} })
}));

const mockEntry = {
	slug: 'psr-1-basic-coding-standard-in-php',
	title: 'PSR-1: Basic Coding Standard',
	permalink: '/psr-1-basic-coding-standard-in-php/',
	date: '2025-01-01',
	summary: 'The foundational coding standard for PHP.',
	seriesOrder: 1,
	companionFiles: ['src/PSR1/UserManager.php'],
	testFiles: ['tests/PSR1/UserManagerTest.php']
};

const mockCodeData = {
	sourceFiles: [{ path: 'src/PSR1/UserManager.php', content: '<?php', language: 'php' }],
	testFiles: [{ path: 'tests/PSR1/UserManagerTest.php', content: '<?php', language: 'php' }]
};

describe('SeriesEntryCard', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should render PSR number and title', () => {
		render(SeriesEntryCard, {
			props: {
				entry: mockEntry,
				seriesId: 'psr',
				repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
				codeData: mockCodeData,
				isSuggested: false
			}
		});
		expect(screen.getByText(/PSR-1/)).toBeTruthy();
		expect(screen.getByText(/Basic Coding Standard/)).toBeTruthy();
	});

	it('should render summary text', () => {
		render(SeriesEntryCard, {
			props: {
				entry: mockEntry,
				seriesId: 'psr',
				repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
				codeData: mockCodeData,
				isSuggested: false
			}
		});
		expect(screen.getByText('The foundational coding standard for PHP.')).toBeTruthy();
	});

	it('should show suggested indicator when isSuggested is true', () => {
		const { container } = render(SeriesEntryCard, {
			props: {
				entry: mockEntry,
				seriesId: 'psr',
				repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
				codeData: mockCodeData,
				isSuggested: true
			}
		});
		expect(container.querySelector('.suggested')).toBeTruthy();
	});

	it('should have a checkbox for completion', () => {
		render(SeriesEntryCard, {
			props: {
				entry: mockEntry,
				seriesId: 'psr',
				repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
				codeData: mockCodeData,
				isSuggested: false
			}
		});
		expect(screen.getByRole('checkbox')).toBeTruthy();
	});

	it('should have a View Code toggle button', () => {
		render(SeriesEntryCard, {
			props: {
				entry: mockEntry,
				seriesId: 'psr',
				repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
				codeData: mockCodeData,
				isSuggested: false
			}
		});
		expect(screen.getByText('View Code')).toBeTruthy();
	});

	it('should link to the blog post', () => {
		const { container } = render(SeriesEntryCard, {
			props: {
				entry: mockEntry,
				seriesId: 'psr',
				repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
				codeData: mockCodeData,
				isSuggested: false
			}
		});
		const link = container.querySelector('a[href*="psr-1"]') as HTMLAnchorElement;
		expect(link).toBeTruthy();
	});
});
