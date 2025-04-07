declare module '$app/state' {
	export const page: {
		url: URL;
	};
}

declare module '$app/paths' {
	export const base: string;
	export const assets: string;
}

declare module '$app/stores' {
	import { Readable } from 'svelte/store';
	import { Page } from '@sveltejs/kit';

	export const page: Readable<Page>;
	export const navigating: Readable<boolean>;
	export const updated: Readable<boolean>;
}
