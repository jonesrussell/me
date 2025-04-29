import { vi } from 'vitest';
import 'vitest-localstorage-mock';

// Mock window and its APIs
let isDarkMode = false;
interface ThemeChangeCallback {
	(e: { matches: boolean }): void;
}

declare global {
	interface Window {
		themeChangeCallback?: ThemeChangeCallback;
	}
}

global.window = {
	matchMedia: (query: string) => ({
		matches: query.includes('dark') && isDarkMode,
		addEventListener: (type: string, callback: ThemeChangeCallback) => {
			// Store callback for later use
			window.themeChangeCallback = callback;
		},
		removeEventListener: () => {
			window.themeChangeCallback = undefined;
		}
	}),
	setInterval: (callback: () => void) => {
		// For testing, we'll just call the callback once
		callback();
		return 1; // Return a mock interval ID
	},
	clearInterval: () => {}
} as unknown as Window & typeof globalThis;

// Helper to simulate system theme change
export const simulateSystemThemeChange = (dark: boolean) => {
	isDarkMode = dark;
	if (window.themeChangeCallback) {
		window.themeChangeCallback({ matches: dark });
	}
};

// Mock document
global.document = {
	documentElement: {
		setAttribute: vi.fn()
	}
} as unknown as Document;

// Ensure localStorage is available globally
if (typeof global.localStorage === 'undefined') {
	global.localStorage = {
		getItem: () => null,
		setItem: () => {},
		clear: () => {},
		removeItem: () => {},
		key: () => null,
		length: 0
	} as unknown as Storage;
}
