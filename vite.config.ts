import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		coverage: {
			provider: 'v8',
			exclude: [
				// Build and config
				'build/**',
				'.svelte-kit/**',
				'*.config.{js,ts}',
				// Tests
				'src/test/**',
				'**/*.test.{js,ts}',
				'**/*.spec.{js,ts}',
				'tests/**',
				// Types
				'**/*.d.ts',
				'src/lib/types/**',
				// Other
				'scripts/**',
				'static/**',
				'node_modules/**',
			],
			include: [
				// Only measure these directories
				'src/lib/services/**/*.{js,ts}',
				'src/lib/utils/**/*.{js,ts}',
				'src/lib/stores/**/*.{js,ts}',
			],
			all: true,
			clean: true,
			// Skip full source reporting in terminal
			reporter: ['text-summary', 'html'],
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
