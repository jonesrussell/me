<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' = 'md';
</script>

<style>
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	/* Respect reduced motion preferences */
	@media (prefers-reduced-motion: reduce) {
		.spinner {
			animation: none;
		}
	}

	.spinner {
		display: inline-block;
		border: 0.125rem solid var(--color-border);
		border-top: 0.125rem solid var(--color-primary);
		border-radius: var(--radius-full);
		animation: spin 1s linear infinite;
	}

	.spinner.sm {
		width: 1rem;
		height: 1rem;
	}

	.spinner.md {
		width: 1.5rem;
		height: 1.5rem;
	}

	.spinner.lg {
		width: 2rem;
		height: 2rem;
	}
</style>

<div class="spinner {size}" role="status" aria-label="Loading">
	<span class="sr-only">Loading...</span>
</div>
