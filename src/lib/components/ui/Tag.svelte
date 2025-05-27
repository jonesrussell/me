<script lang="ts">
	export let as: string = 'span';
	export let title: string | undefined;
</script>

<style>
	.tag {
		display: inline-block;
		margin: 0;
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-sans, system-ui, sans-serif);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		line-height: 1.2;
		color: var(--tag-color);
		background: var(--tag-bg);
		border: none;
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

	.tag:hover,
	.tag:focus {
		background: var(--color-green-200);
	}
</style>

<svelte:element this={as} class="tag" {title}><slot /></svelte:element>
