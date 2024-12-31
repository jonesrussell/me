import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		ignores: ['build/**', '.svelte-kit/**', 'node_modules/**']
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},
			parser: svelte.parser,
			parserOptions: {
				parser: ts.parser,
				project: ['./tsconfig.json'],
				extraFileExtensions: ['.svelte'],
				jsx: true,
				jsxPragma: null,
				jsxFragmentName: null
			}
		},
		rules: {
			'svelte/valid-compile': ['error', { runes: true }],
			'no-unused-vars': ['error', { varsIgnorePattern: '^\\$' }]
		}
	},
	{
		files: ['*.js', '*.ts'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	}
];
