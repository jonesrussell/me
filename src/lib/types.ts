// src/lib/types.ts
import type { Writable } from 'svelte/store';

export type PaneType = {
	id: string;
	obj: Writable<{
		x: number;
		y: number;
	}>;
};
