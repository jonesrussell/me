import type { KnipConfig } from 'knip';

const config: KnipConfig = {
	project: ['src/**/*.{svelte,ts}'],
	ignore: [
		'**/*.d.ts'
	],
	svelte: {
		entry: [
			'svelte.config.js',
			'vite.config.ts',
			'src/routes/**/+{page,server,page.server,error,layout,layout.server}{,@*}.{js,ts,svelte}',
			'src/hooks.{server,client}.{js,ts}',
			'src/params/*.{js,ts}'
		]
	}
};

export default config;
