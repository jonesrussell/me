<script lang="ts">
	import type { Snippet } from 'svelte';
	const { title, children } = $props<{
		title?: string;
		children: Snippet;
	}>();
</script>

<style>
	.tag {
		display: inline-block;
		margin: 0 var(--space-2) var(--space-2) 0;
		padding: var(--space-1) var(--space-2);
		font-family: var(--font-sans, system-ui, sans-serif);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		line-height: 1.2;
		color: var(--tag-color, var(--text-muted));
		background: var(--tag-bg, var(--bg-darker));
		border: var(--tag-border, none);
		border-radius: var(--radius-md);
		box-shadow: 0 0.0625rem 0.125rem rgb(0 0 0 / 0.08);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		user-select: none;
		vertical-align: middle;
		transition:
			background 0.2s,
			color 0.2s;
	}
</style>

<span class="tag" {title}>{@render children()}</span>
