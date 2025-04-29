import { memoize, normalizeSpaces, removeUnwantedTags } from './utils/helpers';

/**
 * Sanitizes text by removing HTML tags and normalizing spaces
 */
export const sanitizeText = memoize((text: string): string => {
	if (!text) return '';

	try {
		console.log('Input:', text);
		// First remove unwanted tags
		const withoutUnwantedTags = removeUnwantedTags(text);
		// Then normalize spaces
		const result = normalizeSpaces(withoutUnwantedTags);
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

/**
 * Extracts the first meaningful paragraph from HTML content
 */
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
