<script lang="ts">
	export let error: string;

	function handleReload() {
		window.location.reload();
	}
</script>

<style>
	/* Responsive adjustments */
	@media (width <= 30rem) {
		.error-state {
			padding: var(--space-4);
		}

		.error-state h2 {
			font-size: var(--font-size-xl);
		}

		.error-state p {
			font-size: var(--font-size-base);
		}

		.error-actions {
			flex-direction: column;
			align-items: center;
		}

		.error-actions button,
		.error-actions a {
			width: 100%;
			max-width: 20rem;
		}
	}

	.error-state {
		max-width: min(var(--measure), 95cqi);
		margin: 0 auto;
		padding: var(--space-8);
		text-align: center;
		color: var(--color-text);
	}

	.error-icon {
		margin-bottom: var(--space-4);
		font-size: var(--font-size-4xl);
	}

	.error-state h2 {
		margin-bottom: var(--space-4);
		font-size: var(--font-size-2xl);
		font-weight: 600;
		color: var(--color-heading);
	}

	.error-state p {
		margin-right: auto;
		margin-bottom: var(--space-8);
		margin-left: auto;
		font-size: var(--font-size-lg);
		color: var(--color-text-muted);
		max-width: 40ch;
	}

	.error-actions {
		display: flex;
		gap: var(--space-4);
		justify-content: center;
		flex-wrap: wrap;
	}

	.error-actions button,
	.error-actions a {
		padding: var(--space-3) var(--space-6);
		font-weight: 500;
		text-decoration: none;
		border: 0.0625rem solid var(--color-border);
		border-radius: var(--radius-md);
		transition: all 0.2s ease;
	}

	.error-actions button {
		color: var(--color-primary-contrast);
		background: var(--color-primary);
		border-color: var(--color-primary);
		cursor: pointer;
	}

	.error-actions button:hover {
		background: var(--color-primary-hover);
		border-color: var(--color-primary-hover);
		transform: translateY(-0.0625rem);
	}

	.error-actions a {
		color: var(--color-text);
		background: var(--color-surface);
		border-color: var(--color-border);
	}

	.error-actions a:hover {
		background: var(--color-surface-elevated);
		border-color: var(--color-border-hover);
		transform: translateY(-0.0625rem);
	}
</style>

<div class="error-state" role="alert">
	<div class="error-icon">⚠️</div>
	<h2>Oops! Something went wrong</h2>
	<p>{error}</p>
	<div class="error-actions">
		<button onclick={handleReload}> Try Again </button>
		<a href="/blog">Back to Blog</a>
	</div>
</div>
