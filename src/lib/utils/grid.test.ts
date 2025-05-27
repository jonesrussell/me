import { afterEach, describe, expect, it, vi } from 'vitest';
import { calculateWidth, getResponsiveValue } from './grid';

describe('grid utilities', () => {
	describe('calculateWidth', () => {
		it('calculates the width of content in character units', () => {
			expect(calculateWidth('test')).toBe(4);
			expect(calculateWidth('multi\nline')).toBe(5);
			expect(calculateWidth('longer line\nshort')).toBe(11);
		});
	});

	describe('getResponsiveValue', () => {
		afterEach(() => {
			vi.restoreAllMocks();
		});

		it('returns mobile value when window width < 640', () => {
			global.window = { innerWidth: 320 } as Window & typeof globalThis;
			expect(getResponsiveValue(10, 20)).toBe(10);
		});

		it('returns desktop value when window width >= 640', () => {
			global.window = { innerWidth: 1024 } as Window & typeof globalThis;
			expect(getResponsiveValue(10, 20)).toBe(20);
		});

		it('returns mobile value when window is undefined', () => {
			global.window = undefined as unknown as Window & typeof globalThis;
			expect(getResponsiveValue(10, 20)).toBe(10);
		});
	});
});
