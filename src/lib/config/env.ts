/**
 * Environment configuration
 * Uses Vite's import.meta.env for environment variable access
 */

export const config = {
	/**
	 * Base URL for the form API
	 * Set VITE_FORM_API_URL in your .env file to override
	 */
	formApiUrl: import.meta.env.VITE_FORM_API_URL ?? 'http://localhost:8090',

	/**
	 * Whether the app is running in development mode
	 */
	isDev: import.meta.env.DEV,

	/**
	 * Whether the app is running in production mode
	 */
	isProd: import.meta.env.PROD
} as const;

export type Config = typeof config;
