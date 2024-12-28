import { beforeEach, describe, expect, test } from 'vitest';
import { alignToGrid } from './grid';

describe('grid utils', () => {
	const originalWindow = global.window;

	beforeEach(() => {
		// Reset window before each test
		global.window =
			originalWindow ?? (undefined as unknown as Window & typeof globalThis);
	});

	describe('Browser Environment', () => {
		test('rounds to nearest grid unit', () => {
			global.window = {
				innerWidth: 1024
			} as Window & typeof globalThis;

			expect(alignToGrid(10)).toBe(10);
			expect(alignToGrid(11, 2)).toBe(10);
			expect(alignToGrid(12, 4)).toBe(12);
		});

		test('handles different grid sizes', () => {
			global.window = {
				innerWidth: 1024
			} as Window & typeof globalThis;

			expect(alignToGrid(15, 5)).toBe(15);
			expect(alignToGrid(17, 5)).toBe(15);
			expect(alignToGrid(23, 5)).toBe(25);
		});
	});

	describe('SSR Environment', () => {
		test('preserves values without rounding', () => {
			global.window = undefined as unknown as Window & typeof globalThis;

			expect(alignToGrid(10)).toBe(10);
			expect(alignToGrid(20)).toBe(20);
		});

		test('ignores grid size parameter', () => {
			global.window = undefined as unknown as Window & typeof globalThis;

			expect(alignToGrid(15, 5)).toBe(15);
			expect(alignToGrid(17, 5)).toBe(17);
		});
	});
});
