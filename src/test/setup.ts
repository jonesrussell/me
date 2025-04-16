import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/svelte';
import { afterAll, afterEach, expect, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import { tick } from 'svelte';

// Extend jest-dom matchers
expect.extend(
	matchers as Record<
		string,
		(received: unknown, ...args: unknown[]) => { pass: boolean; message(): string }
	>
);

// Create a JSDOM instance with proper configuration
const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
	url: 'http://localhost',
	pretendToBeVisual: true,
	runScripts: 'dangerously',
	resources: 'usable',
});

// Set up global variables
global.document = dom.window.document;
global.window = dom.window as unknown as Window & typeof globalThis;
global.navigator = dom.window.navigator;

// Create a container for the app
const appContainer = document.createElement('div');
appContainer.id = 'app';
document.body.appendChild(appContainer);

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Extend expect with custom matchers
expect.extend({
	toBeInTheDocument(received) {
		const pass = document.body.contains(received);
		return {
			pass,
			message: () =>
				`expected ${received} ${pass ? 'not ' : ''}to be in the document`
		};
	}
});

// Cleanup after each test
afterEach(() => {
	cleanup();
	vi.clearAllMocks();
	// Remove the test container
	const container = document.getElementById('app');
	if (container) {
		document.body.removeChild(container);
	}
});

// Clean up after all tests
afterAll(() => {
	appContainer.remove();
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

// Setup Svelte 5 environment
vi.mock('svelte', async () => {
	const actual = (await vi.importActual('svelte')) as typeof import('svelte');
	return {
		...actual,
		browser: true,
		tick: async () => {
			await Promise.resolve();
			return actual.tick();
		},
		$state: (initial: any) => ({ value: initial }),
		$derived: (fn: () => any) => ({ value: fn() }),
		$effect: (fn: () => void) => {
			fn();
			return () => {};
		},
		$props: <T>() => ({} as T),
		$inspect: (value: any) => value
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

// Setup a clean DOM environment before each test
beforeEach(() => {
	// Create a fresh container for mounting components
	const container = document.createElement('div');
	container.id = 'app';
	document.body.appendChild(container);
});

// Add any missing DOM APIs that Svelte might need
if (!global.CSS) {
	global.CSS = {
		supports: () => false,
		escape: (str: string) => str,
		// Add required properties with default values
		Hz: 0,
		Q: 0,
		cap: 0,
		ch: 0,
		cm: 0,
		deg: 0,
		dpcm: 0,
		dpi: 0,
		dppx: 0,
		em: 0,
		ex: 0,
		fr: 0,
		grad: 0,
		ic: 0,
		in: 0,
		kHz: 0,
		lh: 0,
		mm: 0,
		ms: 0,
		number: 0,
		pc: 0,
		percent: 0,
		pt: 0,
		px: 0,
		rad: 0,
		rem: 0,
		rlh: 0,
		s: 0,
		turn: 0,
		vb: 0,
		vh: 0,
		vi: 0,
		vmax: 0,
		vmin: 0,
		vw: 0,
		registerProperty: () => undefined,
		paintWorklet: undefined,
		animationWorklet: undefined,
		layoutWorklet: undefined,
		highContrastAdjust: undefined,
		highContrastAdjustColor: undefined,
		highContrastAdjustBackground: undefined,
		highContrastAdjustText: undefined,
		highContrastAdjustOutline: undefined,
		highContrastAdjustBorder: undefined,
		highContrastAdjustScrollbar: undefined,
		highContrastAdjustButton: undefined,
		highContrastAdjustLink: undefined,
		highContrastAdjustVisited: undefined,
		highContrastAdjustActive: undefined,
		highContrastAdjustHover: undefined,
		highContrastAdjustFocus: undefined,
		highContrastAdjustFocusVisible: undefined,
		highContrastAdjustFocusWithin: undefined,
		highContrastAdjustTarget: undefined,
		highContrastAdjustSelection: undefined,
		highContrastAdjustMarker: undefined,
		highContrastAdjustPlaceholder: undefined,
		highContrastAdjustDisabled: undefined,
		highContrastAdjustReadOnly: undefined,
		highContrastAdjustRequired: undefined,
		highContrastAdjustInvalid: undefined,
		highContrastAdjustValid: undefined,
		highContrastAdjustInRange: undefined,
		highContrastAdjustOutOfRange: undefined,
		highContrastAdjustOptional: undefined,
		highContrastAdjustDefault: undefined,
		highContrastAdjustChecked: undefined,
		highContrastAdjustIndeterminate: undefined,
		highContrastAdjustPlaceholderShown: undefined,
		highContrastAdjustAutofill: undefined,
		highContrastAdjustUserInvalid: undefined,
		highContrastAdjustUserValid: undefined,
		highContrastAdjustUserInRange: undefined,
		highContrastAdjustUserOutOfRange: undefined,
		highContrastAdjustUserOptional: undefined,
		highContrastAdjustUserDefault: undefined,
		highContrastAdjustUserChecked: undefined,
		highContrastAdjustUserIndeterminate: undefined,
		highContrastAdjustUserPlaceholderShown: undefined,
		highContrastAdjustUserAutofill: undefined
	} as unknown as typeof CSS;
}

// Mock SvelteKit navigation
vi.mock('$app/navigation', () => ({
	goto: vi.fn(),
	invalidate: vi.fn(),
	invalidateAll: vi.fn(),
	preloadData: vi.fn(),
	preloadCode: vi.fn()
}));

// Helper function to wait for Svelte 5 reactivity
export const waitForReactivity = async () => {
	await tick();
	await new Promise(resolve => setTimeout(resolve, 0));
};
