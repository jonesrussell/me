import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
	memoize,
	normalizeSpaces,
	removeUnwantedTags,
	setupCacheCleanup,
	SANITIZE_OPTIONS
} from './helpers';

describe('Helper Functions', () => {
	describe('memoize', () => {
		it('should cache and return cached results', () => {
			let callCount = 0;
			const fn = (x: number) => {
				callCount++;
				return x * 2;
			};
			const memoizedFn = memoize(fn);

			// First call
			expect(memoizedFn(2)).toBe(4);
			expect(callCount).toBe(1);

			// Second call with same input
			expect(memoizedFn(2)).toBe(4);
			expect(callCount).toBe(1); // Should use cache

			// Different input
			expect(memoizedFn(3)).toBe(6);
			expect(callCount).toBe(2);
		});

		it('should handle multiple arguments', () => {
			const fn = (a: number, b: number) => a + b;
			const memoizedFn = memoize(fn);

			expect(memoizedFn(1, 2)).toBe(3);
			expect(memoizedFn(1, 2)).toBe(3); // Should use cache
			expect(memoizedFn(2, 3)).toBe(5);
		});

		it('should handle complex objects as arguments', () => {
			const fn = (obj: { a: number; b: string }) => `${obj.a}${obj.b}`;
			const memoizedFn = memoize(fn);

			const input = { a: 1, b: 'test' };
			expect(memoizedFn(input)).toBe('1test');
			expect(memoizedFn(input)).toBe('1test'); // Should use cache
		});
	});

	describe('normalizeSpaces', () => {
		it('should normalize spaces between tags', () => {
			expect(normalizeSpaces('<div><p> text </p></div>')).toBe('<div><p> text </p></div>');
		});

		it('should normalize spaces around text', () => {
			expect(normalizeSpaces('text <b>bold</b> text')).toBe('text <b>bold</b> text');
		});

		it('should normalize multiple spaces', () => {
			expect(normalizeSpaces('text    text')).toBe('text text');
		});

		it('should handle newlines and tabs', () => {
			expect(normalizeSpaces('text\n\ttext')).toBe('text text');
		});

		it('should handle mixed whitespace', () => {
			expect(normalizeSpaces('  text  \n  text  ')).toBe('text text');
		});

		it('should handle empty input', () => {
			expect(normalizeSpaces('')).toBe('');
			expect(normalizeSpaces('   ')).toBe('');
		});
	});

	describe('removeUnwantedTags', () => {
		it('should remove script tags', () => {
			expect(removeUnwantedTags('<script>alert(1)</script>')).toBe('');
			expect(removeUnwantedTags('<div><script>alert(1)</script>text</div>')).toBe(
				'<div>text</div>'
			);
		});

		it('should remove style tags', () => {
			expect(removeUnwantedTags('<style>.class { color: red; }</style>')).toBe('');
			expect(removeUnwantedTags('<div><style>.class{}</style>text</div>')).toBe('<div>text</div>');
		});

		it('should preserve other content', () => {
			expect(removeUnwantedTags('<div>text</div>')).toBe('<div>text</div>');
		});

		it('should handle empty input', () => {
			expect(removeUnwantedTags('')).toBe('');
		});
	});

	describe('setupCacheCleanup', () => {
		let originalSetInterval: typeof setInterval;
		let mockSetInterval: ReturnType<typeof vi.fn>;

		beforeEach(() => {
			originalSetInterval = global.setInterval;
			mockSetInterval = vi.fn();
			global.setInterval = mockSetInterval as unknown as typeof setInterval;
		});

		afterEach(() => {
			global.setInterval = originalSetInterval;
		});

		it('should set up interval with default time', () => {
			setupCacheCleanup();
			expect(mockSetInterval).toHaveBeenCalledWith(expect.any(Function), 5 * 60 * 1000);
		});

		it('should set up interval with custom time', () => {
			const customInterval = 1000;
			setupCacheCleanup(customInterval);
			expect(mockSetInterval).toHaveBeenCalledWith(expect.any(Function), customInterval);
		});
	});

	describe('SANITIZE_OPTIONS', () => {
		it('should have expected configuration', () => {
			expect(SANITIZE_OPTIONS).toMatchObject({
				allowedTags: [],
				allowedAttributes: {},
				disallowedTagsMode: 'discard'
			});
		});

		it('should have parser configuration', () => {
			expect(SANITIZE_OPTIONS.parser).toMatchObject({
				lowerCaseTags: true,
				lowerCaseAttributeNames: true
			});
		});

		it('should transform tags to preserve spaces', () => {
			const result = SANITIZE_OPTIONS.transformTags['*']('div', {});
			expect(result).toMatchObject({
				tagName: '',
				text: ' ',
				attribs: {}
			});
		});
	});
});
