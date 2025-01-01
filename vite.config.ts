/// <reference types="vitest" />
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig(async () => {
	const images = await enhancedImages();
	return {
		plugins: [images, sveltekit()],
		test: {
			...configDefaults,
			include: ['src/**/*.{test,spec}.{js,ts}'],
			environment: 'jsdom',
			setupFiles: ['src/test/setup.ts'],
			globals: true,
			deps: {
				inline: [/^svelte/]
			}
		}
	};
});
