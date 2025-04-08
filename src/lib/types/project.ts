export interface Project {
	title: string;
	description: string;
	tech: string[];
	url: string;
	status: 'active' | 'stable' | 'experimental';
}
