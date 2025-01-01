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
		position: relative;
		display: inline-block;
	}

	.tooltip {
		position: absolute;
		z-index: 1;
		padding: var(--ch) var(--ch2);
		border: calc(1 * var(--ch) / 16) solid var(--border-color);
		background: var(--bg-color);
		font-family: var(--font-mono);
		transition: opacity 0.2s ease;
		opacity: 0;
		white-space: nowrap;
		pointer-events: none;
	}

	.tooltip.visible {
		opacity: 1;
	}

	.tooltip-wrapper:hover .tooltip {
		opacity: 1;
	}

	[data-position='top'] {
		bottom: 100%;
		left: 50%;
		margin-bottom: var(--ch);
		transform: translateX(-50%);
	}

	[data-position='bottom'] {
		top: 100%;
		left: 50%;
		margin-top: var(--ch);
		transform: translateX(-50%);
	}

	[data-position='left'] {
		top: 50%;
		right: 100%;
		margin-right: var(--ch);
		transform: translateY(-50%);
	}

	[data-position='right'] {
		top: 50%;
		left: 100%;
		margin-left: var(--ch);
		transform: translateY(-50%);
	}
</style>
