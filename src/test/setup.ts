import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/svelte';
import { afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Create a JSDOM instance
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');

// Set up global variables
global.document = dom.window.document;
global.window = dom.window as unknown as Window & typeof globalThis;
global.navigator = dom.window.navigator;

// Mock requestAnimationFrame for Svelte transitions
global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
	return setTimeout(() => callback(Date.now()), 0) as unknown as number;
};

global.cancelAnimationFrame = (handle: number) => {
	clearTimeout(handle);
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
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
class MockResizeObserver implements ResizeObserver {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
	constructor(_callback: ResizeObserverCallback) {
		return this;
	}
}

global.ResizeObserver = MockResizeObserver;

// Mock IntersectionObserver
global.IntersectionObserver = vi
	.fn()
	.mockImplementation((_callback: IntersectionObserverCallback) => ({
		observe: vi.fn(),
		unobserve: vi.fn(),
		disconnect: vi.fn(),
		takeRecords: vi.fn().mockReturnValue([]),
		root: null,
		rootMargin: '',
		thresholds: []
	}));

// Mock SvelteKit modules
vi.mock('$app/paths', () => ({
	base: '',
	assets: ''
}));

vi.mock('$app/stores', () => ({
	page: { subscribe: vi.fn() },
	navigating: { subscribe: vi.fn() },
	updated: { subscribe: vi.fn() }
}));

// Mock CSS modules
Object.defineProperty(window, 'CSS', {
	value: {
		supports: () => true,
		escape: (str: string) => str
	}
});

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
	value: () => ({
		getPropertyValue: () => ''
	})
});

// Mock CSS parsing
const originalCreateStylesheet = dom.window.document.createElement('style').sheet;
Object.defineProperty(dom.window.document.createElement('style'), 'sheet', {
	get: () => originalCreateStylesheet
});

// Cleanup after each test
afterEach(() => {
	cleanup();
	vi.clearAllMocks();
	document.body.innerHTML = '';
});
