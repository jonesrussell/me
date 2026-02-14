import { base } from '$app/paths';
import type { PageLoad } from './$types';
import { psrSeries, getAllEntries } from '$lib/data/series/psr';
import { fetchSeriesCode } from '$lib/services/series-code-service';
import { canonicalUrl } from '$lib/config/seo';
import type { ISeriesCodeFile } from '$lib/types/series';

interface CodeDataType {
	sourceFiles: ISeriesCodeFile[];
	testFiles: ISeriesCodeFile[];
}

export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
	const allEntries = getAllEntries();

	// Fetch code for all entries at build time (parallel)
	const repoSlug = psrSeries.repoUrl.replace('https://github.com/', '');
	const codeResults = await Promise.all(
		allEntries.map((entry) =>
			fetchSeriesCode(fetch, repoSlug, entry.companionFiles, entry.testFiles)
		)
	);

	// Build a map of slug -> code data
	const codeDataMap: Record<string, CodeDataType> = {};
	allEntries.forEach((entry, i) => {
		codeDataMap[entry.slug] = codeResults[i];
	});

	return {
		series: psrSeries,
		codeDataMap,
		canonical: canonicalUrl(base, '/blog/series/psr')
	};
};
