<script lang="ts">
	import { marked } from 'marked';
	import { sanitizeHtml } from '$lib/utils/sanitize';

	export let content: string;
	export let className = '';

	$: renderedContent = marked(sanitizeHtml(content || ''));
</script>

<style>
	div {
		width: 100%;
	}
</style>

<div class={className}>
	{@html renderedContent}
</div>
