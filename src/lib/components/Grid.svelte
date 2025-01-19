<!--
@component
Grid - Monospace Character Grid System

A grid component that maintains strict character-based alignment using monospace units.
All measurements are in character units (ch) to ensure perfect alignment to the monospace grid.

Usage:
```svelte
<Grid cols={2} gap={2}>
  <div>Column 1</div>
  <div>Column 2</div>
</Grid>
```

Props:
- cols (number) - Number of columns in the grid. Must be a whole number.
- gap (number) - Gap between grid items in character units. Must be a whole number.
- children (function) - Content to be rendered in the grid.

@note
This grid system is designed for monospace layouts where every measurement
must align to the character grid. All values are rounded to ensure whole
character units.
-->
<script lang="ts">
	import { alignToGrid, toCharUnit, validateGridUnit } from '$lib/utils/grid';

	const {
		cols = 1,
		gap = 4,
		children
	} = $props<{
		cols?: number;
		gap?: number;
		children: () => unknown;
	}>();

	// Validate inputs are whole numbers
	$effect(() => {
		try {
			validateGridUnit(cols);
			validateGridUnit(gap);
		} catch (error) {
			console.error('Grid validation error:', error);
		}
	});

	const gridTemplate = $derived(`repeat(${alignToGrid(cols)}, minmax(0, 1fr))`);
	const gridGap = $derived(toCharUnit(gap));
</script>

<div class="grid" style:--cols={cols} style:--gap={`var(--ch${gap})`}>
	{@render children()}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		gap: var(--gap);
		width: 100%;
	}
</style>
