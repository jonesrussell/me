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
			children();
		} catch (e) {
			if (e instanceof Error) {
				error = e;
			}
		}
	});
</script>

<style>
	.error-boundary {
		padding: var(--space-4);
		border: 1px solid var(--color-error);
		border-radius: var(--radius-md);
		background-color: var(--color-error-bg);
	}

	.error-message {
		margin: var(--space-2) 0;
		color: var(--color-error);
	}

	button {
		background-color: var(--color-error);
		color: white;
		border: none;
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius-sm);
		cursor: pointer;
	}

	button:hover {
		background-color: var(--color-error-dark);
	}
</style>

{#if error}
	<div class="error-boundary">
		<Badge type="error">Error</Badge>
		<p class="error-message">{error.message}</p>
		<button onclick={resetError}>Try Again</button>
	</div>
{:else}
	{@render children()}
{/if}
