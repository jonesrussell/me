<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		description?: string;
		cta?: boolean;
		ctaSlot?: Snippet;
	}

	const { title, description, cta = false, ctaSlot }: Props = $props();
</script>

<style>
	.header {
		container-type: inline-size;
		container-name: resource-header;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding: var(--space-4);
		background: var(--color-surface-2);
		border-radius: var(--radius-2);
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	h1 {
		font-size: var(--font-size-4);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-1);
	}

	.description {
		font-size: var(--font-size-2);
		color: var(--color-text-2);
		max-width: 65ch;
	}

	.cta {
		display: flex;
		gap: var(--space-2);
	}

	@container resource-header (width >= 30rem) {
		.header {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}
	}

	@container resource-header (width >= 50rem) {
		.header {
			padding: var(--space-8);
		}
	}
</style>

<header class="header">
	<div class="content">
		<h1>{title}</h1>
		{#if description}
			<p class="description">{description}</p>
		{/if}
	</div>
	{#if cta && ctaSlot}
		<div class="cta">
			{@render ctaSlot()}
		</div>
	{/if}
</header>
