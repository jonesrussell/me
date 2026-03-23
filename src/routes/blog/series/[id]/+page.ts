import { base } from '$app/paths';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { fetchSeries, SERIES_JSON_URL } from '$lib/services/series-service';
import { fetchSeriesCode } from '$lib/services/series-code-service';
import { canonicalUrl } from '$lib/config/seo';
import type { SeriesCodeFile, SeriesIndex } from '$lib/types/series';

interface CodeDataType {
	sourceFiles: SeriesCodeFile[];
	testFiles: SeriesCodeFile[];
}

export const prerender = true;

/** Provide known series IDs so SvelteKit can prerender each series page. */
export async function entries() {
	const response = await globalThis.fetch(SERIES_JSON_URL, {
		headers: { Accept: 'application/json' }
	});
	if (!response.ok) return [];
	const data = (await response.json()) as SeriesIndex;
	return (data.series ?? []).map((s) => ({ id: s.id }));
}

export const load: PageLoad = async ({ params }) => {
	// Use globalThis.fetch for external URLs — SvelteKit's fetch wrapper
	// can fail during prerendering when fetching cross-origin resources.
	const series = await fetchSeries(globalThis.fetch, params.id);

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
					? fetchSeriesCode(globalThis.fetch, repoSlug, entry.companionFiles ?? [], entry.testFiles ?? [])
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
