export interface SeriesEntry {
	title: string;
	slug: string;
	permalink: string;
	date: string;
	summary: string;
	seriesOrder: number;
	companionFiles?: string[];
	testFiles?: string[];
	prerequisites?: number[];
}

export interface SeriesGroup {
	name: string;
	entries: SeriesEntry[];
}

export interface Series {
	id: string;
	title: string;
	description: string;
	postCount: number;
	repoUrl?: string;
	groups: SeriesGroup[];
}

export interface SeriesIndex {
	series: Series[];
}

export interface SeriesCodeFile {
	path: string;
	content: string;
	language: string;
}
