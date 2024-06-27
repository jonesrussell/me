<script lang="ts">
	import { onMount } from 'svelte';
	import WindowHeader from './WindowHeader.svelte';
	import WindowFooter from './WindowFooter.svelte';
	import { calculateInitialPosition, makeElementDraggable } from './windowUtils';

	let x = 0;
	let y = 0;
	let winHeader: HTMLElement;

	export let title: string = '';

	onMount(() => {
		const interval = setInterval(() => {
			if (winHeader) {
				calculateInitialPosition(winHeader, (newX, newY) => {
					x = newX;
					y = newY;
				});
				clearInterval(interval);
			}
		}, 100);
	});
</script>

<section
	aria-label={title}
	class="absolute transform border border-gray-500 bg-gray-200 shadow-lg md:w-1/2"
	style="transform: translate3d({x}px, {y}px, 0);"
>
	<div bind:this={winHeader} use:makeElementDraggable={{ x, y, header: winHeader }}>
		<WindowHeader {title} />
	</div>

	<div class="border-l-[16px] border-r-[16px] border-gray-500 p-4">
		<slot />
	</div>

	<WindowFooter />
</section>
