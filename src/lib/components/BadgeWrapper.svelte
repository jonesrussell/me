<script lang="ts">
	import Badge from './Badge.svelte';
	export let type: 'info' | 'success' | 'warning' | 'error' = 'info';
	export let content = '';
</script>

<Badge {type}>
	{content}
</Badge>
