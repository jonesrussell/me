import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/svelte';
import { afterEach, expect, vi } from 'vitest';

// Extend jest-dom matchers
expect.extend(
	matchers as Record<
		string,
		(
			received: unknown,
			...args: unknown[]
		) => { pass: boolean; message(): string }
	>
);

// Cleanup after each test
afterEach(() => {
	cleanup();
	vi.clearAllMocks();
	vi.clearAllTimers();
});

// Mock CSS modules
vi.mock('*.css', () => {
	return {
		default: {}
	};
});

// Mock SvelteKit modules
vi.mock('$app/paths', () => ({
	base: '',
	assets: ''
}));

vi.mock('$app/stores', () => ({
	page: {
		subscribe: vi.fn()
	},
	navigating: {
		subscribe: vi.fn()
	},
	updated: {
		subscribe: vi.fn()
	}
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
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

// Setup Svelte 5 environment
vi.mock('svelte', async () => {
	const actual = (await vi.importActual('svelte')) as typeof import('svelte');
	return {
		...actual,
		browser: true,
		tick: async () => {
			await Promise.resolve();
			return actual.tick();
		}
	};
});

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

// Mock navigation
vi.mock('$app/navigation', () => ({
	afterNavigate: vi.fn(),
	beforeNavigate: vi.fn(),
	disableScrollHandling: vi.fn(),
	goto: vi.fn(),
	invalidate: vi.fn(),
	invalidateAll: vi.fn(),
	preloadCode: vi.fn(),
	preloadData: vi.fn()
}));

// Suppress CSS parsing warnings
const originalError = console.error;
console.error = (...args) => {
	if (args[0]?.includes?.('Could not parse CSS stylesheet')) {
		return;
	}
	originalError(...args);
};
