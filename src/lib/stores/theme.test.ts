import { describe, it, expect, vi, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { createThemeStore } from './theme';
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
		const store = createThemeStore();
		expect(get(store)).toBe('auto');
		expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
		expect(localStorage.getItem).toHaveBeenCalledWith('theme');
	});

	it('uses saved theme from localStorage', () => {
		localStorage.setItem('theme', 'dark');
		const store = createThemeStore();
		expect(get(store)).toBe('dark');
		expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
		expect(localStorage.getItem).toHaveBeenCalledWith('theme');
	});

	it('updates theme when set is called', () => {
		const store = createThemeStore();
		store.set('light');
		expect(localStorage.getItem('theme')).toBe('light');
		expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
		expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
	});

	it('handles system theme changes in auto mode', () => {
		const store = createThemeStore();
		store.set('auto');

		// Simulate system theme change to dark
		simulateSystemThemeChange(true);

		// Verify theme was updated
		expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
	});
});
