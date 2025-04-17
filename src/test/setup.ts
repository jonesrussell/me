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
		addListener: vi.fn(),
		removeListener: vi.fn(),
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
vi.mock('*.css', () => {
	return {
		default: {}
	};
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

// Define CSS custom properties for testing
const style = document.createElement('style');
style.textContent = `
	:root {
		/* Colors */
		--border-color: #ccc;
		--background-color: #fff;
		--text-color: #000;
		--text-muted: #666;
		--primary-color: #007bff;
		--accent-color: #007bff;
		--bg-color: #fff;
		--bg-darker: #f8f9fa;
		--error-color: #dc3545;
		--warning-color: #ffc107;
		--success-color: #28a745;
		--info-color: #17a2b8;

		/* Typography */
		--font-mono: monospace;
		--font-size-sm: 0.875rem;
		--font-size-base: 1rem;
		--font-size-xl: 1.25rem;
		--font-weight-bold: 700;

		/* Spacing */
		--space-1: 0.25rem;
		--space-2: 0.5rem;
		--space-3: 0.75rem;
		--space-4: 1rem;
		--space-8: 2rem;

		/* Borders & Shadows */
		--border-width: 1px;
		--radius-sm: 0.25rem;
		--radius-md: 0.5rem;
		--radius-lg: 1rem;
		--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
		--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);

		/* Transitions */
		--transition-duration: 0.2s;
		--transition-timing: ease-in-out;

		/* Layout */
		--measure: 65ch;
		--max-width: 1200px;
	}
`;
document.head.appendChild(style);

// Cleanup after each test
afterEach(() => {
	cleanup();
	vi.clearAllMocks();
	document.body.innerHTML = '';
});
