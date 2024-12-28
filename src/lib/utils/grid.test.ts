import { afterEach, describe, expect, it } from 'vitest';
import { alignToGrid, getGridWidth, getResponsiveValue } from './grid';

describe('grid utilities', () => {
	// Store original window
	const originalWindow = globalThis.window;

	afterEach(() => {
		// Restore original window after each test
		globalThis.window = originalWindow;
	});

	it('should align values to grid', () => {
		expect(alignToGrid(10)).toBe(10);
		expect(alignToGrid(11, 2)).toBe(10);
		expect(alignToGrid(12, 4)).toBe(12);
	});

	it('should get responsive values', () => {
		// Mock window using globalThis
		globalThis.window = { innerWidth: 500 } as Window & typeof globalThis;
		expect(getResponsiveValue(10, 20)).toBe(10);

		globalThis.window = { innerWidth: 800 } as Window & typeof globalThis;
		expect(getResponsiveValue(10, 20)).toBe(20);
	});

	it('should format grid widths', () => {
		expect(getGridWidth(10.123)).toBe('10.12px');
		expect(getGridWidth(10)).toBe('10px');
	});
});
