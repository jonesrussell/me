import { describe, it, expect } from 'vitest';
import { sanitizeText } from './utils';

describe('sanitizeText', () => {
	it('removes all HTML tags', () => {
		expect(sanitizeText('<div>Hello</div>')).toBe('Hello');
		expect(sanitizeText('<p>Test</p>')).toBe('Test');
		expect(sanitizeText('<script>alert(1)</script>')).toBe('');
	});

	it('removes HTML attributes', () => {
		expect(sanitizeText('<a href="javascript:alert(1)">Click</a>')).toBe(
			'Click'
		);
		expect(sanitizeText('<img src="x" onerror="alert(1)">')).toBe('');
	});

	it('handles nested tags', () => {
		expect(sanitizeText('<div><p>Nested</p></div>')).toBe('Nested');
		expect(
			sanitizeText('<div><script>alert(1)</script><p>Text</p></div>')
		).toBe('Text');
	});

	it('preserves text content', () => {
		expect(sanitizeText('Plain text')).toBe('Plain text');
		expect(sanitizeText('Text with <b>HTML</b>')).toBe('Text with HTML');
	});

	it('trims whitespace', () => {
		expect(sanitizeText('  Text  ')).toBe('Text');
		expect(sanitizeText('\nText\n')).toBe('Text');
	});
});
