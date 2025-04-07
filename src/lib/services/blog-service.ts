import { formatDate, sanitizeText, truncateDescription } from './utils';

export interface BlogPost {
	title: string;
	link: string;
	published: string;
	description: string;
}

export function formatPostDate(dateString: string): string {
	return formatDate(dateString);
}

export function sanitizePostDescription(description: string): string {
	return sanitizeText(description);
}

export function truncatePostDescription(description: string, maxLength: number = 280): string {
	return truncateDescription(description, maxLength);
}
