/// <reference types="vitest" />
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// CSS transformation plugin
const cssTransform = {
	name: 'css-transform',
	enforce: 'post' as const,
	transform(code: string, id: string) {
		if (!id.endsWith('.css') && !id.endsWith('.svelte')) return;

		// Replace units with ch
		code = code.replace(/(\d+)px/g, match => `calc(${match.slice(0, -2)} * var(--ch) / 16)`);
		code = code.replace(/(\d*\.?\d+)em/g, match => `calc(${match.slice(0, -2)} * var(--ch))`);

		// Replace colors with variables
		const colors: Record<string, string> = {
			'#fff': '--text-color',
			'#000': '--bg-color',
			'#22c55e': '--color-success',
			'#ef4444': '--color-error',
			'#3b82f6': '--color-info',
			'#eab308': '--color-warning'
		};

		code = code.replace(/#[0-9a-fA-F]{3,6}/g, match => {
			const color = colors[match.toLowerCase()];
			return color ? `var(${color})` : match;
		});

		// Replace line heights
		const lineHeights: Record<string, string> = {
			'1.2': '--line-height-tight',
			'1.5': '--line-height-base',
			'1.7': '--line-height-relaxed'
		};

		code = code.replace(/line-height:\s*([\d.]+)/g, (_, num) => {
			const height = lineHeights[num];
			return height ? `line-height: var(${height})` : `line-height: ${num}`;
		});

		return { code, map: null };
	}
};

export default defineConfig({
	plugins: [sveltekit(), cssTransform],
	build: {
		cssMinify: true,
		cssCodeSplit: true
	}
});
