import type { KnipConfig } from 'knip';

const config: KnipConfig = {
	entry: ['src/routes/**/*.{svelte,ts}'],
	project: ['src/**/*.{svelte,ts}'],
	ignore: [
		'**/*.d.ts',
		'$app/paths',
		'$app/state',
		'$app/stores'
	],
	ignoreDependencies: [
		'@sveltejs/kit',
		'@fontsource/jetbrains-mono',
		'@fontsource/fira-mono',
		'@neoconfetti/svelte'
	],
	svelte: {
		config: ['svelte.config.js']
	},
	ignoreExportsUsedInFile: true,
	ignoreBinaries: ['act']
};

export default config;
