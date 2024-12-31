<script lang="ts">
	import { alignToGrid } from '$lib/utils/grid';

	const {
		headers = [],
		rows = [],
		width = 60
	} = $props<{
		headers?: string[];
		rows?: string[][];
		width?: number;
	}>();

	const alignedWidth = $derived(alignToGrid(width));

	function padCell(text: string, width: number): string {
		return text.padEnd(width);
	}

	// Calculate column widths
	const columnWidths = $derived(
		headers.map((header: string, index: number) => {
			const columnContent = [
				header,
				...rows.map((row: string[]) => row[index])
			];
			return Math.max(...columnContent.map((cell) => cell.length));
		})
	);
</script>

<div class="table" style="--table-width: {alignedWidth}ch">
	<div class="table-border">
		┌{columnWidths.map((w: number) => '─'.repeat(w + 2)).join('┬')}┐
	</div>

	<div class="header-row">
		│ {#each headers as header, i}
			{padCell(header, columnWidths[i])} │
		{/each}
	</div>

	<div class="table-border">
		├{columnWidths.map((w: number) => '─'.repeat(w + 2)).join('┼')}┤
	</div>

	{#each rows as row}
		<div class="table-row">
			│ {#each row as cell, i}
				{padCell(cell, columnWidths[i])} │
			{/each}
		</div>
	{/each}

	<div class="table-border">
		└{columnWidths.map((w: number) => '─'.repeat(w + 2)).join('┴')}┘
	</div>
</div>

<style>
	.table {
		width: var(--table-width);
		font-family: var(--font-mono);
		line-height: 1.2;
		white-space: pre;
	}

	.table-border {
		color: var(--border-color);
	}

	.header-row {
		color: var(--text-color);
		font-weight: bold;
	}

	.table-row {
		color: var(--text-color);
	}
</style>
