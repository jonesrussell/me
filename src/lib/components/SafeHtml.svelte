<script lang="ts">
	import { marked } from 'marked';
	import { sanitizeHTML } from '$lib/services/utils/helpers';

	export let content: string;
	export let className = '';

	$: renderedContent = marked(sanitizeHTML(content || ''));
</script>

<style>
	div {
		width: 100%;
	}
</style>

<div class={className}>
	{@html renderedContent}
</div>
