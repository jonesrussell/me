<script lang="ts">
	type BadgeType = 'info' | 'success' | 'warning' | 'error';

	const { type: badgeType = 'info' as BadgeType, children } = $props<{
		type?: BadgeType;
		children: () => string;
	}>();

	const symbols: Record<BadgeType, string> = {
		info: 'ℹ',
		success: '✓',
		warning: '⚠',
		error: '✗'
	};
</script>

<span class="badge {badgeType}"
	>{symbols[badgeType as BadgeType]} {children()}</span
>

<style>
	.badge {
		display: inline-flex;

		padding: var(--space-1) var(--space-2);

		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-tight);
		border-radius: var(--radius-sm);

		transition: all var(--transition-duration) var(--transition-timing);
		gap: var(--space-1);
		align-items: center;
	}

	.badge.info {
		color: var(--color-info);
		background: var(--color-mix-light);
	}

	.badge.success {
		color: var(--color-success);
		background: var(--color-mix-light);
	}

	.badge.warning {
		color: var(--color-warning);
		background: var(--color-mix-light);
	}

	.badge.error {
		color: var(--color-error);
		background: var(--color-mix-light);
	}

	@media (prefers-reduced-motion: reduce) {
		.badge {
			transition: none;
		}
	}
</style>
