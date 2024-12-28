type GridUnit = number;

export function alignToGrid(value: number, gridSize: number = 2): number {
	const windowWidth =
		typeof window !== 'undefined'
			? Math.floor(window.innerWidth * 100) / 100
			: 1024;
	const minSize = Math.min(value, windowWidth / 16);
	return Math.floor(minSize / gridSize) * gridSize;
}

export function getResponsiveValue(mobile: number, desktop: number): number {
	if (typeof window === 'undefined') return mobile; // Default to mobile for SSR
	return window.innerWidth < 640 ? mobile : desktop;
}

export function getGridWidth(width: number): string {
	return `${Math.floor(width * 100) / 100}px`;
}
