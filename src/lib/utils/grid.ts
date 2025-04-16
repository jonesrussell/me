/**
 * Grid Utilities
 *
 * Core utilities for monospace grid layouts. All measurements are in character units (ch).
 * Every value must align to the character grid to maintain perfect monospace alignment.
 */

/**
 * Options for height calculations
 */
interface HeightOptions {
	headerHeight?: number;
	padding?: number;
	gaps?: number;
	lines?: number;
	lineHeight?: number;
}

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
	return `${value}ch`;
}

/**
 * Validates character grid alignment
 */
export function validateGridUnit(value: number): void {
	if (value < 0) {
		throw new Error('Grid unit must be positive');
	}
}

/**
 * Calculates content width in character units
 */
export function calculateWidth(content: string): number {
	return Math.max(...content.split('\n').map(line => line.length));
}

/**
 * Calculates height in character units
 */
export function calculateHeight(options: HeightOptions): string {
	const {
		lines = 0,
		lineHeight = 1.7,
		headerHeight = 0,
		padding = 0,
		gaps = 0
	} = options;

	validateGridUnit(headerHeight);
	validateGridUnit(padding);
	validateGridUnit(gaps);

	const contentHeight = Math.ceil(lines * lineHeight);
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
