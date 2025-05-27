/**
 * Grid Utilities
 *
 * Core utilities for monospace grid layouts. All measurements are in character units (ch).
 * Every value must align to the character grid to maintain perfect monospace alignment.
 */

/**
 * Calculates content width in character units
 */
export function calculateWidth(content: string): number {
	return Math.max(...content.split('\n').map(line => line.length));
}

/**
 * Gets responsive value based on viewport
 */
export function getResponsiveValue(mobile: number, desktop: number): number {
	if (typeof window === 'undefined') return mobile;
	return window.innerWidth < 640 ? mobile : desktop;
}
