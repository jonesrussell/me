export interface BlogPost {
	title: string;
	link: string;
	content: string;
	published: string;
	formattedDate: string;
	categories: string[];
	slug: string;
}

export interface BlogError {
	type: 'FETCH_ERROR' | 'PARSE_ERROR' | 'VALIDATION_ERROR' | 'CACHE_ERROR';
	message: string;
	details?: unknown;
	timestamp: number;
}
