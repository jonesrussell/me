/**
 * Types for North Cloud pipeline feed (public, no-auth feed consumed at build time).
 */

export interface NorthCloudArticle {
	id: string;
	title: string;
	url: string;
	snippet: string;
	published: Date;
	topics: string[];
	source: string;
}

export interface NorthCloudFeedResponse {
	generated_at: string;
	articles: Array<{
		id: string;
		title: string;
		slug?: string;
		url: string;
		snippet: string;
		published_at: string;
		topics?: string[];
		source?: string;
	}>;
}
