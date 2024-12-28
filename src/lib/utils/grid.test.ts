import { beforeAll, describe, expect, test } from 'vitest';
import { alignToGrid } from './grid';

describe('grid utils', () => {
	beforeAll(() => {
		// Mock window object for Node.js environment
		global.window = {
			innerWidth: 1024
		} as Window & typeof globalThis;
	});

	test('alignToGrid rounds to nearest grid unit', () => {
		expect(alignToGrid(10)).toBe(10);
		expect(alignToGrid(11, 2)).toBe(10);
		expect(alignToGrid(12, 4)).toBe(12);
	});
});
