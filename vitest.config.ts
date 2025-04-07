import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'url';
import { mergeConfig } from 'vite';

const viteConfig = {
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
			__sveltekit: fileURLToPath(
				new URL('./node_modules/@sveltejs/kit/src/runtime', import.meta.url)
			)
		},
		conditions: process.env.VITEST ? ['browser'] : undefined
	}
};

const vitestConfig = {
	test: {
		include: ['src/**/*.{test,spec}.{js,ts,svelte}'],
		environment: 'jsdom',
		setupFiles: ['src/test/setup.ts'],
		globals: true,
		deps: {
			optimizer: {
				web: {
					include: ['^svelte', '@sveltejs/kit']
				}
			}
		},
		css: true,
		reporters: ['default'],
		pool: 'forks',
		isolate: true,
		testTimeout: 10000,
		hookTimeout: 10000,
		threads: false,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			include: ['src/**/*.{ts,svelte}'],
			exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts']
		}
	}
};

export default mergeConfig(viteConfig, vitestConfig);
