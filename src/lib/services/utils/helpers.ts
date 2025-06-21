import { sanitize } from '$lib/utils/sanitize';

// Helper: Sanitize HTML
export function sanitizeHTML(input: string): string {
	if (!input) return '';
	return sanitize(input);
}

// Restrictive sanitization options for testing and specific use cases
export const SANITIZE_OPTIONS = {
	allowedTags: [],
	allowedAttributes: {},
	disallowedTagsMode: 'discard' as const,
	nonTextTags: ['script', 'style', 'textarea', 'option', 'noscript'],
	parser: {
		lowerCaseTags: true,
		lowerCaseAttributeNames: true
	},
	transformTags: {
		'*': () => ({
			tagName: '',
			text: ' ',
			attribs: {}
		})
	}
};

// Cache for memoized results
const memoCache = new Map<string, unknown>();

// Reusable Memoization Helper
export function memoize<Args extends unknown[], Return>(
	fn: (...args: Args) => Return
): (...args: Args) => Return {
	return (...args: Args): Return => {
		// Handle circular references by using a simple string representation
		const key = args
			.map(arg => {
				try {
					return JSON.stringify(arg);
				} catch {
					// For circular references or other non-serializable values,
					// use a string representation of the type
					return `[${typeof arg}]`;
				}
			})
			.join('|');

		if (memoCache.has(key)) {
			return memoCache.get(key) as Return;
		}
		const result = fn(...args);
		memoCache.set(key, result);
		return result;
	};
}

// Periodically Clear All Memoized Caches
export function setupCacheCleanup(intervalMs: number = 5 * 60 * 1000): void {
	if (typeof window !== 'undefined') {
		window.setInterval(() => {
			memoCache.clear();
		}, intervalMs);
	} else {
		setInterval(() => {
			memoCache.clear();
		}, intervalMs);
	}
}

// Initialize Cache Cleanup
setupCacheCleanup();
