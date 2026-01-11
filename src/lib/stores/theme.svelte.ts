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

// Rune-based theme state
export const themeState = $state({
	current: 'auto' as Theme,
	get effective(): 'light' | 'dark' {
		return themeState.current === 'auto' ? getSystemTheme() : themeState.current;
	}
});

// Initialize from localStorage on browser
if (BROWSER) {
	const saved = localStorage.getItem('theme') as Theme | null;
	if (saved && ['auto', 'light', 'dark'].includes(saved)) {
		themeState.current = saved;
	}
	applyTheme(themeState.current);

	// Listen for system theme changes
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
		if (themeState.current === 'auto') {
			applyTheme('auto');
		}
	});
}

// Setter function to update theme
export function setTheme(value: Theme) {
	themeState.current = value;
	if (BROWSER) {
		localStorage.setItem('theme', value);
		applyTheme(value);
	}
}
