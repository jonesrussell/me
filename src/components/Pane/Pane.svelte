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

<section
	{id}
	aria-label={title}
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
</section>

<style>
	.pane {
		position: absolute;
		background: #fff;
		border: 1px solid #000;
		min-width: 300px;
		max-width: 800px;
		font-family: var(--font-mono);
	}

	.pane-header {
		cursor: move;
		user-select: none;
	}

	.pane-content {
		padding: 1rem;
		overflow: auto;
		background: #fff;
		border-left: 1px solid #000;
		border-right: 1px solid #000;
	}
</style>
