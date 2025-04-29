import sanitizeHtml from 'sanitize-html';

// Sanitization Configuration
export const SANITIZE_OPTIONS = {
	allowedTags: [
		'p',
		'br',
		'b',
		'i',
		'em',
		'strong',
		'a',
		'ul',
		'ol',
		'li',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'blockquote',
		'code',
		'pre'
	],
	allowedAttributes: {
		a: ['href', 'title', 'target'],
		'*': ['class']
	},
	allowedSchemes: ['http', 'https', 'mailto', 'tel'],
	disallowedTagsMode: 'recursiveEscape' as const,
	nonTextTags: ['script', 'style', 'textarea', 'option', 'noscript'],
	parser: {
		lowerCaseTags: true,
		lowerCaseAttributeNames: true
	},
	transformTags: {
		'*': (tagName: string, attribs: Record<string, string>) => {
			return {
				tagName,
				attribs
			};
		}
	}
};

// Helper: Remove Unwanted Tags
export function removeUnwantedTags(input: string): string {
	if (!input) return '';
	return sanitizeHtml(input, {
		...SANITIZE_OPTIONS,
		allowedTags: [],
		allowedAttributes: {}
	});
}

// Helper: Sanitize HTML
export function sanitizeHTML(input: string): string {
	if (!input) return '';
	return sanitizeHtml(input, SANITIZE_OPTIONS);
}

// Cache for memoized results
const memoCache = new Map<string, unknown>();

// Reusable Memoization Helper
export function memoize<Args extends unknown[], Return>(
	fn: (...args: Args) => Return
): (...args: Args) => Return {
	return (...args: Args): Return => {
		const key = JSON.stringify(args);
		if (memoCache.has(key)) {
			return memoCache.get(key) as Return;
		}
		const result = fn(...args);
		memoCache.set(key, result);
		return result;
	};
}

// Helper: Normalize Spaces
export function normalizeSpaces(input: string): string {
	return (
		input
			// First normalize all whitespace to single spaces
			.replace(/\s+/g, ' ')
			// Then trim leading/trailing spaces
			.trim()
	);
}

// Periodically Clear All Memoized Caches
export function setupCacheCleanup(intervalMs: number = 5 * 60 * 1000): void {
	setInterval(() => {
		memoCache.clear();
	}, intervalMs);
}

// Initialize Cache Cleanup
setupCacheCleanup();
