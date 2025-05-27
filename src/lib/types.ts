export interface BlogPost {
	title: string;
	link: string;
	pubDate: string;
	description: string;
	categories: string[];
	content?: string;
}

export interface Resource {
	title: string;
	url: string;
	description: string;
	category: string;
	featured?: boolean;
	stars?: number;
}

export interface Project {
	title: string;
	description: string;
	url: string;
	stars?: number;
	topics: string[];
	featured?: boolean;
}

// ... rest of the types ...
