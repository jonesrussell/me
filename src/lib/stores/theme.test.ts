import { describe, it, expect, vi, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { theme, themeState } from './theme.svelte';
import { simulateSystemThemeChange } from '../../test/setup';
import 'vitest-localstorage-mock';

// Mock esm-env
vi.mock('esm-env', () => ({
	BROWSER: true,
	DEV: false
}));

describe('theme store', () => {
	beforeEach(() => {
		// Clear localStorage before each test
		localStorage.clear();
		vi.clearAllMocks();

		// Mock matchMedia
		global.matchMedia = vi.fn().mockImplementation(() => ({
			matches: false,
			addEventListener: vi.fn()
		})) as unknown as typeof window.matchMedia;

		// Mock document
		global.document = {
			documentElement: {
				setAttribute: vi.fn()
			}
		} as unknown as Document;
	});

	it('initializes with auto theme when no saved theme', () => {
		expect(get(theme)).toBe('auto');
	});

	it('updates theme when set is called', () => {
		theme.set('light');
		expect(get(theme)).toBe('light');
	});

	it('handles system theme changes in auto mode', () => {
		theme.set('auto');

		// Simulate system theme change to dark
		simulateSystemThemeChange(true);

		// Verify theme state
		expect(themeState.current).toBe('auto');
	});
});
