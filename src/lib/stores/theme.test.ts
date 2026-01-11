import { describe, it, expect, beforeEach } from 'vitest';
import { themeState, setTheme } from './theme.svelte';

describe('theme store', () => {
	beforeEach(() => {
		// Reset to default
		themeState.current = 'auto';
		localStorage.clear();
	});

	it('initializes with auto theme', () => {
		expect(themeState.current).toBe('auto');
	});

	it('sets theme correctly', () => {
		setTheme('dark');
		expect(themeState.current).toBe('dark');
	});

	it('returns effective theme', () => {
		setTheme('light');
		expect(themeState.effective).toBe('light');

		setTheme('dark');
		expect(themeState.effective).toBe('dark');
	});
});
