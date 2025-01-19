<script lang="ts">
	import { alignToGrid } from '$lib/utils/grid';
	import { onMount } from 'svelte';

	const {
		title = undefined,
		width = 40,
		style = '',
		children = () => null
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

	let boxElement: HTMLDivElement;
	let actualWidth = 0;
	let actualContentWidth = 0;

	onMount(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				actualWidth = entry.contentRect.width;
				const content = entry.target.querySelector('.content');
				if (content) {
					actualContentWidth = (content as HTMLElement).offsetWidth;
				}
				console.log('Box dimensions:', {
					requestedWidth: width,
					alignedWidth,
					actualWidth,
					actualContentWidth,
					title
				});
			}
		});

		resizeObserver.observe(boxElement);
		return () => resizeObserver.disconnect();
	});
</script>

<div
	class="box"
	style="--box-width: {alignedWidth}ch; {style}"
	bind:this={boxElement}
>
	<div class="box-frame">
		{#if title}
			<div class="header">╭──── {title} {createLine('─')}╮</div>
		{:else}
			<div class="header">╭{createLine('─')}╮</div>
		{/if}

		<div class="content">
			{@render children()}
		</div>

		<div class="footer">╰{createLine('─')}╯</div>
	</div>
</div>

<style>
	.box {
		width: var(--box-width);
		max-width: var(--box-width);
		min-width: var(--box-width);
		font-family: var(--font-mono);
		line-height: var(--line-height-tight);
		white-space: pre;
		overflow-wrap: break-word;
		word-break: break-word;
		border: 1px solid color-mix(in srgb, var(--text-muted) 15%, transparent);
		border-radius: var(--radius-md);
		background: color-mix(in srgb, var(--bg-darker) 50%, transparent);
	}

	.box-frame {
		color: var(--text-muted);
		overflow: hidden;
		padding: var(--ch);
	}

	.header,
	.footer {
		white-space: pre;
		overflow: hidden;
		opacity: 0.5;
	}

	.content {
		padding: var(--ch2) var(--ch4);
		color: var(--text-color);
		white-space: normal;
		overflow-wrap: break-word;
		word-break: break-word;
		border-top: 1px solid color-mix(in srgb, var(--text-muted) 10%, transparent);
		border-bottom: 1px solid
			color-mix(in srgb, var(--text-muted) 10%, transparent);
		margin: var(--ch) 0;
		background: color-mix(in srgb, var(--bg-color) 50%, transparent);
	}
</style>
