export interface BlogPost {
	title: string;
	link: string;
	pubDate: string;
	description: string;
	content?: string;
	categories: string[];
}

export interface BlogError {
	type: 'FETCH_ERROR' | 'PARSE_ERROR' | 'VALIDATION_ERROR' | 'CACHE_ERROR';
	message: string;
	details?: unknown;
	timestamp: number;
}
