import type { SeriesIndex, Series } from '$lib/types/series';

const SERIES_JSON_URL = 'https://jonesrussell.github.io/blog/series/index.json';

function validateSeriesIndex(data: unknown): data is SeriesIndex {
	if (!data || typeof data !== 'object') return false;
	const obj = data as Record<string, unknown>;
	if (!Array.isArray(obj.series)) return false;
	return obj.series.every(
		(s: unknown) =>
			s &&
			typeof s === 'object' &&
			typeof (s as Record<string, unknown>).id === 'string' &&
			typeof (s as Record<string, unknown>).title === 'string' &&
			Array.isArray((s as Record<string, unknown>).groups)
	);
}

export async function fetchSeriesIndex(fetchFn: typeof fetch): Promise<SeriesIndex> {
	const response = await fetchFn(SERIES_JSON_URL, {
		headers: { Accept: 'application/json' }
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();

	if (!validateSeriesIndex(data)) {
		throw new Error('Invalid series data: missing required fields');
	}

	return data;
}

export async function fetchSeries(
	fetchFn: typeof fetch,
	id: string
): Promise<Series | null> {
	const index = await fetchSeriesIndex(fetchFn);
	return index.series.find((s) => s.id === id) ?? null;
}
