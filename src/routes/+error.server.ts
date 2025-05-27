export function handleError({ error }: { error: Error }) {
	console.error('Server error:', error);

	return {
		message: error.message,
		code: error.name,
		stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
	};
}
