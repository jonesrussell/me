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
 * Formats a date string into a more readable format
 */
export const formatDate = (dateString: string | null | undefined): string | null | undefined => {
	// Handle edge cases before memoization
	if (dateString === null) return null;
	if (dateString === undefined) return undefined;
	if (!dateString) return dateString;

	// Memoize the actual date formatting
	return memoize((input: string): string => {
		try {
			const date = new Date(input);
			// Ensure we're using UTC to avoid timezone issues
			const utcDate = new Date(
				Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
			);

			if (isNaN(utcDate.getTime())) {
				throw new Error('Invalid date');
			}

			return utcDate.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				timeZone: 'UTC'
			});
		} catch (error) {
			console.error('Error formatting date:', error);
			return input;
		}
	})(dateString);
};
