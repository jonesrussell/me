<script lang="ts">
	import Moveable from "svelte-moveable";
	import WindowHeader from './WindowHeader.svelte';
	import WindowFooter from './WindowFooter.svelte';

	export let title: string = '';

	let winHeader: HTMLElement;
	let targetRef: HTMLElement | null = null;

	const draggable = true;
	const throttleDrag = 1;
	const edgeDraggable = false;
	const startDragRotate = 0;
	const throttleDragRotate = 0;
</script>

<section
	aria-label={title}
	class="absolute transform border border-gray-500 bg-gray-200 shadow-lg md:w-1/2"
	bind:this={targetRef}
>
	<div bind:this={winHeader}>
		<WindowHeader {title} />
	</div>

	<div class="border-l-[16px] border-r-[16px] border-gray-500 p-4">
		<slot />
	</div>

	<WindowFooter />

	<Moveable
		target={targetRef}
		draggable={draggable}
		throttleDrag={throttleDrag}
		edgeDraggable={edgeDraggable}
		startDragRotate={startDragRotate}
		throttleDragRotate={throttleDragRotate}
		on:drag={({ detail: e }) => {
			if (targetRef) {
				targetRef.style.transform = e.transform;
			}
		}}
	/>
</section>
