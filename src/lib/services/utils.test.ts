import { describe, it, expect } from 'vitest';
import { sanitizeText, formatDate } from './utils';

describe('Text Sanitization Integration', () => {
	describe('sanitizeText', () => {
		it('should handle basic text without HTML', () => {
			expect(sanitizeText('Plain text')).toBe('Plain text');
		});

		it('should preserve spaces between words when removing tags', () => {
			expect(sanitizeText('Text with <b>HTML</b>')).toBe('Text with HTML');
			expect(sanitizeText('Text <b>with</b> HTML')).toBe('Text with HTML');
		});

		it('should remove unwanted tags completely', () => {
			expect(sanitizeText('<script>alert(1)</script>Text')).toBe('Text');
			expect(sanitizeText('<style>.class{}</style>Content')).toBe('Content');
		});

		it('should handle edge cases', () => {
			expect(sanitizeText('')).toBe('');
			expect(sanitizeText(null as unknown as string)).toBe('');
			expect(sanitizeText(undefined as unknown as string)).toBe('');
		});

		it('should normalize spaces', () => {
			expect(sanitizeText('Text   with   spaces')).toBe('Text with spaces');
			expect(sanitizeText('Text\nwith\nnewlines')).toBe('Text with newlines');
		});
	});
});

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
		});

		it('should handle edge cases', () => {
			expect(formatDate(null)).toBe(null);
			expect(formatDate(undefined)).toBe(undefined);
		});
	});
});
