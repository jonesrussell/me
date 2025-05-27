export interface Video {
	title: string;
	description: string;
	tags: string[];
	url: string;
	embedId: string;
	date: string;
}

export interface YouTubeChannel {
	name: string;
	url: string;
	description: string;
	featuredVideos: Video[];
}
