type GridUnit = number;

export function alignToGrid(value: number, gridSize: number = 2): number {
	return Math.ceil(value / gridSize) * gridSize;
}
