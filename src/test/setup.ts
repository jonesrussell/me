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

// Create a mock element with basic DOM methods
const createMockElement = () => ({
	appendChild: vi.fn(),
	removeChild: vi.fn(),
	innerHTML: '',
	textContent: '',
	classList: {
		contains: vi.fn(),
		add: vi.fn(),
		remove: vi.fn(),
		toggle: vi.fn()
	},
	querySelector: vi.fn(),
	querySelectorAll: vi.fn(),
	setAttribute: vi.fn(),
	getAttribute: vi.fn(),
	removeAttribute: vi.fn(),
	addEventListener: vi.fn(),
	removeEventListener: vi.fn(),
	dispatchEvent: vi.fn(),
	focus: vi.fn(),
	blur: vi.fn(),
	click: vi.fn(),
	style: {},
	dataset: {},
	children: [],
	childNodes: [],
	parentNode: null,
	nextSibling: null,
	previousSibling: null,
	nodeType: 1,
	nodeName: 'DIV',
	tagName: 'DIV'
});

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
	clearInterval: () => { },
	document: null as unknown as Document // Will be set below
} as unknown as Window & typeof globalThis;

// Helper to simulate system theme change
export const simulateSystemThemeChange = (dark: boolean) => {
	isDarkMode = dark;
	if (window.themeChangeCallback) {
		window.themeChangeCallback({ matches: dark });
	}
};

// Mock document with createElement and other required methods
const mockDocument = {
	documentElement: {
		setAttribute: vi.fn(),
		classList: {
			contains: vi.fn(),
			add: vi.fn(),
			remove: vi.fn(),
			toggle: vi.fn()
		}
	},
	createElement: (tagName: string) => {
		const element = createMockElement();
		element.tagName = tagName.toUpperCase();
		element.nodeName = tagName.toUpperCase();
		return element;
	},
	createTextNode: (text: string) => ({
		nodeType: 3,
		nodeName: '#text',
		textContent: text,
		parentNode: null,
		nextSibling: null,
		previousSibling: null
	}),
	querySelector: vi.fn(),
	querySelectorAll: vi.fn(),
	getElementById: vi.fn(),
	getElementsByClassName: vi.fn(),
	getElementsByTagName: vi.fn(),
	addEventListener: vi.fn(),
	removeEventListener: vi.fn(),
	dispatchEvent: vi.fn(),
	head: createMockElement(),
	body: createMockElement(),
	title: '',
	URL: '',
	domain: '',
	location: {
		href: '',
		origin: '',
		protocol: '',
		host: '',
		hostname: '',
		port: '',
		pathname: '',
		search: '',
		hash: ''
	}
} as unknown as Document;

global.document = mockDocument;
global.window.document = mockDocument;

// Ensure localStorage is available globally
if (typeof global.localStorage === 'undefined') {
	global.localStorage = {
		getItem: () => null,
		setItem: () => { },
		clear: () => { },
		removeItem: () => { },
		key: () => null,
		length: 0
	} as unknown as Storage;
}
