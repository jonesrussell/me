/**
 * Environment configuration
 * Uses Vite's import.meta.env for environment variable access
 */

export const config = {
	/**
	 * Base URL for the form API
	 * Set VITE_GOFORMS_API_URL in your .env file to override.
	 */
	goformsApiUrl: import.meta.env.VITE_GOFORMS_API_URL ?? 'https://api.goformx.com',

	/** Browser-safe published form identifiers. These are not credentials. */
	formPublicKeys: {
		contact: import.meta.env.VITE_GOFORMS_CONTACT_PUBLIC_KEY ?? '',
		newsletter: import.meta.env.VITE_GOFORMS_NEWSLETTER_PUBLIC_KEY ?? ''
	},

	/**
	 * Whether the app is running in development mode
	 */
	isDev: import.meta.env.DEV,

	/**
	 * Whether the app is running in production mode
	 */
	isProd: import.meta.env.PROD
} as const;
