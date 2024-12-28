import { beforeAll, describe, expect, test } from 'vitest';
import { alignToGrid } from './grid';

describe('grid utils', () => {
	beforeAll(() => {
		// Mock window.innerWidth
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: 1024
		});
	});

	test('alignToGrid rounds to nearest grid unit', () => {
		expect(alignToGrid(10)).toBe(10);
		expect(alignToGrid(11, 2)).toBe(10);
		expect(alignToGrid(12, 4)).toBe(12);
	});
});
