<script lang="ts">
	const {
		headers = [],
		rows = [],
		width = 60
	} = $props<{
		headers?: string[];
		rows?: string[][];
		width?: number;
	}>();

	const columnWidths = $derived(
		headers.map((header: string, index: number) => {
			const columnContent = [
				header,
				...rows.map((row: string[]) => row[index])
			];
			return Math.max(...columnContent.map((cell) => cell?.length ?? 0));
		})
	);

	// Create border lines
	const topBorder = $derived(
		`┌${columnWidths.map((w: number) => '─'.repeat(w + 2)).join('┬')}┐`
	);
	const middleBorder = $derived(
		`├${columnWidths.map((w: number) => '─'.repeat(w + 2)).join('┼')}┤`
	);
	const bottomBorder = $derived(
		`└${columnWidths.map((w: number) => '─'.repeat(w + 2)).join('┴')}┘`
	);

	function padCell(text: string, width: number): string {
		return text.padEnd(width);
	}
</script>

<div class="table" style="--table-width: {width}ch">
	<div class="table-border">
		{topBorder}
	</div>

	<div class="header-row">
		│{#each headers as header, i}
			{' '}{padCell(header, columnWidths[i])} │
		{/each}
	</div>

	<div class="table-border">
		{middleBorder}
	</div>

	{#each rows as row}
		<div class="table-row">
			│{#each row as cell, i}
				{' '}{padCell(cell ?? '', columnWidths[i])} │
			{/each}
		</div>
	{/each}

	<div class="table-border">
		{bottomBorder}
	</div>
</div>

<style>
	.table {
		width: var(--table-width);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-tight);
		white-space: pre;
	}

	.table-border {
		color: var(--text-muted);
	}

	.header-row {
		color: var(--text-color);
		font-weight: var(--font-weight-medium);
	}

	.table-row {
		color: var(--text-color);
	}
</style>
