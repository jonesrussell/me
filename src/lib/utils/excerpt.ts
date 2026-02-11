/**
 * Strip HTML and produce a plain-text excerpt trimmed to a word boundary.
 * Collapses whitespace and limits length for meta descriptions.
 *
 * @param html - HTML string (e.g. blog post content)
 * @param maxLength - Maximum character count (default 160)
 * @returns Plain text excerpt
 */
export function stripHtmlExcerpt(html: string, maxLength: number = 160): string {
	const stripped = html
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	if (stripped.length <= maxLength) return stripped;
	const cut = stripped.slice(0, maxLength);
	const lastSpace = cut.lastIndexOf(' ');
	return lastSpace > maxLength * 0.5 ? cut.slice(0, lastSpace).trim() : cut.trim();
}
