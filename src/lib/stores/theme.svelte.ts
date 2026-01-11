import { BROWSER } from 'esm-env';
import { writable } from 'svelte/store';

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

// Shared state holder
const state = {
	current: 'auto' as Theme
};

function createThemeState() {
	// Initialize from localStorage on browser
	if (BROWSER) {
		const saved = localStorage.getItem('theme') as Theme | null;
		if (saved && ['auto', 'light', 'dark'].includes(saved)) {
			state.current = saved;
		}
		applyTheme(state.current);

		// Listen for system theme changes
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			if (state.current === 'auto') {
				applyTheme('auto');
			}
		});
	}

	return {
		get current() {
			return state.current;
		},
		get effective(): 'light' | 'dark' {
			return state.current === 'auto' ? getSystemTheme() : state.current;
		},
		set(value: Theme) {
			state.current = value;
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
