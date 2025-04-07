// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		type ThemeMode = 'auto' | 'light' | 'dark';

		interface EnhancedImage {
			sources: {
				'image/webp': string;
				'image/jpeg': string;
			};
			img: {
				src: string;
				width: number;
				height: number;
				alt: string;
			};
		}

		interface TreeNode {
			name: string;
			url?: string;
			description?: string;
			children?: TreeNode[];
		}
	}
}

declare module '$app/state' {
	import { Readable } from 'svelte/store';
	import { Page } from '@sveltejs/kit';

	export const page: Readable<Page>;
	export const navigating: Readable<boolean>;
	export const updated: Readable<boolean>;
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

declare module '*.jpeg?enhanced' {
	const value: App.EnhancedImage;
	export default value;
}

declare module '*.jpg?enhanced' {
	const value: App.EnhancedImage;
	export default value;
}

declare module '*.png?enhanced' {
	const value: App.EnhancedImage;
	export default value;
}

declare module '*.gif?enhanced' {
	const value: App.EnhancedImage;
	export default value;
}

declare module '*.webp?enhanced' {
	const value: App.EnhancedImage;
	export default value;
}

declare module '*.svg?enhanced' {
	const value: App.EnhancedImage;
	export default value;
}

export {};
