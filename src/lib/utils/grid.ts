/**
 * Calculate exact height in character units based on content
 */
export function calculateCharacterHeight(
	content: string,
	options = {
		headerHeight: 3, // Default terminal header height
		padding: 2, // Default padding (top + bottom)
		extraLines: 0 // Additional lines for prompts, spacing etc
	}
) {
	// Count actual lines in content
	const lines = content.split('\n').length + options.extraLines;

	// Add header and padding
	return lines + options.headerHeight + options.padding;
}

/**
 * Calculate width in character units based on longest line
 */
export function calculateCharacterWidth(content: string) {
	return Math.max(...content.split('\n').map((line) => line.length));
}

/**
 * Ensure a value aligns to the character grid
 */
export function alignToGrid(value: number) {
	return Math.ceil(value);
}

export function getResponsiveValue(mobile: number, desktop: number): number {
	if (typeof window === 'undefined') return mobile; // Default to mobile for SSR
	return window.innerWidth < 640 ? mobile : desktop;
}

export function getGridWidth(width: number): string {
	return `${Math.floor(width * 100) / 100}px`;
}

/**
 * Calculate exact monospace height accounting for line-height and spacing
 */
export function calculateMonospaceHeight(options: {
	lines: number; // Number of content lines
	lineHeight?: number; // Line height multiplier (default: 1.7)
	headerHeight?: number; // Height of header in ch units
	padding?: number; // Total padding in ch units
	extraGaps?: number; // Additional gaps between elements
}) {
	const {
		lines,
		lineHeight = 1.7,
		headerHeight = 0,
		padding = 0,
		extraGaps = 0
	} = options;

	// Calculate base content height with line-height
	const contentHeight = Math.ceil(lines * lineHeight);

	// Add header, padding, and any extra gaps
	const totalHeight = contentHeight + headerHeight + padding + extraGaps;

	return `${totalHeight}ch`;
}
