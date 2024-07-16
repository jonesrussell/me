// src/lib/types.ts
import type { Writable } from 'svelte/store';
import type PaneSignupNews from '../routes/sections/PaneSignupNews.svelte';
import type PaneBlog from '../routes/sections/PaneBlog.svelte';

export type Pane = {
	component: typeof PaneSignupNews | typeof PaneBlog;
	x: Writable<number>;
	y: Writable<number>;
	width: Writable<number>;
	height: Writable<number>;
};
