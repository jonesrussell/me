import DOMPurify from 'dompurify';

// Extend the sanitize-html options type to include transformTags
type SanitizeOptions = {
	allowedTags: string[];
	allowedAttributes: Record<string, string[]>;
	disallowedTagsMode: 'recursiveEscape' | 'discard';
	nonTextTags: string[];
	parser?: {
		lowerCaseTags: boolean;
		lowerCaseAttributeNames: boolean;
	};
	transformTags: {
		[key: string]: (
			tagName: string,
			attribs: Record<string, string>
		) => { tagName: string; text: string; attribs: Record<string, string> };
	};
};

// Sanitization Configuration
export const SANITIZE_OPTIONS: SanitizeOptions = {
	allowedTags: [],
	allowedAttributes: {},
	disallowedTagsMode: 'discard',
	nonTextTags: ['script', 'style', 'textarea', 'option', 'noscript'],
	parser: {
		lowerCaseTags: true,
		lowerCaseAttributeNames: true
	},
	transformTags: {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		'*': (tagName: string, attribs: Record<string, string>) => ({
			tagName: '',
			text: ' ',
			attribs: {}
		})
	}
};

// Helper: Sanitize HTML
export function sanitizeHTML(input: string): string {
	if (!input) return '';
	return DOMPurify.sanitize(input, { USE_PROFILES: { html: true } });
}

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
