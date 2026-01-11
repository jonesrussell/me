import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: { 'no-undef': 'off' }
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: ts.parser,
				projectService: true,
				extraFileExtensions: ['.svelte'],
				svelteConfig,
				svelteFeatures: {
					runes: true
				}
			}
		},
		rules: {
			// Core Svelte rules
			'svelte/valid-compile': 'error',
			'svelte/no-dom-manipulating': 'error',
			'svelte/no-reactive-reassign': 'error',

			// Store rules
			'svelte/no-store-async': 'error',
			'svelte/require-store-callbacks-use-set-param': 'error',
			'svelte/require-store-reactive-access': 'error',
			'svelte/require-stores-init': 'error',

			// Template rules
			'svelte/no-at-html-tags': 'error',
			'svelte/no-dupe-else-if-blocks': 'error',
			'svelte/no-dynamic-slot-name': 'error',
			'svelte/no-inner-declarations': 'error',
			'svelte/no-not-function-handler': 'error',
			'svelte/no-object-in-text-mustaches': 'error',
			'svelte/no-useless-mustaches': 'error',
			'svelte/valid-each-key': 'error',

			// Style rules
			'svelte/no-dupe-style-properties': 'error',
			'svelte/no-shorthand-style-property-overrides': 'error',
			'svelte/no-unused-svelte-ignore': 'error'
		}
	},
	{
		files: ['src/lib/components/SafeHtml.svelte'],
		rules: {
			'svelte/no-at-html-tags': 'off'
		}
	}
);
