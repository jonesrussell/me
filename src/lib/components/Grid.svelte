<script lang="ts">
	const {
		cols = 1,
		gap = 2,
		children
	} = $props<{
		cols?: number;
		gap?: number;
		children?: () => unknown;
	}>();

	const gridTemplate = $derived(`repeat(${cols}, 1fr)`);
	const gridGap = $derived(`${gap}ch`);
</script>

<div
	class="grid"
	style="--grid-template: {gridTemplate}; --grid-gap: {gridGap}"
>
	{children?.()}
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
