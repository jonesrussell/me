import type { KnipConfig } from 'knip';

const config: KnipConfig = {
	project: ['src/**/*.{svelte,ts}'],
	ignore: [
		'**/*.d.ts',
		'src/lib/components/navigation/DesktopNav.svelte',
		'src/lib/components/navigation/MobileNav.svelte',
		'src/routes/+error.svelte',
		'src/routes/+layout.svelte'
	],
	svelte: {
		entry: [
			'svelte.config.js',
			'vite.config.ts',
			'src/routes/**/+{page,server,page.server,error,layout,layout.server}{,@*}.{js,ts,svelte}',
			'src/hooks.{server,client}.{js,ts}',
			'src/params/*.{js,ts}'
		]
	},
	ignoreDependencies: [
		'@fontsource/fira-mono',
		'@fontsource/jetbrains-mono',
		'@typescript-eslint/eslint-plugin',
		'@typescript-eslint/parser'
	],
	ignoreBinaries: ['act'],
	rules: {
		types: 'warn'
	}
};

export default config;
