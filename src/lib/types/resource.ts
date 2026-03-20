// Resource type definition for the resources page
export interface Resource {
	title: string;
	url: string;
	category: string;
	tags: string[];
	description: string;
	dailyDriver?: boolean;
	video?: string;
}
