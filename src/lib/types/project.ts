export type ProjectType = 'platform' | 'consumer' | 'tool' | 'video';

export interface Project {
	title: string;
	description: string;
	tags: string[];
	url: string;
	status: 'active' | 'stable' | 'experimental' | 'development';
	/** Main image path (relative to site root). Prefer WebP for performance. */
	image?: string;
	/** Responsive image candidates for srcset (path + width in px). Used with image for modern responsive loading. */
	imageSrcset?: { path: string; width: number }[];
	/** Sizes attribute for responsive image (e.g. "(max-width: 30rem) 100vw, 40cqi"). */
	imageSizes?: string;
	type?: ProjectType;
	/** Live site URL; when set, shown under the title (e.g. northcloud.biz). */
	siteUrl?: string;
	/** Public GitHub repo URL; when set, shown as a GitHub link. */
	githubUrl?: string;
}
