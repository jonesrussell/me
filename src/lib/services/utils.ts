import { memoize } from './utils/helpers';

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
				return input; // Return original string for invalid dates
			}

			return utcDate.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				timeZone: 'UTC'
			});
		} catch {
			return input; // Return original string on any error
		}
	})(dateString);
};
