<script lang="ts">
	import Box from './ui/Box.svelte';

	// Props interface
	interface Props {
		message?: string;
		showRetry?: boolean;
		class?: string;
		onRetry?: () => void;
	}

	let {
		message = 'Component temporarily unavailable',
		showRetry = true,
		class: className = '',
		onRetry
	}: Props = $props();

	function handleRetry() {
		// Call the optional callback prop first
		if (onRetry) {
			onRetry();
		}

		// Also dispatch a custom event for backward compatibility
		// and for cases where the parent prefers event-based handling
		const retryEvent = new CustomEvent('component-retry', {
			bubbles: true,
			detail: { timestamp: Date.now() }
		});

		// Dispatch from the current element context
		if (typeof window !== 'undefined') {
			document.dispatchEvent(retryEvent);
		}
	}
</script>

<style>
	.component-error {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-6);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		min-height: var(--space-24);
		gap: var(--space-4);
		opacity: 0.8;
	}

	.error-icon {
		font-size: var(--font-size-lg);
		color: var(--text-muted);
		opacity: 0.6;
		flex-shrink: 0;
	}

	.error-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		flex: 1;
		min-width: 0;
		text-align: center;
	}

	.error-message {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.retry-button {
		padding: var(--space-1) var(--space-2);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		text-decoration: underline;
		color: var(--accent-color);
		background: none;
		border: none;
		border-radius: var(--radius-sm);
		transition: all var(--transition-base);
		cursor: pointer;
		text-underline-offset: var(--space-1);
	}

	.retry-button:hover {
		background: color-mix(in srgb, var(--accent-color) 10%, transparent);
		opacity: 0.8;
	}

	.retry-button:focus {
		background: color-mix(in srgb, var(--accent-color) 10%, transparent);
		box-shadow: 0 0 0 var(--space-1) var(--accent-color-transparent);
		outline: none;
	}

	.retry-button:active {
		transform: translateY(var(--space-1));
	}

	@media (prefers-reduced-motion: reduce) {
		.retry-button {
			transition: none;
		}

		.retry-button:active {
			transform: none;
		}
	}
</style>

<Box>
	<div class="component-error {className}" role="alert" aria-live="polite">
		<div class="error-icon" aria-hidden="true">⋯</div>
		<div class="error-content">
			<p class="error-message">{message}</p>
			{#if showRetry}
				<button
					class="retry-button"
					onclick={handleRetry}
					type="button"
					aria-label="Retry loading component"
				>
					Try again
				</button>
			{/if}
		</div>
	</div>
</Box>
