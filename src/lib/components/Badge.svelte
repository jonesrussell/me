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

<span class="badge {badgeType}">
	{symbols[badgeType as BadgeType]}
	{@render children()}
</span>

<style>
	.badge {
		display: inline-flex;
		gap: var(--space-1);
		align-items: center;
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-tight);
		transition: all var(--transition-duration) var(--transition-timing);
	}

	.badge.info {
		background: var(--color-mix-light);
		color: var(--color-info);
	}

	.badge.success {
		background: var(--color-mix-light);
		color: var(--color-success);
	}

	.badge.warning {
		background: var(--color-mix-light);
		color: var(--color-warning);
	}

	.badge.error {
		background: var(--color-mix-light);
		color: var(--color-error);
	}

	@media (prefers-reduced-motion: reduce) {
		.badge {
			transition: none;
		}
	}
</style>
