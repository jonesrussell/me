import sanitizeHtml from 'sanitize-html';

// Default options for sanitize-html
const defaultOptions = {
	allowedTags: [
		'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
		'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
		'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'span'
	],
	allowedAttributes: {
		a: ['href', 'name', 'target'],
		img: ['src', 'alt', 'title', 'width', 'height'],
		// style omitted: parseStyleAttributes is false (PostCSS fails client-side), so we strip style attrs
		'*': ['class']
	},
	allowedClasses: {
		'*': ['*']
	},
	allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'tel'],
	allowProtocolRelative: true,
	enforceHtmlBoundary: true,
	// Disable style parsing in browser - PostCSS dependency fails client-side (sanitize-html#547)
	parseStyleAttributes: false
};

export function sanitize(dirty: string, options = {}) {
	return sanitizeHtml(dirty, {
		...defaultOptions,
		...options
	});
}
