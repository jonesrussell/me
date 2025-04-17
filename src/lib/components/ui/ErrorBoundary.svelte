<script lang="ts">
	import Badge from './Badge.svelte';

	type ChildrenType = () => string | HTMLElement;

	const { children } = $props<{
		children: ChildrenType;
	}>();

	let error = $state<Error | null>(null);

	function resetError() {
		error = null;
	}

	$effect.root(() => {
		try {
			const result = children();
			if (!result) {
				throw new Error('No content rendered');
			}
		} catch (e) {
			error = e instanceof Error ? e : new Error(String(e));
		}
	});
</script>

<style>
	.error-boundary {
		padding: var(--space-4, 1rem);
		border: 1px solid var(--color-error, #dc2626);
		border-radius: var(--radius-md, 0.375rem);
		background-color: var(--color-error-bg, #fee2e2);
	}

	.error-message {
		margin: var(--space-2, 0.5rem) 0;
		color: var(--color-error, #dc2626);
	}

	button {
		background-color: var(--color-error, #dc2626);
		color: white;
		border: none;
		padding: var(--space-2, 0.5rem) var(--space-4, 1rem);
		border-radius: var(--radius-sm, 0.25rem);
		cursor: pointer;
	}

	button:hover {
		background-color: var(--color-error-dark, #b91c1c);
	}
</style>

{#if error}
	<div class="error-boundary" data-testid="error-boundary">
		<Badge type="error">Error</Badge>
		<p class="error-message" data-testid="error-message">{error.message}</p>
		<button onclick={resetError} data-testid="retry-button">Try Again</button>
	</div>
{:else}
	{@render children()}
{/if}
