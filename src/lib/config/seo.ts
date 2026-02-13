/**
 * SEO and canonical URL configuration.
 * Use $app/paths.base at runtime for the base path.
 */

/** Public site origin (no trailing slash). */
const SITE_ORIGIN = 'https://jonesrussell.github.io';

/**
 * Build an absolute canonical URL for a path.
 * @param base - Base path from $app/paths.base (e.g. '' or '/me')
 * @param path - Path segment (e.g. '/blog' or '/blog/my-post')
 */
export function canonicalUrl(base: string, path: string): string {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	const baseNorm = base.endsWith('/') ? base.slice(0, -1) : base;
	return `${SITE_ORIGIN}${baseNorm}${normalizedPath}`;
}
