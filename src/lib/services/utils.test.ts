import { describe, it, expect } from 'vitest';
import { formatDate } from './utils';

describe('Date Formatting', () => {
	describe('formatDate', () => {
		it('should format valid dates correctly', () => {
			expect(formatDate('2024-03-14')).toBe('March 14, 2024');
			expect(formatDate('2023-12-25')).toBe('December 25, 2023');
		});

		it('should handle different date formats', () => {
			expect(formatDate('2024/03/14')).toBe('March 14, 2024');
			expect(formatDate('2024.03.14')).toBe('March 14, 2024');
		});

		it('should return original string for invalid dates', () => {
			expect(formatDate('invalid-date')).toBe('invalid-date');
			expect(formatDate('')).toBe('');
			expect(formatDate('2024-13-45')).toBe('2024-13-45');
			expect(formatDate('not-a-date')).toBe('not-a-date');
		});

		it('should handle edge cases', () => {
			expect(formatDate(null)).toBe(null);
			expect(formatDate(undefined)).toBe(undefined);
		});

		it('should handle dates with time components', () => {
			expect(formatDate('2024-03-14T12:00:00Z')).toBe('March 14, 2024');
			expect(formatDate('2024-03-14T00:00:00.000Z')).toBe('March 14, 2024');
		});

		it('should handle dates with timezone offsets', () => {
			expect(formatDate('2024-03-14T00:00:00+00:00')).toBe('March 14, 2024');
			expect(formatDate('2024-03-14T00:00:00-05:00')).toBe('March 14, 2024');
		});
	});
});
