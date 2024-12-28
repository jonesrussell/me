// src/stores.ts
import { writable } from 'svelte/store';

// Initialize theme from localStorage or default to false (light)
const storedTheme =
	typeof window !== 'undefined'
		? localStorage.getItem('theme') === 'dark'
		: false;
export const theme = writable<boolean>(storedTheme);

// Subscribe to theme changes and update localStorage
if (typeof window !== 'undefined') {
	theme.subscribe((value) =>
		localStorage.setItem('theme', value ? 'dark' : 'light')
	);
}
