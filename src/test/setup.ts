import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/svelte';
import { afterEach, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Create a JSDOM instance with proper configuration
const dom = new JSDOM('<!DOCTYPE html><html><head></head><body><div id="app"></div></body></html>', {
	url: 'http://localhost',
	pretendToBeVisual: true,
	runScripts: 'dangerously'
});

// Set up global variables
global.document = dom.window.document;
global.window = dom.window as unknown as Window & typeof globalThis;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;
global.customElements = dom.window.customElements;
global.Element = dom.window.Element;
global.Node = dom.window.Node;

// Create and ensure app container exists
const appContainer = document.getElementById('app');
if (!appContainer) {
	throw new Error('App container not found');
}

// Mock requestAnimationFrame for Svelte transitions
global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
	return setTimeout(() => callback(Date.now()), 0) as unknown as number;
};

global.cancelAnimationFrame = (handle: number) => {
	clearTimeout(handle);
};

// Setup and cleanup
beforeEach(() => {
	// Ensure document structure is clean
	document.head.innerHTML = '';
	appContainer.innerHTML = '';
});

afterEach(() => {
	cleanup();
	vi.clearAllMocks();
	document.head.innerHTML = '';
	appContainer.innerHTML = '';
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	enumerable: true,
	value: vi.fn().mockImplementation(query => ({
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

// Mock CSS modules
vi.mock('*.css', () => ({}));

// Suppress CSS parsing warnings
const originalError = console.error;
console.error = (...args) => {
	if (args[0]?.includes?.('Could not parse CSS stylesheet')) {
		return;
	}
	originalError(...args);
};
