<script lang="ts">
	import Moveable from 'svelte-moveable';
	import PaneHeader from './PaneHeader.svelte';
	import PaneFooter from './PaneFooter.svelte';

	export let title: string = '';
	export let x: number;
	export let y: number;
	export let width: number;
	export let height: number;

	let paneHeader: HTMLElement;
	let paneFooter: HTMLElement;
	
	let targetRef: HTMLElement | null = null;
	let moveableRef = null;

	const draggable = true;
	const throttleDrag = 1;
	const edgeDraggable = false;
	const startDragRotate = 0;
	const throttleDragRotate = 0;

	const maxWidth = 'auto';
	const maxHeight = 'auto';
	const minWidth = 'auto';
	const minHeight = 'auto';
	const resizable = true;
	const keepRatio = false;
	const throttleResize = 1;
	const renderDirections = ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se'];

	let contentHeight: string;

	$: {
		if (targetRef && paneHeader && paneFooter) {
			contentHeight = `${window.innerHeight - paneHeader.offsetHeight - paneFooter.offsetHeight}px`;
		}
	}
</script>

<section
	aria-label={title}
	class="target absolute transform border border-gray-500 bg-gray-200 shadow-lg md:w-1/2"
	bind:this={targetRef}
	style={`max-width: ${maxWidth};max-height: ${maxHeight};min-width: ${minWidth};min-height: ${minHeight}; left: ${x}px; top: ${y}px;width: ${width}px;height: ${height}px;`}
>
	<div bind:this={paneHeader}>
		<PaneHeader {title} />
	</div>

	<div
		class="overflow-auto border-l-[16px] border-r-[16px] border-gray-500 p-4"
		style={`max-height: ${contentHeight};`}
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
	{startDragRotate}
	{throttleDragRotate}
	{resizable}
	{keepRatio}
	{throttleResize}
	{renderDirections}
	on:drag={({ detail: e }) => {
		e.target.style.transform = e.transform;
	}}
	on:resize={({ detail: e }) => {
		e.target.style.width = `${e.width}px`;
		e.target.style.height = `${e.height}px`;
		e.target.style.transform = e.drag.transform;
	}}
/>
