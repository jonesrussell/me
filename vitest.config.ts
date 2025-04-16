import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

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
	resolve: {
		alias: {
			$lib: fileURLToPath(new URL('./src/lib', import.meta.url)),
			$app: fileURLToPath(new URL('./node_modules/@sveltejs/kit/src/runtime/app', import.meta.url)),
			__sveltekit: fileURLToPath(new URL('./node_modules/@sveltejs/kit/src/runtime', import.meta.url))
		},
		conditions: ['browser']
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts,svelte}'],
		environment: 'jsdom',
		setupFiles: ['src/test/setup.ts'],
		globals: true,
		css: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			include: ['src/**/*.{ts,svelte}'],
			exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts']
		},
		deps: {
			optimizer: {
				web: {
					include: ['@sveltejs/kit']
				}
			}
		}
	}
});
