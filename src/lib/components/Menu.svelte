<script lang="ts">
	const { items = [], selected = 0 } = $props<{
		items?: string[];
		selected?: number;
	}>();
</script>

<div class="menu">
	{#each items as item, i}
		<div class="menu-item" class:selected={i === selected}>
			{i === selected ? '→ ' : '  '}{item}
		</div>
	{/each}
</div>

<style>
	.menu {
		font-family: var(--font-mono);
		line-height: var(--line-height-tight);
		white-space: pre;
	}

	.menu-item {
		padding: var(--space-1) var(--space-2);
		cursor: pointer;
		transition: all var(--transition-duration) var(--transition-timing);
	}

	.menu-item:hover {
		background: var(--color-mix-light);
	}

	.selected {
		color: var(--accent-color);
		font-weight: var(--font-weight-medium);
	}

	@media (prefers-reduced-motion: reduce) {
		.menu-item {
			transition: none;
		}
	}
</style>
