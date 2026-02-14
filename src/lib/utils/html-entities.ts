const entityMap: Record<string, string> = {
	'&amp;': '&',
	'&lt;': '<',
	'&gt;': '>',
	'&quot;': '"',
	'&#39;': "'",
	'&apos;': "'",
	'&rsquo;': '\u2019',
	'&lsquo;': '\u2018',
	'&rdquo;': '\u201D',
	'&ldquo;': '\u201C',
	'&mdash;': '\u2014',
	'&ndash;': '\u2013',
	'&hellip;': '\u2026',
	'&middot;': '\u00B7',
	'&nbsp;': ' '
};

export function decodeEntities(text: string): string {
	return text.replace(/&[a-z#0-9]+;/gi, (match) => entityMap[match] ?? match);
}
