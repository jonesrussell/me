<script lang="ts">
	import { sanitizeHTML } from '$lib/services/utils/helpers';

	export let content: string;
	export let className = '';

	$: renderedContent = sanitizeHTML(content || '');
</script>

<style>
	div {
		width: 100%;
	}
</style>

<div class={className}>
	{@html renderedContent}
</div>
