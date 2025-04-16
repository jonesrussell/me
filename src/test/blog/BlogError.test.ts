import { describe, it, expect, beforeEach, afterEach } from 'vitest';
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
		blogErrors.set(mockErrors);
	});

	afterEach(() => {
		blogErrors.set([]);
	});

	it('renders all errors in the list', () => {
		const { container } = render(BlogError);
		const errorElements = container.querySelectorAll('.error');
		expect(errorElements).toHaveLength(mockErrors.length);
	});

	it('formats error types correctly', () => {
		const { container } = render(BlogError);
		const typeElements = container.querySelectorAll('.type');

		expect(typeElements[0]).toHaveTextContent('Network Error');
		expect(typeElements[1]).toHaveTextContent('Data Error');
		expect(typeElements[2]).toHaveTextContent('Validation Error');
		expect(typeElements[3]).toHaveTextContent('Cache Error');
	});

	it('displays error messages', () => {
		const { container } = render(BlogError);
		const messageElements = container.querySelectorAll('.message');

		mockErrors.forEach((error, index) => {
			expect(messageElements[index]).toHaveTextContent(error.message);
		});
	});

	it('displays error details when available', () => {
		const { container } = render(BlogError);
		const detailElements = container.querySelectorAll('.details');

		expect(detailElements).toHaveLength(mockErrors.length);
		mockErrors.forEach((error, index) => {
			if (error.details) {
				const expectedDetails = JSON.stringify(error.details, null, 2);
				const actualDetails = detailElements[index].textContent?.trim();
				expect(actualDetails).toBe(expectedDetails);
			}
		});
	});

	it('formats timestamps correctly', () => {
		const { container } = render(BlogError);
		const timestampElements = container.querySelectorAll('.timestamp');

		mockErrors.forEach((error, index) => {
			const expectedDate = new Date(error.timestamp).toLocaleString();
			expect(timestampElements[index]).toHaveTextContent(expectedDate);
		});
	});

	it('handles empty error list', () => {
		blogErrors.set([]);
		const { container } = render(BlogError);
		const errorElements = container.querySelectorAll('.error');
		expect(errorElements).toHaveLength(0);
	});

	it('is accessible', () => {
		const { container } = render(BlogError);

		// Check semantic structure
		const errors = container.querySelectorAll('.error');
		errors.forEach(error => {
			expect(error.classList.contains('error')).toBe(true);
			expect(error.querySelector('.header')).toBeInTheDocument();
			expect(error.querySelector('.type')).toBeInTheDocument();
			expect(error.querySelector('.timestamp')).toBeInTheDocument();
			expect(error.querySelector('.message')).toBeInTheDocument();
		});
	});
});
