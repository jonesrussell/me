// src/lib/windowManager.ts
import { onMount } from 'svelte';
import type { Window } from './types';

export function positionWindows(windows: Window[]): Window[] {
	onMount(() => {
		windows = windows.map((window) => ({
			...window,
			x: Math.random() * globalThis.innerWidth,
			y: Math.random() * globalThis.innerHeight
		}));
	});

	return windows;
}
