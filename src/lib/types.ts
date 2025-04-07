// src/lib/types.ts

export interface EnhancedImage {
	src: string;
	width: number;
	height: number;
	format: string;
	blurDataURL?: string;
	blurWidth?: number;
	blurHeight?: number;
	placeholder?: string;
	fallback?: string;
	aspectRatio?: number;
	loading?: 'eager' | 'lazy';
	decoding?: 'sync' | 'async' | 'auto';
}

export interface Video {
	title: string;
	description: string;
	topics: string[];
	url: string;
	embedId: string;
	date: string;
}

export interface Project {
	title: string;
	description: string;
	tech: string[];
	url: string;
	status: 'active' | 'stable' | 'experimental';
}

export interface Resource {
	title: string;
	description: string;
	url: string;
	category: string;
	stars?: number;
	featured?: boolean;
}

export interface YouTubeChannel {
	name: string;
	url: string;
	description: string;
	featuredVideos: Video[];
}
