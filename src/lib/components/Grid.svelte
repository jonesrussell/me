<!--
@component
Grid - Simple Grid Layout

A basic grid component that provides a simple grid layout with configurable columns and gap.

Usage:
```svelte
<Grid cols={2} gap={2}>
  <div>Column 1</div>
  <div>Column 2</div>
</Grid>
```
-->
<script lang="ts">
	const {
		cols = 1,
		gap = 4,
		children = () => null
	} = $props<{
		cols?: number;
		gap?: number;
		children?: () => unknown;
	}>();
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
