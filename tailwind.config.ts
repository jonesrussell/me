import type { Config } from 'tailwindcss';
import typographyPlugin from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				mono: ['JetBrains Mono', 'Fira Code', 'IBM Plex Mono', 'monospace']
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
						}
					}
				}
			}
		}
	},

	plugins: [typographyPlugin]
} as Config;
