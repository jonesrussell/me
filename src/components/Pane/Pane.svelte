<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import PaneHeader from './PaneHeader.svelte';
	import PaneFooter from './PaneFooter.svelte';

	export let title: string = '';
	export let x: number;
	export let y: number;
	export let id: string;
	export let zIndex: number;

	let paneHeader: HTMLElement;
	let paneFooter: HTMLElement;
	let isDragging = false;
	let startX: number;
	let startY: number;
	let startPaneX: number;
	let startPaneY: number;

	let maxContentHeight: string;

	export let onBringToFront: () => void;

	function handleMouseDown(event: MouseEvent) {
		if (event.target instanceof HTMLElement && event.target.closest('.pane-header')) {
			isDragging = true;
			startX = event.clientX;
			startY = event.clientY;
			startPaneX = x;
			startPaneY = y;
			onBringToFront();
		}
	}

	function handleMouseMove(event: MouseEvent) {
		if (isDragging) {
			const deltaX = event.clientX - startX;
			const deltaY = event.clientY - startY;
			x = startPaneX + deltaX;
			y = startPaneY + deltaY;
		}
	}

	function handleMouseUp() {
		isDragging = false;
	}

	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	});
</script>

<div
	{id}
	role="dialog"
	aria-labelledby={`${id}-title`}
	class="pane"
	on:mousedown={handleMouseDown}
	style="left: {x}px; top: {y}px; z-index: {zIndex};"
>
	<div class="pane-header" bind:this={paneHeader}>
		<PaneHeader {title} />
	</div>

	<div class="pane-content">
		<slot />
	</div>

	<div bind:this={paneFooter}>
		<PaneFooter />
	</div>
</div>

<style>
	.pane {
		position: absolute;
		background: var(--pane-bg);
		border: 1px solid var(--pane-border);
		min-width: 300px;
		max-width: 800px;
		font-family: var(--font-mono);
		transition:
			background-color 0.3s ease,
			border-color 0.3s ease;
	}

	.pane-header {
		cursor: move;
		user-select: none;
	}

	.pane-content {
		padding: 1rem;
		overflow: auto;
		background: var(--pane-bg);
		border-left: 1px solid var(--pane-border);
		border-right: 1px solid var(--pane-border);
	}
</style>
