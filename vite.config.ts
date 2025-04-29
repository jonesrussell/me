import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		coverage: {
			provider: 'v8',
			exclude: [
				// Build output
				'build/**',
				// Config files
				'*.config.{js,ts}',
				// Test files
				'**/*.test.{js,ts}',
				'test/**',
				// Other files to exclude
				'scripts/**',
				'static/**',
				'.svelte-kit/**',
				'node_modules/**',
			],
			include: [
				// Only include source files
				'src/**/*.{js,ts,svelte}',
			],
			all: true,
			clean: true,
		},
		workspace: [
			{
				extends: './vite.config.ts',
				plugins: [svelteTesting()],
				test: {
					name: 'client',
					environment: 'jsdom',
					clearMocks: true,
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	},
	// Tell Vitest to use the `browser` entry points in `package.json` files, even though it's running in Node
	resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined
});
