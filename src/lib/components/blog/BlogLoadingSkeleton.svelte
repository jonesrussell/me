<style>
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}

		50% {
			opacity: 0.5;
		}
	}

	/* Responsive adjustments */
	@media (width <= 30rem) {
		.loading-skeleton {
			padding: var(--space-4);
		}

		.skeleton-title {
			height: var(--space-8);
		}

		.skeleton-line.short {
			width: 80%;
		}
	}

	.loading-skeleton {
		max-width: min(var(--measure), 95cqi);
		margin: 0 auto;
		padding: var(--space-8);
	}

	.skeleton-header {
		margin-bottom: var(--space-8);
	}

	.skeleton-breadcrumb {
		width: 30%;
		height: var(--space-4);
		margin-bottom: var(--space-6);
		background: var(--color-surface-elevated);
		border-radius: var(--radius-sm);
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	.skeleton-title {
		width: 80%;
		height: var(--space-12);
		margin-bottom: var(--space-4);
		background: var(--color-surface-elevated);
		border-radius: var(--radius-md);
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	.skeleton-meta {
		width: 50%;
		height: var(--space-4);
		background: var(--color-surface-elevated);
		border-radius: var(--radius-sm);
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	.skeleton-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.skeleton-line {
		height: var(--space-4);
		background: var(--color-surface-elevated);
		border-radius: var(--radius-sm);
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	.skeleton-line.short {
		width: 60%;
	}
</style>

<div class="loading-skeleton" role="status" aria-label="Loading blog post">
	<div class="skeleton-header">
		<div class="skeleton-breadcrumb"></div>
		<div class="skeleton-title"></div>
		<div class="skeleton-meta"></div>
	</div>
	<div class="skeleton-content">
		<div class="skeleton-line"></div>
		<div class="skeleton-line"></div>
		<div class="skeleton-line short"></div>
		<div class="skeleton-line"></div>
		<div class="skeleton-line"></div>
		<div class="skeleton-line short"></div>
		<div class="skeleton-line"></div>
		<div class="skeleton-line"></div>
	</div>
</div>
