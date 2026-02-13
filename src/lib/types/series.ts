export interface ISeriesEntry {
	psrNumber: number;
	slug: string;
	title: string;
	summary: string;
	companionFiles: string[];
	testFiles: string[];
	prerequisites: number[];
}

export interface ISeriesGroup {
	name: string;
	entries: ISeriesEntry[];
}

export interface ISeriesCodeFile {
	path: string;
	content: string;
	language: string;
}

export interface ISeries {
	id: string;
	title: string;
	description: string;
	repoUrl: string;
	groups: ISeriesGroup[];
}
