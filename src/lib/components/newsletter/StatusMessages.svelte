<script lang="ts">
	import type { SubmitStatus } from '$lib/components/composables/useNewsletterForm';

	interface Props {
		submitStatus: SubmitStatus;
		errorMessage: string;
	}

	let { submitStatus, errorMessage }: Props = $props();
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
		.success-message,
		.error-message {
			animation: none;
		}
	}

	.success-message,
	.error-message {
		display: flex;
		padding: var(--space-4);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		border-radius: var(--radius-md);
		gap: var(--space-2);
		align-items: center;
		justify-content: center;
		animation: slide-in 0.3s ease-out;
	}

	.success-message {
		color: var(--color-success);
		background: color-mix(in srgb, var(--color-success) 10%, var(--bg-color));
		border: var(--border-width) solid var(--color-success);
	}

	.error-message {
		color: var(--color-error);
		background: color-mix(in srgb, var(--color-error) 10%, var(--bg-color));
		border: var(--border-width) solid var(--color-error);
	}

	/* Focus styles for keyboard navigation */
	.success-message:focus,
	.error-message:focus {
		outline: var(--focus-ring);
		outline-offset: var(--space-1);
	}
</style>

{#if submitStatus === 'success'}
	<div class="success-message" role="status" aria-live="polite">
		<span aria-hidden="true">✓</span>
		<span>Thanks for subscribing!</span>
	</div>
{:else if submitStatus === 'error'}
	<div class="error-message" role="alert" aria-live="assertive" id="error-message">
		<span aria-hidden="true">✕</span>
		<span>{errorMessage}</span>
	</div>
{/if}
