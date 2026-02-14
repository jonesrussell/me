import type { ISeriesEntry } from '$lib/types/series';

const STORAGE_KEY = 'series-progress';

interface SeriesProgressType {
	completed: Record<string, string[]>;
}

export const seriesProgressState = $state<SeriesProgressType>({
	completed: {}
});

/** Load progress from localStorage. Call from $effect in a component. */
export function loadProgress(): void {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			const parsed = JSON.parse(stored);
			seriesProgressState.completed = parsed;
		}
	} catch {
		// Invalid data — start fresh
	}
}

function persist(): void {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(seriesProgressState.completed));
	} catch {
		// localStorage full or unavailable
	}
}

export function toggleCompleted(seriesId: string, slug: string): void {
	const current = seriesProgressState.completed[seriesId] ?? [];
	if (current.includes(slug)) {
		seriesProgressState.completed = {
			...seriesProgressState.completed,
			[seriesId]: current.filter((s) => s !== slug)
		};
	} else {
		seriesProgressState.completed = {
			...seriesProgressState.completed,
			[seriesId]: [...current, slug]
		};
	}
	persist();
}

export function isCompleted(seriesId: string, slug: string): boolean {
	return (seriesProgressState.completed[seriesId] ?? []).includes(slug);
}

export function completedCount(seriesId: string): number {
	return (seriesProgressState.completed[seriesId] ?? []).length;
}

export function completionPercentage(seriesId: string, total: number): number {
	if (total === 0) return 0;
	return (completedCount(seriesId) / total) * 100;
}

export function suggestedNext(
	seriesId: string,
	allEntries: ISeriesEntry[]
): ISeriesEntry | null {
	const completed = seriesProgressState.completed[seriesId] ?? [];
	return allEntries.find((e) => !completed.includes(e.slug)) ?? null;
}

/** Reset all progress (for testing). */
export function resetProgress(): void {
	seriesProgressState.completed = {};
}
