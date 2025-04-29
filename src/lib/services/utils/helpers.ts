import DOMPurify from 'dompurify';

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

// Helper: Remove Unwanted Tags
export function removeUnwantedTags(input: string): string {
	// First pass: Remove script and style tags and their contents
	const firstPass = DOMPurify.sanitize(input, {
		ALLOWED_TAGS: [],
		ALLOWED_ATTR: [],
		ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|ftp|tel):|#)/i,
		FORBID_TAGS: ['script', 'style', 'textarea', 'option', 'noscript']
	});

	// Second pass: Clean up any remaining HTML and normalize spaces
	return DOMPurify.sanitize(firstPass, {
		ALLOWED_TAGS: [],
		ALLOWED_ATTR: [],
		ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|ftp|tel):|#)/i
	});
}

// Sanitization Configuration
export const SANITIZE_OPTIONS = {
	allowedTags: [], // Disallow all tags
	allowedAttributes: {}, // Disallow attributes
	disallowedTagsMode: 'recursiveEscape' as const, // Changed to recursiveEscape for better handling
	nonTextTags: ['script', 'style', 'textarea', 'option', 'noscript'], // Ensure these tags and their contents are removed
	parser: {
		lowerCaseTags: true,
		lowerCaseAttributeNames: true
	},
	exclusiveFilter: function (frame: { tag: string; text: string }) {
		// Remove any remaining script-like content
		return frame.tag === 'script' || frame.tag === 'style';
	},
	transformTags: {
		'*': (
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			tagName: string,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			attribs: Record<string, string>
		) => {
			// Replace tags with a space to preserve word boundaries
			return {
				tagName: '',
				text: ' ',
				attribs: {}
			};
		}
	}
};

// Periodically Clear All Memoized Caches
export function setupCacheCleanup(intervalMs: number = 5 * 60 * 1000): void {
	setInterval(() => {
		memoCache.clear();
	}, intervalMs);
}

// Initialize Cache Cleanup
setupCacheCleanup();
