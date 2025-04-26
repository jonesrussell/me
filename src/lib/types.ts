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

export interface Video {
	title: string;
	url: string;
	embedId: string;
	description: string;
	topics: string[];
	date: string;
}

export interface YouTubeChannel {
	name: string;
	url: string;
	description: string;
	featuredVideos: Video[];
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
