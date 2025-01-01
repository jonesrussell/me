/// <reference types="vitest" />
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'url';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import type { InlineConfig } from 'vitest';

interface ViteConfig extends UserConfig {
	test: InlineConfig;
}

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
			$app: fileURLToPath(
				new URL('./node_modules/@sveltejs/kit/src/runtime/app', import.meta.url)
			)
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		setupFiles: ['src/test/setup.ts'],
		globals: true,
		deps: {
			inline: [/^svelte/]
		},
		css: true,
		mode: 'development',
		browser: {
			enabled: true,
			name: 'chrome',
			headless: true,
			provider: 'webdriverio'
		},
		reporters: ['verbose'],
		pool: 'forks',
		isolate: false
	}
} as ViteConfig);
