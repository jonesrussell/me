import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Set base path for GitHub Pages only
		paths: {
			base: process.env.BASE_PATH || ''
		},
		adapter: adapter({
			fallback: '404.html',
			strict: false
		}),
		prerender: {
			// Process multiple pages simultaneously for better performance
			concurrency: 4,
			// Handle HTTP errors during prerendering
			handleHttpError: ({ message, path }) => {
				// Ignore errors for pages with actions
				if (message.includes('Cannot prerender pages with actions')) {
					console.warn(`Skipping prerender for ${path} - contains form actions`);
					return;
				}
				// Ignore 404s for dynamic routes
				if (message.includes('404')) {
					console.warn(`Skipping prerender for ${path} - not found`);
					return;
				}
				// Throw other errors
				throw new Error(message);
			},
			// Handle missing IDs in hash links
			handleMissingId: 'warn',
			// Handle entry generator mismatches
			handleEntryGeneratorMismatch: 'warn',
			// Set origin for prerendering
			origin: 'https://jonesrussell.github.io'
		}
	}
};

export default config;
