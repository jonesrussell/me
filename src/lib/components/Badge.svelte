<script lang="ts">
	type BadgeType = 'info' | 'success' | 'warning' | 'error';

	let {
		type = 'info' as const satisfies BadgeType,
		content = $bindable(() => null)
	} = $props();

	const symbols: Record<BadgeType, string> = $state({
		info: 'ℹ',
		success: '✓',
		warning: '⚠',
		error: '✗'
	});

	function getSymbol(t: BadgeType): string {
		return symbols[t];
	}
</script>

<span class="badge {type}">
	[{getSymbol(type)}] {@render content()}
</span>

<style>
	:root {
		--font-mono: 'Courier New', Courier, monospace;
		--ch: 1ch;
	}

	.badge {
		font-family: var(--font-mono);
		padding: 0 var(--ch);
		white-space: nowrap;
	}

	.info {
		color: #0066cc;
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
