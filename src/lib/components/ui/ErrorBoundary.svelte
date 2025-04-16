<script lang="ts">
	import Badge from './Badge.svelte';
	import Box from '../layout/Box.svelte';

	const { children } = $props<{
		children: () => unknown;
	}>();

	let error = $state<Error | null>(null);

	function resetError() {
		error = null;
	}

	$effect(() => {
		try {
			children();
		} catch (e) {
			error = e instanceof Error ? e : new Error(String(e));
		}
	});
</script>

<style>
	.error-boundary {
		width: 100%;
	}

	.error-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding: var(--space-4);
	}

	.error-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.error-message {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-color);
		white-space: pre-wrap;
	}

	.retry-button {
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-color);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-duration) var(--transition-timing);
	}

	.retry-button:hover {
		background: var(--color-mix-light);
		transform: translateY(-0.125ch);
	}

	@media (prefers-reduced-motion: reduce) {
		.retry-button {
			transition: none;
		}
	}
</style>

<div class="error-boundary">
	{#if error}
		<Box width={40}>
			<div class="error-content">
				<div class="error-header">
					<Badge type="error">Error</Badge>
					<button class="retry-button" onclick={resetError}>Retry</button>
				</div>
				<pre class="error-message">{error.message}</pre>
			</div>
		</Box>
	{:else}
		{@render children()}
	{/if}
</div>
