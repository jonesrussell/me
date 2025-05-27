// Resource type definition for the resources page
export interface Resource {
	title: string;
	description: string;
	url: string;
	category: string;
	stars?: number;
	featured?: boolean;
	tags?: string[]; // Optional array of tags for categorizing resources
}
