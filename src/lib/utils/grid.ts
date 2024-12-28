export function alignToGrid(value: number, gridSize: number = 2): number {
	const windowWidth =
		typeof window !== 'undefined'
			? Math.floor(window.innerWidth * 100) / 100
			: 1024;
	const minSize = Math.min(value, windowWidth / 16);
	return Math.floor(minSize / gridSize) * gridSize;
}
