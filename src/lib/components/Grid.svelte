<script lang="ts">
	import { onMount } from 'svelte';
	import { alignToGrid } from '$lib/utils/grid';

	export let cols = 1;
	export let gap = 2;

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	// Safe grid template calculation
	$: gridTemplate = mounted
		? `repeat(auto-fit, minmax(min(100%, ${alignToGrid(40)}ch), 1fr))`
		: `repeat(${cols}, 1fr)`; // Fallback for SSR

	$: gridGap = `${gap}ch`;
</script>

<div
	class="grid"
	style="--grid-template: {gridTemplate}; --grid-gap: {gridGap}"
>
	<slot />
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: var(--grid-template);
		gap: var(--grid-gap);
		width: 100%;
		padding: 0 var(--content-padding);
	}
</style>
