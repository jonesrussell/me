import { describe, it, expect } from 'vitest';
import { sanitizeText } from './utils';

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
