<script lang="ts">
	type BadgeType = 'info' | 'success' | 'warning' | 'error';

	let {
		type = 'info' as const satisfies BadgeType,
		content = $bindable(() => null)
	} = $props<{ type?: BadgeType; content?: () => unknown }>();

	const symbols: Record<BadgeType, string> = $state({
		info: 'ℹ',
		success: '✓',
		warning: '⚠',
		error: '✗'
	});

	// Ensure type is a valid BadgeType
	const getSymbol = (t: BadgeType): string => symbols[t];
</script>

<span class="badge {type}">
	[{getSymbol(type)}] {@render content()}
</span>
