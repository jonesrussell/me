<script lang="ts">
	type BadgeType = 'info' | 'success' | 'warning' | 'error';

	const { type = 'info', children } = $props<{
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
	[{symbols[type as BadgeType]}] {children?.()}
</span>

<style>
	:root {
		--font-mono: 'Courier New', courier, monospace;
		--ch: 1ch;
	}

	.badge {
		padding: 0 var(--ch);
		font-family: var(--font-mono);
		white-space: nowrap;
	}

	.info {
		color: #06c;
	}

	.success {
		color: #22c55e;
	}

	.warning {
		color: #eab308;
	}

	.error {
		color: #ef4444;
	}

	:global([data-theme='dark']) .badge {
		opacity: 0.9;
	}
</style>
