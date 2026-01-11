import { BROWSER } from 'esm-env';

export type Theme = 'auto' | 'light' | 'dark';

function getSystemTheme(): 'light' | 'dark' {
	if (!BROWSER) return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
	if (!BROWSER) return;
	const effectiveTheme = theme === 'auto' ? getSystemTheme() : theme;
	document.documentElement.setAttribute('data-theme', effectiveTheme);
}

function createThemeState() {
	let current = $state<Theme>('auto');

	// Initialize from localStorage on browser
	if (BROWSER) {
		const saved = localStorage.getItem('theme') as Theme | null;
		if (saved && ['auto', 'light', 'dark'].includes(saved)) {
			current = saved;
		}
		applyTheme(current);

		// Listen for system theme changes
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			if (current === 'auto') {
				applyTheme('auto');
			}
		});
	}

	return {
		get current() {
			return current;
		},
		get effective(): 'light' | 'dark' {
			return current === 'auto' ? getSystemTheme() : current;
		},
		set(value: Theme) {
			current = value;
			if (BROWSER) {
				localStorage.setItem('theme', value);
				applyTheme(value);
			}
		}
	};
}

export const themeState = createThemeState();

// Legacy store-compatible API for gradual migration
// Components can use $theme syntax with this
import { writable } from 'svelte/store';

function createLegacyThemeStore() {
	const { subscribe, set: internalSet } = writable<Theme>(themeState.current);

	return {
		subscribe,
		set: (value: Theme) => {
			internalSet(value);
			themeState.set(value);
		}
	};
}

export const theme = createLegacyThemeStore();
