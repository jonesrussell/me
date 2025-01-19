<script lang="ts">
	type BadgeType = 'info' | 'success' | 'warning' | 'error';

	const { type = 'info', children = () => null } = $props<{
		type?: BadgeType;
		children?: () => unknown;
	}>();

	const symbols: Record<BadgeType, string> = {
		info: 'ℹ',
		success: '✓',
		warning: '⚠',
		error: '✗'
	};
</script>

<span class="badge {type}">
	{symbols[type as BadgeType]}
	{@render children()}
</span>

<style>
	:root {
		--font-mono: 'Courier New', courier, monospace;
		--ch: 1ch;
	}

	.badge {
		display: inline-flex;
		gap: var(--ch);
		align-items: center;
		padding: calc(var(--ch) / 4) var(--ch);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-tight);
	}

	.badge.info {
		background: color-mix(in srgb, var(--color-info) 15%, transparent);
		color: var(--color-info);
	}

	.badge.success {
		background: color-mix(in srgb, var(--color-success) 15%, transparent);
		color: var(--color-success);
	}

	.badge.warning {
		background: color-mix(in srgb, var(--color-warning) 15%, transparent);
		color: var(--color-warning);
	}

	.badge.error {
		background: color-mix(in srgb, var(--color-error) 15%, transparent);
		color: var(--color-error);
	}

	:global([data-theme='dark']) .badge {
		opacity: 0.9;
	}
</style>
