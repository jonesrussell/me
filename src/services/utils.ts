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
	return text.replace(/<[^>]*>/g, '').trim();
});

export const truncateDescription = memoize(
	(text: string, maxLength: number = 280): string => {
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
	}
);

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
export const extractFirstMeaningfulParagraph = memoize(
	(content: string): string => {
		// Handle nested paragraphs and malformed HTML
		const paragraphs = content.match(/<p[^>]*>(.*?)<\/p>/g) || [];

		// Find the first non-greeting paragraph
		for (const paragraph of paragraphs) {
			const text = sanitizeText(paragraph.replace(/<p[^>]*>|<\/p>/g, ''));
			if (
				!text.match(
					/^(Ahnii!|Hello|Hi|Hey|Greetings|Welcome|Thanks|Thank you)/i
				)
			) {
				return text;
			}
		}

		// If no suitable paragraph found, use the first paragraph
		if (paragraphs.length > 0) {
			const firstParagraph = paragraphs[0];
			if (firstParagraph) {
				return sanitizeText(firstParagraph.replace(/<p[^>]*>|<\/p>/g, ''));
			}
		}

		// If no paragraphs found, return empty string
		return '';
	}
);

// Clear cache periodically to prevent memory leaks
setInterval(
	() => {
		memoCache.clear();
	},
	5 * 60 * 1000
); // Clear every 5 minutes
