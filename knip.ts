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
		'eslint-plugin-svelte',
		'svelte-eslint-parser'
	],
	ignoreBinaries: ['act']
};

export default config;
