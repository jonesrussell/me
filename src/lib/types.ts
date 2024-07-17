// src/lib/types.ts
import type { Writable } from 'svelte/store';

export interface PaneType {
	id: string;
	obj: Writable<{
		position: { x: number, y: number };
		zIndex: number;
	}>;
}
