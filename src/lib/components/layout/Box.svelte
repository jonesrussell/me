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
</script>

<style>
	.box {
		width: var(--box-width);

		font-family: var(--font-mono);
		line-height: var(--line-height-tight);

		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-sm);

		transition: all var(--transition-duration) var(--transition-timing);
		min-width: var(--box-width);
		max-width: var(--box-width);
		word-break: break-word;
		overflow-wrap: break-word;
	}

	.box:hover {
		box-shadow: var(--shadow-md);
		transform: translateY(-0.125ch);
	}

	.box-frame {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.header {
		padding: var(--space-2) var(--space-4);
		border-bottom: var(--border-width) solid var(--border-color);
		font-weight: var(--font-weight-medium);
		color: var(--text-muted);
	}

	.content {
		flex: 1;

		padding: var(--space-2) var(--space-4);

		color: var(--text-color);
		word-break: break-word;
		overflow-wrap: break-word;

		background: var(--bg-color);
	}

	@media (prefers-reduced-motion: reduce) {
		.box {
			transition: none;
		}
	}
</style>

<div
	class="box"
	style="
		--box-width: {alignToGrid(width)}ch; {style}"
>
	<div class="box-frame">
		{#if title}
			<div class="header">
				<div class="title">{title}</div>
			</div>
		{/if}

		<div class="content">
			{@render children?.()}
		</div>
	</div>
</div>
