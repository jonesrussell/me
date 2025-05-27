import type { PageLoad } from './$types';

interface ErrorParams {
	status?: string;
	message?: string;
}

export const load: PageLoad = ({ params }) => {
	const errorParams = params as unknown as ErrorParams;
	const status = Number(errorParams.status) || 500;
	const message = errorParams.message || 'Something went wrong';

	return {
		status,
		message,
		title: `Error ${status}`,
		description: message
	};
};
