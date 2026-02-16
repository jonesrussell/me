import type { PageLoad } from './$types';
import { fetchNorthCloudFeed } from '$lib/services/northcloud-service';

export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
	const feedLimit = 3;

	const [crimeArticles, miningArticles, entertainmentArticles] = await Promise.all([
		fetchNorthCloudFeed(fetch, 'crime', feedLimit).catch(() => []),
		fetchNorthCloudFeed(fetch, 'mining', feedLimit).catch(() => []),
		fetchNorthCloudFeed(fetch, 'entertainment', feedLimit).catch(() => [])
	]);

	return {
		crimeArticles,
		miningArticles,
		entertainmentArticles
	};
};
