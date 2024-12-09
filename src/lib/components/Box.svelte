<script lang="ts">
	import { top, bottom, divider, sides } from '$lib/utils/boxDrawing';
	import { alignToGrid } from '$lib/utils/grid';

	let {
		title,
		width = 40,
		color = 'var(--box-border)',
		children
	} = $props<{
		title?: string;
		width?: number;
		color?: string;
		children?: () => any;
	}>();

	let alignedWidth = $derived(alignToGrid(width));

	function padContent(text: string): string {
		const paddingWidth = Math.max(0, alignedWidth - text.length - 2);
		return `│${text}${' '.repeat(paddingWidth)}│`;
	}
</script>

<div class="box" style="--box-width: {alignedWidth}ch; --box-color: {color}">
	<div class="box-frame">
		<div class="border-line">{top({ width: alignedWidth })}</div>

		{#if title}
			<div class="border-line">{padContent(title)}</div>
			<div class="border-line">{divider({ width: alignedWidth })}</div>
		{/if}

		<div class="content">
			<div class="content-inner">
				{@render children?.()}
			</div>
		</div>

		<div class="border-line">{bottom({ width: alignedWidth })}</div>
	</div>
</div>

<style>
	.box {
		width: var(--box-width);
		font-family: var(--font-mono);
		line-height: 1.2;
		margin: 0 auto;
	}

	.box-frame {
		display: flex;
		flex-direction: column;
		white-space: pre;
		color: var(--box-color);
	}

	.border-line {
		white-space: pre;
		line-height: 1.2;
		height: 1.2em;
		display: flex;
		align-items: center;
	}

	.content {
		padding: 0 var(--ch2);
		min-height: 1.2em;
		position: relative;
	}

	.content-inner {
		white-space: normal;
		width: 100%;
	}

	.content::before,
	.content::after {
		content: '│';
		position: absolute;
		top: 0;
		bottom: 0;
		line-height: 1.2;
		display: flex;
		align-items: stretch;
		white-space: pre;
		color: var(--box-color);
	}

	.content::before {
		left: 0;
	}
	.content::after {
		right: 0;
	}

	:global(.content > *) {
		margin: 0;
		padding: 0;
		line-height: 1.2;
	}
</style>
