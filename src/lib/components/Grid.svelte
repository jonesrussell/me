<script lang="ts">
	import { onMount } from 'svelte';
	import { alignToGrid } from '$lib/utils/grid';

	const {
		cols = 1,
		gap = 2,
		children
	} = $props<{
		cols?: number;
		gap?: number;
		children?: () => unknown;
	}>();

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	const gridTemplate = $derived(
		mounted
			? `repeat(auto-fit, minmax(min(100%, ${alignToGrid(40)}ch), 1fr))`
			: `repeat(${cols}, 1fr)` // Fallback for SSR
	);

	const gridGap = $derived(`${gap}ch`);
</script>

<div
	class="grid"
	style="--grid-template: {gridTemplate}; --grid-gap: {gridGap}"
>
	{@render children()}
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
