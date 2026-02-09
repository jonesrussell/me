export type ProjectType = 'platform' | 'consumer' | 'tool' | 'video';

export interface Project {
	title: string;
	description: string;
	tags: string[];
	url: string;
	status: 'active' | 'stable' | 'experimental';
	image?: string; // Optional image URL or path for thumbnail
	type?: ProjectType;
	/** Live site URL; when set, shown under the title (e.g. northcloud.biz). */
	siteUrl?: string;
}
