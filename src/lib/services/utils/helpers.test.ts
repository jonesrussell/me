import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { memoize, setupCacheCleanup, SANITIZE_OPTIONS } from './helpers';

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

		it('should handle null and undefined arguments', () => {
			const fn = (arg: null | undefined) => arg;
			const memoizedFn = memoize(fn);

			expect(memoizedFn(null)).toBe(null);
			expect(memoizedFn(undefined)).toBe(undefined);
			expect(memoizedFn(null)).toBe(null); // Should use cache
		});

		it('should handle circular references gracefully', () => {
			const fn = <T>(obj: T) => obj;
			const memoizedFn = memoize(fn);

			interface CircularObject {
				a: number;
				self?: CircularObject;
			}

			const circularObj: CircularObject = { a: 1 };
			circularObj.self = circularObj;

			// Should not throw and should return the same object
			const result = memoizedFn(circularObj);
			expect(result).toBe(circularObj);
			expect(result.self).toBe(circularObj);
		});
	});

	describe('setupCacheCleanup', () => {
		beforeEach(() => {
			vi.useFakeTimers();
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it('should clear cache after interval', () => {
			const fn = (x: number) => x * 2;
			const memoizedFn = memoize(fn);

			// First call
			expect(memoizedFn(2)).toBe(4);

			// Setup cleanup with short interval
			setupCacheCleanup(1000);

			// Advance time past interval
			vi.advanceTimersByTime(1000);

			// Call again - should recompute
			expect(memoizedFn(2)).toBe(4);
		});

		it('should use default interval if none provided', () => {
			const fn = (x: number) => x * 2;
			const memoizedFn = memoize(fn);

			// First call
			expect(memoizedFn(2)).toBe(4);

			// Setup cleanup with default interval
			setupCacheCleanup();

			// Advance time past default interval (5 minutes)
			vi.advanceTimersByTime(5 * 60 * 1000);

			// Call again - should recompute
			expect(memoizedFn(2)).toBe(4);
		});
	});

	describe('SANITIZE_OPTIONS', () => {
		it('should have expected configuration', () => {
			expect(SANITIZE_OPTIONS).toMatchObject({
				allowedTags: [],
				allowedAttributes: {},
				disallowedTagsMode: 'discard',
				nonTextTags: ['script', 'style', 'textarea', 'option', 'noscript']
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
