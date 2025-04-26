import sanitizeHtml from 'sanitize-html';

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
		console.log('Input:', text);

		// First pass: Remove script and style tags completely
		const noScripts = text.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, '');

		// Second pass: Handle remaining HTML with proper spacing
		const options = {
			allowedTags: [], // Do not allow any tags
			allowedAttributes: {}, // Disallow attributes
			disallowedTagsMode: 'discard' as const,
			textFilter: (text: string) => text.trim(), // Ensure trimmed content
			transformTags: {
				'*': () => ' ' // Replace tags with spaces to retain proper spacing
			}
		};

		// First sanitize to remove tags
		const sanitized = sanitizeHtml(noScripts, options);

		// Then ensure proper spacing around tag boundaries
		const result = sanitized
			.replace(/>\s*</g, '> <') // Ensure spaces between tags
			.replace(/>\s+/g, '> ') // Ensure space after closing tag
			.replace(/\s+</g, ' <') // Ensure space before opening tag
			.replace(/\s+/g, ' ') // Normalize multiple spaces
			.trim();

		console.log('Output:', result);
		return result;
	} catch (error) {
		console.error('Error sanitizing text:', error);
		return ''; // Return empty string on error
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
