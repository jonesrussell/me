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

<div
	class="box"
	style="

--box-width: {alignedWidth}ch; {style}"
>
	<div class="box-frame">
		{#if title}
			<div class="header">{title}</div>
		{/if}

		<div class="content">
			{children()}
		</div>
	</div>
</div>

<style>
	:root {
		--box-border-width: 0.125ch;
		--box-shadow-sm: 0 0.125ch 0.25ch;
		--box-shadow-md: 0 0.25ch 0.5ch;
		--box-shadow-opacity-sm: 0.1;
		--box-shadow-opacity-md: 0.15;
		--box-translate-y: -0.125ch;
	}

	.box {
		width: var(--box-width);
		min-width: var(--box-width);
		max-width: var(--box-width);
		border: var(--box-border-width) solid
			color-mix(in srgb, var(--text-muted) 20%, transparent);
		border-radius: var(--radius-md);
		background: color-mix(in srgb, var(--bg-darker) 30%, transparent);
		font-family: var(--font-mono);
		line-height: var(--line-height-tight);
		transition:
			transform var(--transition-duration) var(--transition-timing),
			box-shadow var(--transition-duration) var(--transition-timing);
		overflow-wrap: break-word;
		word-break: break-word;
		box-shadow: var(--box-shadow-sm)
			color-mix(
				in srgb,
				var(--shadow-color) var(--box-shadow-opacity-sm),
				transparent
			);
	}

	.box:hover {
		transform: translateY(var(--box-translate-y));
		box-shadow: var(--box-shadow-md)
			color-mix(
				in srgb,
				var(--shadow-color) var(--box-shadow-opacity-md),
				transparent
			);
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
		border-bottom: var(--box-border-width) solid
			color-mix(in srgb, var(--text-muted) 15%, transparent);
	}

	.content {
		flex: 1;
		padding: var(--ch2) var(--ch4);
		background: color-mix(in srgb, var(--bg-color) 70%, transparent);
		color: var(--text-color);
		overflow-wrap: break-word;
		word-break: break-word;
	}
</style>
