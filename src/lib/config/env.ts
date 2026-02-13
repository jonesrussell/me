/**
 * Environment configuration
 * Uses Vite's import.meta.env for environment variable access
 */

export const config = {
	/**
	 * Base URL for the form API
	 * Set VITE_GOFORMS_API_URL in your .env file to override
	 */
	goformsApiUrl: import.meta.env.VITE_GOFORMS_API_URL ?? 'http://localhost:8090',

	/**
	 * API key for goforms API
	 * Set VITE_GOFORMS_API_KEY in your .env file
	 */
	goformsApiKey: import.meta.env.VITE_GOFORMS_API_KEY ?? '',

	/**
	 * Form IDs
	 */
	formIds: {
		contact: import.meta.env.VITE_GOFORMS_CONTACT_FORM_ID ?? '',
		newsletter: import.meta.env.VITE_GOFORMS_NEWSLETTER_FORM_ID ?? ''
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

