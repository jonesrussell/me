<script lang="ts">
	import Badge from './Badge.svelte';
	let {
		type = $bindable<'info' | 'success' | 'warning' | 'error'>('info'),
		content = $bindable('')
	} = $props();
</script>

<Badge bind:type>{content}</Badge>
