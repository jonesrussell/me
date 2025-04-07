<script lang="ts">
	const {
		text,
		position = 'top',
		children
	} = $props<{
		text: string;
		position?: 'top' | 'bottom' | 'left' | 'right';
		children?: () => unknown;
	}>();

	let isVisible = $state(false);

	function handleMouseEnter() {
		isVisible = true;
	}

	function handleMouseLeave() {
		isVisible = false;
	}
</script>

<div
	class="tooltip-wrapper"
	role="tooltip"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
>
	{children?.()}
	<span class="tooltip" class:visible={isVisible} data-position={position}>
		{text}
	</span>
</div>

<style>
	.tooltip-wrapper {
		display: inline-block;
		position: relative;
	}

	.tooltip {
		position: absolute;

		padding: var(--space-1) var(--space-2);

		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-tight);
		color: var(--text-color);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-md);

		opacity: 0;

		transition: all var(--transition-duration) var(--transition-timing);
		pointer-events: none;
		z-index: 1;
		white-space: nowrap;
	}

	.tooltip.visible {
		opacity: 1;
	}

	[data-position='top'] {
		bottom: 100%;
		left: 50%;
		margin-bottom: var(--space-1);
		transform: translateX(-50%);
	}

	[data-position='bottom'] {
		top: 100%;
		left: 50%;
		margin-top: var(--space-1);
		transform: translateX(-50%);
	}

	[data-position='left'] {
		top: 50%;
		right: 100%;
		margin-right: var(--space-1);
		transform: translateY(-50%);
	}

	[data-position='right'] {
		top: 50%;
		left: 100%;
		margin-left: var(--space-1);
		transform: translateY(-50%);
	}

	@media (prefers-reduced-motion: reduce) {
		.tooltip {
			transition: none;
		}
	}
</style>
