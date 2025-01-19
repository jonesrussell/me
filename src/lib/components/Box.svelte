<script lang="ts">
	import { alignToGrid } from '$lib/utils/grid';

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
</script>

<div class="box" style="--box-width: {alignedWidth}ch; {style}">
	<div class="box-frame">
		{#if title}
			<div class="header">{title}</div>
		{/if}

		<div class="content">
			{@render children()}
		</div>
	</div>
</div>

<style>
	.box {
		width: var(--box-width);
		max-width: var(--box-width);
		min-width: var(--box-width);
		font-family: var(--font-mono);
		line-height: var(--line-height-tight);
		overflow-wrap: break-word;
		word-break: break-word;
		border: 1px solid color-mix(in srgb, var(--text-muted) 20%, transparent);
		border-radius: var(--radius-md);
		background: color-mix(in srgb, var(--bg-darker) 30%, transparent);
		box-shadow: 0 1px 2px color-mix(in srgb, black 10%, transparent);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.box:hover {
		transform: translateY(-1px);
		box-shadow: 0 2px 4px color-mix(in srgb, black 15%, transparent);
	}

	.box-frame {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.header {
		padding: var(--ch2) var(--ch4);
		color: var(--text-muted);
		font-weight: 500;
		border-bottom: 1px solid
			color-mix(in srgb, var(--text-muted) 15%, transparent);
	}

	.content {
		padding: var(--ch2) var(--ch4);
		color: var(--text-color);
		overflow-wrap: break-word;
		word-break: break-word;
		background: color-mix(in srgb, var(--bg-color) 70%, transparent);
		flex: 1;
	}
</style>
