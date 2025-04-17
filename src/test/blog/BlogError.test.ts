import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import BlogError from '$lib/components/blog/BlogError.svelte';
import { blogErrors } from '$lib/services/blog-service';
import type { BlogError as BlogErrorType } from '$lib/services/blog-service';

const mockErrors: BlogErrorType[] = [
	{
		type: 'FETCH_ERROR',
		message: 'Failed to fetch blog feed',
		details: { status: 404, url: 'https://example.com/feed.xml' },
		timestamp: Date.now()
	},
	{
		type: 'PARSE_ERROR',
		message: 'Invalid XML format',
		details: { text: '<invalid>xml</invalid>' },
		timestamp: Date.now() - 1000
	},
	{
		type: 'VALIDATION_ERROR',
		message: 'Missing required fields',
		details: { entry: '<entry><title>Test</title></entry>' },
		timestamp: Date.now() - 2000
	},
	{
		type: 'CACHE_ERROR',
		message: 'Cache invalidation failed',
		details: { reason: 'Too many errors' },
		timestamp: Date.now() - 3000
	}
];

describe('BlogError', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		blogErrors.set(mockErrors);
	});

	afterEach(() => {
		vi.useRealTimers();
		blogErrors.set([]);
	});

	it('renders all errors in the list', () => {
		const { getAllByRole } = render(BlogError);
		const errorElements = getAllByRole('alert');
		expect(errorElements).toHaveLength(mockErrors.length);
	});

	it('formats error types correctly', () => {
		const { getAllByRole } = render(BlogError);
		const typeElements = getAllByRole('alert').map(el => el.querySelector('.type'));

		expect(typeElements[0]?.textContent).toBe('Network Error');
		expect(typeElements[1]?.textContent).toBe('Data Error');
		expect(typeElements[2]?.textContent).toBe('Validation Error');
		expect(typeElements[3]?.textContent).toBe('Cache Error');
	});

	it('displays error messages', () => {
		const { getAllByRole } = render(BlogError);
		const messageElements = getAllByRole('alert').map(el => el.querySelector('.message'));

		mockErrors.forEach((error, index) => {
			expect(messageElements[index]?.textContent).toBe(error.message);
		});
	});

	it('displays error details when available', () => {
		const { getAllByRole } = render(BlogError);
		const detailElements = getAllByRole('alert').map(el => el.querySelector('.details'));

		mockErrors.forEach((error, index) => {
			if (error.details) {
				const expectedDetails = JSON.stringify(error.details, null, 2);
				const actualDetails = detailElements[index]?.textContent?.trim();
				expect(actualDetails).toBe(expectedDetails);
			}
		});
	});

	it('formats timestamps correctly', () => {
		const { getAllByRole } = render(BlogError);
		const timestampElements = getAllByRole('alert').map(el => el.querySelector('.timestamp'));

		mockErrors.forEach((error, index) => {
			const expectedDate = new Date(error.timestamp).toLocaleString();
			expect(timestampElements[index]?.textContent).toBe(expectedDate);
		});
	});

	it('handles empty error list', () => {
		blogErrors.set([]);
		const { queryAllByRole } = render(BlogError);
		const errorElements = queryAllByRole('alert');
		expect(errorElements).toHaveLength(0);
	});

	it('is accessible', () => {
		const { getAllByRole } = render(BlogError);
		const errors = getAllByRole('alert');

		errors.forEach(error => {
			expect(error.getAttribute('role')).toBe('alert');
			expect(error.querySelector('.type')).toBeInTheDocument();
			expect(error.querySelector('.timestamp')).toBeInTheDocument();
			expect(error.querySelector('.message')).toBeInTheDocument();
		});
	});
});
