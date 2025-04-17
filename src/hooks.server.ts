import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = ({ error, event }) => {
	// Only log unexpected errors, not 404s
	if (event.route.id !== null) {
		console.error('Unexpected error:', error);
	}

	return {
		message: 'Not found',
		code: 'NOT_FOUND'
	};
};
