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
			coverage: {
				provider: 'v8',
				reporter: ['text', 'html', 'lcov'],
				exclude: [
					'node_modules/**',
					'.svelte-kit/**',
					'build/**',
					'**/types/**',
					'**/*.d.ts',
					'**/*.test.ts',
					'**/*.config.ts',
					'static/**'
				]
			}
		}
	};
});
