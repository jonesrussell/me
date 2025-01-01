/**
 * Grid Utilities
 *
 * Core utilities for monospace grid layouts. All measurements are in character units (ch).
 * Every value must align to the character grid to maintain perfect monospace alignment.
 */

/**
 * Options for height calculations
 */
type HeightOptions = {
	lines: number; // Content lines
	lineHeight?: number; // Line height multiplier (default: 1.7)
	headerHeight?: number; // Header height in ch
	padding?: number; // Total padding in ch
	gaps?: number; // Additional gaps in ch
};

/**
 * Aligns a value to the character grid
 */
export function alignToGrid(value: number): number {
	return Math.round(value);
}

/**
 * Converts a value to character units
 */
export function toCharUnit(value: number): string {
	return `${alignToGrid(value)}ch`;
}

/**
 * Validates character grid alignment
 */
export function validateGridUnit(value: number): void {
	if (!Number.isInteger(value)) {
		throw new Error(`Grid values must be whole numbers, got: ${value}`);
	}
}

/**
 * Calculates content width in character units
 */
export function calculateWidth(content: string): number {
	return Math.max(...content.split('\n').map((line) => line.length));
}

/**
 * Calculates height in character units
 */
export function calculateHeight(options: HeightOptions): string {
	const {
		lines,
		lineHeight = 1.7,
		headerHeight = 0,
		padding = 0,
		gaps = 0
	} = options;

	validateGridUnit(headerHeight);
	validateGridUnit(padding);
	validateGridUnit(gaps);

	// 1. Base content height with line-height
	const contentHeight = Math.ceil(lines * lineHeight);

	// 2. Add fixed spacing
	const totalHeight = contentHeight + headerHeight + padding + gaps;

	return toCharUnit(totalHeight);
}

/**
 * Gets responsive value based on viewport
 */
export function getResponsiveValue(mobile: number, desktop: number): number {
	validateGridUnit(mobile);
	validateGridUnit(desktop);

	if (typeof window === 'undefined') return mobile;
	return window.innerWidth < 640 ? mobile : desktop;
}
