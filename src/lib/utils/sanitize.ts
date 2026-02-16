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
		'*': ['class', 'style']
	},
	allowedStyles: {
		'*': {
			'color': ['#000000', '#ffffff', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)'],
			'text-align': ['left', 'right', 'center'],
			'font-size': ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px', '64px']
		}
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
