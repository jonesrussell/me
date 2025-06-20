<script lang="ts">
	import Box from './ui/Box.svelte';
	import { createError, logErrorDebounced } from '$lib/utils/error-handler';

	// Component props with proper typing
	interface Props {
		fallback?: string;
		showDetails?: boolean;
		class?: string;
		component?: string;
		children?: import('svelte').Snippet;
	}

	let {
		fallback = 'Component temporarily unavailable',
		showDetails = false,
		class: className = '',
		component = 'Unknown',
		children
	}: Props = $props();

	// Error handler function
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function handleError(error: unknown, _retry: () => void) {
		const appError = createError(error instanceof Error ? error.message : String(error), error, {
			component
		});

		// Log error asynchronously
		logErrorDebounced(appError);
	}
</script>

<style>
	.error-boundary {
		display: contents;
	}

	.error-fallback {
		display: flex;
		padding: var(--space-8);
		text-align: center;
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 8rem;
		gap: var(--space-4);
	}

	.error-icon {
		font-size: var(--font-size-2xl);
		color: var(--text-muted);
		opacity: 0.6;
	}

	.error-message {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.error-details {
		margin: 0;
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-muted);
		background: var(--bg-darkest);
		border-radius: var(--radius-sm);
		opacity: 0.8;
		max-width: 100%;
		overflow-wrap: anywhere;
	}

	.retry-button {
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-color);
		background: var(--bg-darkest);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: all var(--transition-duration) var(--transition-timing);
	}

	.retry-button:hover {
		background: color-mix(in srgb, var(--bg-darkest) 80%, var(--accent-color));
		border-color: var(--accent-color);
	}

	.retry-button:focus {
		outline: none;
		box-shadow: 0 0 0 var(--space-1) var(--accent-color-transparent);
	}

	@media (prefers-reduced-motion: reduce) {
		.retry-button {
			transition: none;
		}
	}
</style>

<div class="error-boundary {className}">
	<svelte:boundary onerror={handleError}>
		{@render children?.()}

		{#snippet failed(error, retry)}
			<Box>
				<div class="error-fallback" role="alert">
					<div class="error-icon" aria-hidden="true">⚠</div>
					<p class="error-message">{fallback}</p>

					{#if showDetails && error}
						<details>
							<summary class="error-message">Technical details</summary>
							<p class="error-details">{error instanceof Error ? error.message : String(error)}</p>
							{#if component}
								<p class="error-details">Component: {component}</p>
							{/if}
						</details>
					{/if}

					<button
						class="retry-button"
						onclick={() => {
							retry();
						}}
						type="button"
					>
						Try again
					</button>
				</div>
			</Box>
		{/snippet}
	</svelte:boundary>
</div>
