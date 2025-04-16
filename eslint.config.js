import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import sveltePlugin from './src/lib/eslint/plugins/svelte-render.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node, ...globals.es2021 }
		},
		rules: {
			'no-undef': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		ignores: ['eslint.config.js', 'svelte.config.js'],
		languageOptions: {
			parser: sveltePlugin.parser,
			parserOptions: {
				parser: ts.parser,
				extraFileExtensions: ['.svelte'],
				svelteFeatures: {
					experimentalGenerics: true
				},
				project: ['./tsconfig.json'],
				tsconfigRootDir: process.cwd()
			}
		},
		plugins: {
			svelte: sveltePlugin
		},
		rules: {
			'svelte/no-at-html-tags': 'error',
			'svelte/no-target-blank': 'error',
			'svelte/valid-compile': 'error',
			'svelte/no-reactive-reassign': 'error',
			'svelte/render-children': 'error',
			'svelte/no-slots': 'error',
			'svelte/prefer-state': 'error',
			'svelte/prefer-derived': 'error'
		}
	}
);
