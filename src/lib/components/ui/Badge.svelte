<script lang="ts">
	type BadgeType = 'info' | 'success' | 'warning' | 'error';

	const { type: badgeType = 'info', children } = $props<{
		type?: BadgeType;
		children: string | (() => string);
	}>();

	const symbols: Record<BadgeType, string> = {
		info: 'ℹ',
		success: '✓',
		warning: '⚠',
		error: '✗'
	};
</script>

<style>
	.badge {
		display: inline-flex;
		padding: var(--space-1, 0.25rem) var(--space-2, 0.5rem);
		font-family: var(--font-mono, monospace);
		font-size: var(--font-size-sm, 0.875rem);
		line-height: var(--line-height-tight, 1.25);
		border-radius: var(--radius-sm, 0.25rem);
		transition: all var(--transition-duration, 0.2s) var(--transition-timing, ease);
		gap: var(--space-1, 0.25rem);
		align-items: center;
	}

	.badge.info {
		color: var(--color-info, #3b82f6);
		background: var(--color-mix-light, #f3f4f6);
	}

	.badge.success {
		color: var(--color-success, #10b981);
		background: var(--color-mix-light, #f3f4f6);
	}

	.badge.warning {
		color: var(--color-warning, #f59e0b);
		background: var(--color-mix-light, #f3f4f6);
	}

	.badge.error {
		color: var(--color-error, #dc2626);
		background: var(--color-mix-light, #f3f4f6);
	}

	@media (prefers-reduced-motion: reduce) {
		.badge {
			transition: none;
		}
	}
</style>

<span class="badge {badgeType}" data-testid="badge">
	{symbols[badgeType as BadgeType]}
	{typeof children === 'function' ? children() : children}
</span>
