<script lang="ts">
	import Badge from './Badge.svelte';

	const { children, fallback } = $props<{
		children: () => unknown;
		fallback?: (error: Error) => unknown;
	}>();

	let error = $state<Error | null>(null);

	function resetError() {
		error = null;
	}

	function handleError(e: unknown) {
		error = e instanceof Error ? e : new Error(String(e));
	}

	function renderContent() {
		try {
			return children();
		} catch (e) {
			handleError(e);
			return null;
		}
	}
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
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
	}

	.error-stack {
		margin-top: var(--space-2);
		font-size: var(--font-size-xs);
		opacity: 0.8;
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
	{#if fallback}
		{@render fallback(error)}
	{:else}
		<div class="error-boundary" data-testid="error-boundary">
			<Badge type="error">Error</Badge>
			<p class="error-message" data-testid="error-message">{error.message}</p>
			{#if error.stack}
				<pre class="error-stack">{error.stack}</pre>
			{/if}
			<button onclick={resetError} data-testid="retry-button">Try Again</button>
		</div>
	{/if}
{:else}
	{@render renderContent()}
{/if}
