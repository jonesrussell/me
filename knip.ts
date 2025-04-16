import type { KnipConfig } from 'knip';

const config: KnipConfig = {
	entry: ['src/routes/**/*.{svelte,ts}'],
	project: ['src/**/*.{svelte,ts}'],
	ignore: ['**/*.d.ts'],
	ignoreDependencies: ['@sveltejs/kit'],
	svelte: {
		ignoreDependencies: ['@sveltejs/kit']
	},
	ignoreExportsUsedInFile: true,
	ignoreBinaries: ['act'],
	ignoreUnusedDependencies: [
		'@fontsource/jetbrains-mono',
		'@fontsource/fira-mono',
		'@neoconfetti/svelte'
	],
	ignoreUnusedDevDependencies: [
		'@fontsource/fira-mono',
		'@neoconfetti/svelte'
	],
	ignoreUnusedExports: [
		'$app/paths',
		'$app/state',
		'$app/stores'
	]
};

export default config;
