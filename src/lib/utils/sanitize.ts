import DOMPurify from 'dompurify';

export function sanitizeHtml(html: string): string {
	return DOMPurify.sanitize(html, {
		ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'code', 'pre', 'blockquote'],
		ALLOWED_ATTR: ['href', 'target', 'rel'],
		ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|ftp|tel):|#)/i
	});
}
