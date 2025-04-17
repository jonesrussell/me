// Cache for memoized results
const memoCache = new Map<string, string>();

// Memoization helper
function memoize<Args extends unknown[], Return>(
	fn: (...args: Args) => Return
): (...args: Args) => Return {
	return (...args: Args): Return => {
		const key = JSON.stringify(args);
		if (memoCache.has(key)) {
			return memoCache.get(key)! as Return;
		}
		const result = fn(...args);
		memoCache.set(key, result as string);
		return result;
	};
}

export const sanitizeText = memoize((text: string): string => {
	if (!text) return '';

	try {
		// First use regex to remove script tags with a do-while loop for nested cases
		let withoutScripts = text;
		let previous;
		do {
			previous = withoutScripts;
			withoutScripts = withoutScripts.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
		} while (withoutScripts !== previous);

		// Then use DOM parsing for additional security
		const div = document.createElement('div');
		div.innerHTML = withoutScripts;

		// Remove any remaining script tags and their content
		const scripts = div.getElementsByTagName('script');
		while (scripts.length > 0) {
			scripts[0].parentNode?.removeChild(scripts[0]);
		}

		// Remove style tags and their content
		const styles = div.getElementsByTagName('style');
		while (styles.length > 0) {
			styles[0].parentNode?.removeChild(styles[0]);
		}

		// Remove any elements with event handlers
		const elements = div.getElementsByTagName('*');
		for (let i = 0; i < elements.length; i++) {
			const element = elements[i];
			const attributes = element.attributes;
			for (let j = attributes.length - 1; j >= 0; j--) {
				const attr = attributes[j];
				if (attr.name.startsWith('on')) {
					element.removeAttribute(attr.name);
				}
			}
		}

		// Get the sanitized text content
		const sanitized = div.textContent || '';

		// Normalize whitespace and trim
		return sanitized
			.replace(/\s+/g, ' ')
			.trim();
	} catch (error) {
		console.error('Error sanitizing text:', error);
		// Fallback to basic sanitization if DOM parsing fails
		return text
			.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
			.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
			.replace(/<[^>]*>/g, ' ')
			.replace(/\s+/g, ' ')
			.trim();
	}
});

/**
 * Truncates a description to a maximum length, adding ellipsis if needed
 */
export const truncateDescription = memoize((text: string, maxLength: number = 280): string => {
	if (!text || text.length <= maxLength) return text;

	// Try to find a natural sentence break
	const truncated = text.slice(0, maxLength);
	const sentenceMatch = truncated.match(/(.*?[.!?])(?:\s|$)/);

	if (sentenceMatch) {
		return sentenceMatch[1] + '...';
	}

	// If no sentence break found, try to break at a word boundary
	const wordBoundary = truncated.lastIndexOf(' ');
	if (wordBoundary > maxLength * 0.8) {
		// Only break if we're keeping most of the text
		return truncated.slice(0, wordBoundary) + '...';
	}

	// If we can't find a good break point, just truncate
	return truncated + '...';
});

/**
 * Formats a date string into a more readable format
 */
export const formatDate = memoize((dateString: string): string => {
	try {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			throw new Error('Invalid date');
		}
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	} catch (error) {
		console.error('Error formatting date:', error);
		return dateString;
	}
});

// Improved paragraph extraction with better HTML handling
export const extractFirstMeaningfulParagraph = memoize((content: string): string => {
	if (!content) return '';

	// Remove HTML tags
	const text = content.replace(/<[^>]*>/g, ' ').trim();

	// Split into paragraphs and find the first non-empty one
	const paragraphs = text
		.split(/\n+/)
		.map(p => p.trim())
		.filter(p => p.length > 0);
	return paragraphs[0] || '';
});

// Clear cache periodically to prevent memory leaks
setInterval(
	() => {
		memoCache.clear();
	},
	5 * 60 * 1000
); // Clear every 5 minutes
