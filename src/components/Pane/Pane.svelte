<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import Moveable from 'svelte-moveable';
	import PaneHeader from './PaneHeader.svelte';
	import PaneFooter from './PaneFooter.svelte';

	export let title: string = '';
	export let x: number;
	export let y: number;
	export let id: string;
	export let zIndex: number;

	let paneHeader: HTMLElement;
	let paneFooter: HTMLElement;

	let targetRef: HTMLElement | null = null;
	let moveableRef: Moveable | null = null;

	const draggable = true;
	const throttleDrag = 1;
	const edgeDraggable = true;
	const startDragRotate = 0;
	const throttleDragRotate = 0;

	const resizable = true;
	const keepRatio = false;
	const throttleResize = 1;
	const renderDirections = ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se'];

	let maxContentHeight: string;

	export let onBringToFront: () => void; // add this prop

	function handleMouseDown() {
		onBringToFront(); // call the callback when the pane is clicked
	}

	$: {
		if (targetRef && paneHeader && paneFooter) {
			maxContentHeight = `${window.innerHeight - paneHeader.offsetHeight - paneFooter.offsetHeight}px`;
		}
	}

	const dispatch = createEventDispatcher();

	onMount(() => {
		dispatch('update', () => moveableRef?.updateRect());

		const handleResize = () => {
			if (moveableRef) {
				moveableRef.updateRect();
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<section
	{id}
	aria-label={title}
	class="target"
	bind:this={targetRef}
	on:mousedown={handleMouseDown}
	style={`left: ${x}px; top: ${y}px; z-index: ${zIndex};`}
>
	<div bind:this={paneHeader}>
		<PaneHeader {title} />
	</div>

	<div
		class="overflow-auto border-l-[16px] border-r-[16px] border-gray-500 p-4"
		style={`max-height: ${maxContentHeight};`}
	>
		<slot />
	</div>

	<div bind:this={paneFooter}>
		<PaneFooter />
	</div>
</section>

<Moveable
	bind:this={moveableRef}
	target={targetRef}
	{draggable}
	{throttleDrag}
	{edgeDraggable}
	edge={['w', 'e']}
	{startDragRotate}
	{throttleDragRotate}
	{resizable}
	{keepRatio}
	{throttleResize}
	{renderDirections}
	originDraggable={false}
	on:drag={({ detail: e }) => {
		e.target.style.transform = e.transform;

		if (process.env.NODE_ENV === 'development') {
			console.log(`Pane ${title} is being dragged.`);
			console.log(`Pane ${title} z-index: ${e.target.style.zIndex}`); // Log z-index on drag
		}
	}}
	on:resize={({ detail: e }) => {
		e.target.style.width = `${e.width}px`;
		e.target.style.height = `${e.height}px`;
		e.target.style.transform = e.drag.transform;

		if (process.env.NODE_ENV === 'development') {
			console.log(`Pane ${title} is being resized.`);
			console.log(`Pane ${title} z-index: ${e.target.style.zIndex}`); // Log z-index on resize
		}
	}}
/>

<style>
	.target {
		position: absolute;
		transform: translate3d(0, 0, 0);
		border: 1px solid #ccc;
		background-color: #fff;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		width: 50%;
		max-width: var(--max-width);
		max-height: var(--max-height);
		min-width: var(--min-width);
	}
</style>
