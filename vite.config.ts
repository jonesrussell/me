/// <reference types="vitest" />
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [enhancedImages(), sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts,svelte}'],
		globals: true,
		environment: 'jsdom',
		setupFiles: ['src/test/setup.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: ['node_modules', 'src/test']
		},
		// Add browser environment settings
		browser: {
			enabled: true,
			name: 'chrome',
			provider: 'playwright',
			headless: true
		}
	}
});
