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
		font-family: var(--font-mono);
		opacity: 0;
		position: absolute;
		padding: var(--ch) var(--ch2);
		background: var(--bg-color);
		border: 1px solid var(--border-color);
		white-space: nowrap;
		z-index: 1;
		transition: opacity 0.2s ease;
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
		transform: translateX(-50%);
		margin-bottom: var(--ch);
	}

	[data-position='bottom'] {
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		margin-top: var(--ch);
	}

	[data-position='left'] {
		right: 100%;
		top: 50%;
		transform: translateY(-50%);
		margin-right: var(--ch);
	}

	[data-position='right'] {
		left: 100%;
		top: 50%;
		transform: translateY(-50%);
		margin-left: var(--ch);
	}
</style>
