type GridUnit = number;

export function calculateGridUnits(chars: number): GridUnit {
    return Math.floor(chars / 2) * 2;
}

export function alignToGrid(value: number, gridSize: number = 2): number {
    return Math.ceil(value / gridSize) * gridSize;
}

export function getBoxDimensions(content: string, padding: number = 2): {
    width: number;
    height: number;
} {
    const lines = content.split('\n');
    const maxLineLength = Math.max(...lines.map(line => line.length));
    return {
        width: alignToGrid(maxLineLength + padding * 2),
        height: lines.length + padding * 2
    };
}

export function toGridUnits(value: number, base: number = 1): number {
    return Math.ceil(value / base) * base;
}

export function chToGridUnits(chars: number): string {
    return `${toGridUnits(chars)}ch`;
} 