import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		svelte({
			hot: !process.env.VITEST,
			compilerOptions: {
				dev: true,
				css: 'injected',
				runes: true
			}
		})
	],
	test: {
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts,svelte}'],
		setupFiles: ['src/test/setup.ts'],
		globals: true,
		css: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			include: ['src/**/*.{ts,svelte}'],
			exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts']
		}
	},
	resolve: process.env.VITEST
		? {
				conditions: ['browser'],
				alias: {
					$lib: fileURLToPath(new URL('./src/lib', import.meta.url)),
					$app: fileURLToPath(new URL('./node_modules/@sveltejs/kit/src/runtime/app', import.meta.url)),
					__sveltekit: fileURLToPath(
						new URL('./node_modules/@sveltejs/kit/src/runtime', import.meta.url)
					)
				}
			}
		: undefined
});
