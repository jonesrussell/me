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
		children: () => import('svelte').ComponentType;
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
			{@render children()}
		</div>
	</div>
</div>

<style>
	.box {
		width: var(--box-width);
		min-width: var(--box-width);
		max-width: var(--box-width);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--bg-darker);
		font-family: var(--font-mono);
		line-height: var(--line-height-tight);
		transition: all var(--transition-duration) var(--transition-timing);
		overflow-wrap: break-word;
		word-break: break-word;
		box-shadow: var(--shadow-sm);
	}

	.box:hover {
		transform: translateY(-0.125ch);
		box-shadow: var(--shadow-md);
	}

	.box-frame {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.header {
		padding: var(--space-2) var(--space-4);
		color: var(--text-muted);
		font-weight: var(--font-weight-medium);
		border-bottom: var(--border-width) solid var(--border-color);
	}

	.content {
		flex: 1;
		padding: var(--space-2) var(--space-4);
		background: var(--bg-color);
		color: var(--text-color);
		overflow-wrap: break-word;
		word-break: break-word;
	}

	@media (prefers-reduced-motion: reduce) {
		.box {
			transition: none;
		}
	}
</style>
