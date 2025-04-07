import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/svelte';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
	cleanup();
	vi.clearAllMocks();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	enumerable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
};

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
	root: null,
	rootMargin: '',
	thresholds: [],
	takeRecords: vi.fn().mockReturnValue([])
}));

// Mock CSSStyleSheet
class CSSStyleSheet {
	insertRule() {
		return 0;
	}
}

// Mock style element and prevent CSS parsing errors
Object.defineProperty(document.createElement('style'), 'sheet', {
	get() {
		return new CSSStyleSheet();
	}
});

// Mock CSS parsing to prevent errors with modern features
Object.defineProperty(CSSStyleSheet.prototype, 'insertRule', {
	value: () => 0
});

// Suppress CSS parsing warnings
const originalError = console.error;
console.error = (...args) => {
	if (args[0]?.includes?.('Could not parse CSS stylesheet')) {
		return;
	}
	originalError(...args);
};
