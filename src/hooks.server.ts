import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = ({ error, event }) => {
	// Only log unexpected errors, not 404s
	if (event.route.id !== null) {
		console.error('Server error:', error);
	}

	// Type guard for Error objects
	if (error instanceof Error) {
		return {
			message: error.message,
			code: error.name,
			stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
		};
	}

	// Fallback for unknown error types
	return {
		message: 'An unexpected error occurred',
		code: 'UNKNOWN_ERROR'
	};
};
