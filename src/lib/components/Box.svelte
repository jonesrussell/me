<script lang="ts">
	import { alignToGrid } from '$lib/utils/grid';

	const {
		title = undefined,
		width = 40,
		style = '',
		children
	} = $props<{
		title?: string;
		width?: number;
		style?: string;
		children?: () => unknown;
	}>();

	const alignedWidth = $derived(alignToGrid(width));
	const contentWidth = $derived(alignedWidth - 4); // Account for borders

	function createLine(char: string): string {
		return char.repeat(contentWidth);
	}
</script>

<div
	class="box"
	style="

--box-width: {alignedWidth}ch; {style}"
>
	<div class="box-frame">
		{#if title}
			<div class="header">╭──── {title} {createLine('─')}╮</div>
		{:else}
			<div class="header">╭{createLine('─')}╮</div>
		{/if}

		<div class="content">
			{children?.()}
		</div>

		<div class="footer">╰{createLine('─')}╯</div>
	</div>
</div>

<style>
	.box {
		width: var(--box-width);
		font-family: var(--font-mono);
		line-height: var(--line-height-tight);
		white-space: pre;
	}

	.box-frame {
		color: var(--text-muted);
	}

	.header,
	.footer {
		white-space: pre;
	}

	.content {
		padding: var(--ch2) var(--ch4);
		color: var(--text-color);
	}
</style>
