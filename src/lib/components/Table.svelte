<script lang="ts">
	import { alignToGrid } from '$lib/utils/grid';

	export let headers: string[] = [];
	export let rows: string[][] = [];
	export let width = 60;

	$: alignedWidth = alignToGrid(width);

	function padCell(text: string, width: number): string {
		return text.padEnd(width);
	}

	// Calculate column widths
	$: columnWidths = headers.map((header, index) => {
		const columnContent = [header, ...rows.map((row) => row[index])];
		return Math.max(...columnContent.map((cell) => cell.length));
	});
</script>

<div class="table" style="--table-width: {alignedWidth}ch" role="table">
	<div class="table-border">
		┌{columnWidths.map((w) => '─'.repeat(w + 2)).join('┬')}┐
	</div>

	<div class="header-row" role="row">
		│ {#each headers as header, i}
			<span role="columnheader">{padCell(header, columnWidths[i])}</span> │
		{/each}
	</div>

	<div class="table-border">
		├{columnWidths.map((w) => '─'.repeat(w + 2)).join('┼')}┤
	</div>

	{#each rows as row}
		<div class="table-row" role="row">
			│ {#each row as cell, i}
				<span role="cell">{padCell(cell ?? '', columnWidths[i])}</span> │
			{/each}
		</div>
	{/each}

	<div class="table-border">
		└{columnWidths.map((w) => '─'.repeat(w + 2)).join('┴')}┘
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
