import { base } from '$app/paths';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { fetchSeries } from '$lib/services/series-service';
import { fetchSeriesCode } from '$lib/services/series-code-service';
import { canonicalUrl } from '$lib/config/seo';
import type { SeriesCodeFile } from '$lib/types/series';

interface CodeDataType {
	sourceFiles: SeriesCodeFile[];
	testFiles: SeriesCodeFile[];
}

export const prerender = false;

export const load: PageLoad = async ({ fetch, params }) => {
	const series = await fetchSeries(fetch, params.id);

	if (!series) {
		error(404, { message: `Series "${params.id}" not found` });
	}

	const allEntries = series.groups.flatMap((g) => g.entries);

	// Fetch companion code if series has a repo
	const codeDataMap: Record<string, CodeDataType> = {};
	if (series.repoUrl) {
		const repoSlug = series.repoUrl.replace('https://github.com/', '');
		const codeResults = await Promise.all(
			allEntries.map((entry) =>
				entry.companionFiles?.length || entry.testFiles?.length
					? fetchSeriesCode(fetch, repoSlug, entry.companionFiles ?? [], entry.testFiles ?? [])
					: Promise.resolve({ sourceFiles: [], testFiles: [] })
			)
		);

		allEntries.forEach((entry, i) => {
			codeDataMap[entry.slug] = codeResults[i];
		});
	}

	return {
		series,
		codeDataMap,
		canonical: canonicalUrl(base, `/blog/series/${params.id}`)
	};
};
