<script lang="ts">
	import { alignToGrid } from '$lib/utils/grid';

	export let title: string | undefined = undefined;
	export let width = 80;

	$: alignedWidth = alignToGrid(width);
</script>

<div class="box" style="--box-width: {alignedWidth}ch">
	<div class="box-frame">
		<div class="border-line">╭{'─'.repeat(alignedWidth - 2)}╮</div>

		{#if title}
			<div class="border-line">│ {title.padEnd(alignedWidth - 4)} │</div>
			<div class="border-line">├{'─'.repeat(alignedWidth - 2)}┤</div>
		{/if}

		<div class="content">
			<slot />
		</div>

		<div class="border-line">╰{'─'.repeat(alignedWidth - 2)}╯</div>
	</div>
</div>

<style>
	.box {
		width: var(--box-width);
		font-family: var(--font-mono);
		line-height: 1.2;
	}

	.box-frame {
		white-space: pre;
		color: var(--border-color);
	}

	.content {
		padding: var(--ch2);
		position: relative;
	}

	.border-line {
		line-height: 1.2;
	}
</style>
