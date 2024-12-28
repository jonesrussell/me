<script lang="ts">
	export let type: 'info' | 'success' | 'warning' | 'error' = 'info';

	const symbols = {
		info: 'ℹ',
		success: '✓',
		warning: '⚠',
		error: '✗'
	};
</script>

<span class="badge {type}">
	[{symbols[type]}] <slot />
</span>
