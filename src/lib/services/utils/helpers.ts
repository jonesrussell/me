import sanitizeHtml from 'sanitize-html';

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

// Helper: Remove Unwanted Tags
export function removeUnwantedTags(input: string): string {
	if (!input) return '';
	const options: SanitizeOptions = {
		...SANITIZE_OPTIONS,
		transformTags: {
			script: () => ({ tagName: '', text: '', attribs: {} }),
			style: () => ({ tagName: '', text: '', attribs: {} }),
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			'*': (tagName: string, attribs: Record<string, string>) => ({
				tagName: '',
				text: ' ',
				attribs: {}
			})
		}
	};
	return sanitizeHtml(input, options);
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
