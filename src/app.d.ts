// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface PageState {
			theme: 'light' | 'dark';
			sidebarOpen: boolean;
		}
		// interface Platform {}
		type ThemeMode = 'auto' | 'light' | 'dark';

		interface TreeNode {
			name: string;
			url?: string;
			description?: string;
			children?: TreeNode[];
		}
	}

	interface Window {
		// Add any global window properties here
		__theme: 'light' | 'dark';
		__setTheme: (theme: 'light' | 'dark') => void;
	}
}

// Enhanced image type declarations
declare module '*?enhanced' {
	const value: App.EnhancedImage;
	export default value;
}

// Specific image format declarations
declare module '*.{jpeg,jpg,png,gif,webp,svg}?enhanced' {
	const value: App.EnhancedImage;
	export default value;
}

// Specific path declarations
declare module '$lib/images/*.{jpeg,jpg,png,gif,webp,svg}?enhanced' {
	const value: App.EnhancedImage;
	export default value;
}

// Resource types
declare module '$lib/types/resource' {
	export interface TreeNode {
		name: string;
		url?: string;
		description?: string;
		children?: TreeNode[];
	}
}

// SvelteKit types
declare module '@sveltejs/kit' {
	interface Page {
		params: Record<string, string>;
		routeId: string | null;
		status: number;
		error: Error | null;
		data: Record<string, unknown>;
		url: URL;
	}
}

// Svelte 5 Component types
declare module 'svelte' {
	interface Component<
		Props extends Record<string, unknown> = Record<string, unknown>,
		Events extends Record<string, CustomEvent<unknown>> = Record<string, CustomEvent<unknown>>,
		Slots extends string = string
	> {
		(props: Props): {
			$$prop_def: Props;
			$$events_def: Events;
			$$slot_def: Slots;
		};
	}

	interface Readable<T> {
		subscribe: (run: (value: T) => void) => () => void;
	}
}

export {};
