import type { PageLoad } from './$types';
import { fetchNorthCloudFeed } from '$lib/services/northcloud-service';

export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
	let northCloudArticles: Awaited<ReturnType<typeof fetchNorthCloudFeed>> = [];
	try {
		northCloudArticles = await fetchNorthCloudFeed(fetch);
	} catch {
		// Optional; continue with empty list
	}
	return {
		northCloudArticles: northCloudArticles.slice(0, 5)
	};
};
