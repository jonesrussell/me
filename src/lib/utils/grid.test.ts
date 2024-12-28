import { beforeEach, describe, expect, test } from 'vitest';
import { alignToGrid } from './grid';

describe('grid utils', () => {
	const originalWindow = global.window;

	beforeEach(() => {
		// Reset window before each test
		if (originalWindow) {
			global.window = originalWindow;
		} else {
			global.window = undefined as unknown as Window & typeof globalThis;
		}
	});

	test('alignToGrid rounds to nearest grid unit in browser', () => {
		// Mock browser environment
		global.window = {
			innerWidth: 1024
		} as Window & typeof globalThis;

		expect(alignToGrid(10)).toBe(10);
		expect(alignToGrid(11, 2)).toBe(10);
		expect(alignToGrid(12, 4)).toBe(12);
	});

	test('alignToGrid works in SSR environment', () => {
		// Ensure window is undefined (SSR environment)
		global.window = undefined as unknown as Window & typeof globalThis;

		expect(alignToGrid(10)).toBe(10);
		expect(alignToGrid(20)).toBe(20);
	});
});
