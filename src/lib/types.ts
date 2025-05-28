export type { Resource } from './types/resource';

export interface Project {
	title: string;
	description: string;
	url: string;
	stars?: number;
	topics: string[];
	featured?: boolean;
}
