import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage before importing the store
const mockStorage: Record<string, string> = {};
vi.stubGlobal('localStorage', {
	getItem: vi.fn((key: string) => mockStorage[key] ?? null),
	setItem: vi.fn((key: string, value: string) => {
		mockStorage[key] = value;
	}),
	removeItem: vi.fn((key: string) => {
		delete mockStorage[key];
	})
});

import {
	seriesProgressState,
	toggleCompleted,
	isCompleted,
	completedCount,
	completionPercentage,
	suggestedNext,
	resetProgress
} from './series-progress.svelte';
import { getAllEntries } from '$lib/data/series/psr';

describe('series-progress store', () => {
	beforeEach(() => {
		Object.keys(mockStorage).forEach((k) => delete mockStorage[k]);
		vi.clearAllMocks();
		resetProgress();
	});

	it('should start with no completed entries', () => {
		expect(seriesProgressState.completed).toEqual({});
	});

	it('should toggle a post as completed', () => {
		toggleCompleted('psr', 'psr-1-basic-coding-standard-in-php');
		expect(isCompleted('psr', 'psr-1-basic-coding-standard-in-php')).toBe(true);
	});

	it('should toggle a completed post back to incomplete', () => {
		toggleCompleted('psr', 'psr-1-basic-coding-standard-in-php');
		toggleCompleted('psr', 'psr-1-basic-coding-standard-in-php');
		expect(isCompleted('psr', 'psr-1-basic-coding-standard-in-php')).toBe(false);
	});

	it('should count completed entries', () => {
		toggleCompleted('psr', 'psr-1-basic-coding-standard-in-php');
		toggleCompleted('psr', 'psr-12-extended-coding-style-guide-in-php');
		expect(completedCount('psr')).toBe(2);
	});

	it('should calculate completion percentage', () => {
		toggleCompleted('psr', 'psr-1-basic-coding-standard-in-php');
		// 1 of 14 = ~7.14%
		expect(completionPercentage('psr', 14)).toBeCloseTo(7.14, 0);
	});

	it('should return the suggested next entry', () => {
		const allEntries = getAllEntries();
		const next = suggestedNext('psr', allEntries);
		expect(next?.slug).toBe(allEntries[0].slug);
	});

	it('should skip completed entries for suggested next', () => {
		const allEntries = getAllEntries();
		toggleCompleted('psr', allEntries[0].slug);
		const next = suggestedNext('psr', allEntries);
		expect(next?.slug).toBe(allEntries[1].slug);
	});

	it('should persist to localStorage on toggle', () => {
		toggleCompleted('psr', 'psr-1-basic-coding-standard-in-php');
		expect(localStorage.setItem).toHaveBeenCalledWith('series-progress', expect.any(String));
	});
});
