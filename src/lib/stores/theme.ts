import { writable } from 'svelte/store';
import { BROWSER } from 'esm-env';

export type Theme = 'auto' | 'light' | 'dark';

export function createThemeStore() {
	const { subscribe, set } = writable<Theme>('auto');

	if (BROWSER) {
		// Initialize theme
		const savedTheme = localStorage.getItem('theme') as Theme | null;
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';

		if (savedTheme) {
			set(savedTheme);
			document.documentElement.setAttribute(
				'data-theme',
				savedTheme === 'auto' ? systemTheme : savedTheme
			);
		} else {
			set('auto');
			document.documentElement.setAttribute('data-theme', systemTheme);
		}

		// Listen for system theme changes
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
			const currentTheme = localStorage.getItem('theme') as Theme | null;
			if (currentTheme === 'auto' || !currentTheme) {
				document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
			}
		});
	}

	return {
		subscribe,
		set: (theme: Theme) => {
			set(theme);
			if (BROWSER) {
				localStorage.setItem('theme', theme);
				const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light';
				document.documentElement.setAttribute('data-theme', theme === 'auto' ? systemTheme : theme);
			}
		}
	};
}

export const theme = createThemeStore();
