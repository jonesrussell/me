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
			__sveltekit: fileURLToPath(new URL('./node_modules/@sveltejs/kit/src/runtime', import.meta.url))
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
			inline: ['^svelte', '@sveltejs/kit']
		},
		css: true,
		reporters: ['verbose'],
		pool: 'forks',
		isolate: false
	}
};

export default mergeConfig(viteConfig, vitestConfig);
