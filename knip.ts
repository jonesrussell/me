import type { KnipConfig } from 'knip';

const config: KnipConfig = {
	project: ['src/**/*.{svelte,ts}'],
	ignore: [
		'**/*.d.ts',
		'$app/**',
		'$lib/**',
		'$env/**',
		'$service-worker',
		'@sveltejs/kit/**'
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
		'@sveltejs/kit',
		'@sveltejs/adapter-auto',
		'@sveltejs/vite-plugin-svelte'
	]
};

export default config;
