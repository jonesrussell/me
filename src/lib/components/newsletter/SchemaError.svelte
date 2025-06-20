<script lang="ts">
	interface Props {
		onRetry: () => void;
		message?: string;
		showRetry?: boolean;
	}

	let { onRetry, message = 'Form configuration unavailable', showRetry = true }: Props = $props();
</script>

<style>
	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateY(-0.5rem);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.schema-error {
			animation: none;
		}

		.schema-retry-button {
			transition: none;
		}

		.schema-retry-button:hover {
			transform: none;
		}
	}

	/* High contrast mode support */
	@media (forced-colors: active) {
		.schema-error {
			border-width: 0.125rem;
		}

		.schema-retry-button {
			border-width: 0.125rem;
		}
	}

	.schema-error {
		display: flex;
		margin-bottom: var(--space-4);
		padding: var(--space-4);
		background: color-mix(in srgb, var(--color-warning) 8%, var(--bg-color));
		border: var(--border-width) solid color-mix(in srgb, var(--color-warning) 30%, transparent);
		border-radius: var(--radius-md);
		align-items: center;
		justify-content: center;
		animation: slide-in 0.3s ease-out;
	}

	.schema-error-content {
		text-align: center;
		max-width: 100%;
	}

	.schema-error-icon {
		margin-bottom: var(--space-2);
		font-size: var(--font-size-xl);
		line-height: 1;
		color: var(--color-warning);
		opacity: 0.8;
	}

	.schema-error-message {
		margin: 0 0 var(--space-3) 0;
		font-family: var(--font-sans);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-relaxed);
		color: var(--color-warning);
	}

	.schema-retry-button {
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-tight);
		color: var(--color-warning);
		background: transparent;
		border: var(--border-width) solid var(--color-warning);
		border-radius: var(--radius-sm);
		transition: all var(--transition-duration) var(--transition-timing);
		cursor: pointer;
	}

	.schema-retry-button:hover {
		color: var(--bg-color);
		background: var(--color-warning);
		transform: translateY(-0.125rem);
	}

	.schema-retry-button:focus {
		outline: none;
		box-shadow:
			0 0 0 var(--space-1) var(--color-warning),
			0 0 0 calc(var(--space-1) + 0.125rem) var(--bg-color);
	}

	.schema-retry-button:active {
		transform: translateY(0);
	}
</style>

<div class="schema-error" role="alert" aria-live="polite">
	<div class="schema-error-content">
		<div class="schema-error-icon" aria-hidden="true">⚠</div>
		<p class="schema-error-message">{message}</p>

		{#if showRetry}
			<button
				class="schema-retry-button"
				onclick={onRetry}
				type="button"
				aria-label="Retry loading form configuration"
			>
				Retry
			</button>
		{/if}
	</div>
</div>
