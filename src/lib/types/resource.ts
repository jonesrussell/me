export interface Resource {
	title: string;
	description: string;
	url: string;
	category: string;
	stars?: number;
	featured?: boolean;
}

export interface TreeNode {
	name: string;
	description?: string;
	url?: string;
	children?: TreeNode[];
}
