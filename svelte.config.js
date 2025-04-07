import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$lib: './src/lib',
			$test: './src/test'
		}
	},
	onwarn: (warning, handler) => {
		// Suppress warnings about slots in Svelte 5
		if (warning.code === 'a11y-no-noninteractive-element-interactions') return;
		if (warning.code === 'a11y-click-events-have-key-events') return;
		handler(warning);
	}
};

export default config;
