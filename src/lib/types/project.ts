export interface Project {
	title: string;
	description: string;
	tags: string[];
	url: string;
	status: 'active' | 'stable' | 'experimental';
	image?: string; // Optional image URL or path for thumbnail
}
