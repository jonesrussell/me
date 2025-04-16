import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/svelte';
import { afterEach, beforeEach, vi, expect } from 'vitest';
import { JSDOM } from 'jsdom';

// Create a JSDOM instance with proper configuration
const dom = new JSDOM(
	'<!DOCTYPE html><html><head></head><body><div id="app"></div></body></html>',
	{
		url: 'http://localhost',
		pretendToBeVisual: true,
		runScripts: 'dangerously'
	}
);

// Enhanced type definitions for global window
type TestWindow = Window &
	typeof globalThis & {
		matchMedia: (query: string) => MediaQueryList;
		ResizeObserver: new (callback: ResizeObserverCallback) => ResizeObserver;
		IntersectionObserver: typeof IntersectionObserver;
	};

// Set up global variables with proper typing
global.document = dom.window.document;
global.window = dom.window as unknown as TestWindow;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;
global.customElements = dom.window.customElements;
global.Element = dom.window.Element;
global.Node = dom.window.Node;

// Utility functions
const ensureAppContainer = () => {
	const container = document.getElementById('app');
	if (!container) {
		throw new Error('App container not found. Required for testing.');
	}
	return container;
};

const createStyleElement = (id: string, parent: HTMLElement) => {
	const style = document.createElement('style');
	style.id = id;
	parent.appendChild(style);
	return style;
};

const setupErrorBoundary = () => {
	if (typeof window === 'undefined') return () => {};
	const originalOnError = window.onerror;
	window.onerror = (message, source, lineno, colno, error) => {
		console.error('Test setup error:', { message, source, lineno, colno, error });
		return true;
	};
	return () => {
		if (typeof window !== 'undefined') {
			window.onerror = originalOnError;
		}
	};
};

const setupPerformanceMonitoring = () => {
	const startTime = performance.now();
	return () => {
		const endTime = performance.now();
		console.log(`Test setup took ${endTime - startTime}ms`);
	};
};

// Create and ensure app container exists
const appContainer = ensureAppContainer();

// Mock requestAnimationFrame for Svelte transitions
global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
	return setTimeout(() => callback(Date.now()), 0) as unknown as number;
};

global.cancelAnimationFrame = (handle: number) => {
	clearTimeout(handle);
};

// Setup and cleanup
beforeEach(() => {
	const cleanupErrorBoundary = setupErrorBoundary();
	const logPerformance = setupPerformanceMonitoring();

	// Ensure document structure is clean
	document.head.innerHTML = '';
	appContainer.innerHTML = '';

	// Add style elements
	createStyleElement('svelte-css', document.head);
	createStyleElement('svelte-body-css', document.body);

	return () => {
		cleanupErrorBoundary();
		logPerformance();
	};
});

afterEach(() => {
	cleanup();
	vi.clearAllMocks();
	document.head.innerHTML = '';
	document.body.innerHTML = '';
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
vi.mock('*.css', () => ({
	default: {},
	__esModule: true
}));

// Suppress CSS parsing warnings
const suppressCSSWarnings = (message: string) => message.includes('Could not parse CSS stylesheet');

const originalError = console.error;
console.error = (...args) => {
	if (args[0] && typeof args[0] === 'string' && suppressCSSWarnings(args[0])) {
		return;
	}
	originalError(...args);
};

// Add custom matchers
expect.extend({
	toHaveStyle(received: HTMLElement, expected: Record<string, string>) {
		const actual = window.getComputedStyle(received);
		const pass = Object.entries(expected).every(
			([key, value]) => actual.getPropertyValue(key) === value
		);
		return {
			pass,
			message: () =>
				`Expected element ${pass ? 'not ' : ''}to have styles ${JSON.stringify(expected)}`
		};
	}
});

// Set test environment variables
vi.stubEnv('VITE_TEST_MODE', 'true');
