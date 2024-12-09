import type { Config } from 'tailwindcss';
import typographyPlugin from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				mono: [
					'Courier New',
					'JetBrains Mono',
					'IBM Plex Mono',
					'SFMono-Regular',
					'Menlo',
					'monospace'
				]
			},
			letterSpacing: {
				'mono': '0em'
			},
			spacing: {
				'ch': '1ch',
				'ch2': '2ch',
				'ch4': '4ch',
				'ch8': '8ch'
			},
			typography: {
				DEFAULT: {
					css: {
						fontFamily: 'var(--font-mono)',
						'code::before': {
							content: '""'
						},
						'code::after': {
							content: '""'
						},
						pre: {
							padding: '2ch',
							marginTop: '2ch',
							marginBottom: '2ch'
						}
					}
				}
			}
		}
	},

	plugins: [typographyPlugin]
} as Config;
