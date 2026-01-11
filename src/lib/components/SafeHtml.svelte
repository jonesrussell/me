<script lang="ts">
	import { sanitizeHTML } from '$lib/services/utils/helpers';

	interface Props {
		content: string;
		className?: string;
	}

	const { content, className = '' }: Props = $props();

	const renderedContent = $derived(sanitizeHTML(content || ''));
</script>

<style>
	div {
		width: 100%;
	}
</style>

<div class={className}>
	{@html renderedContent}
</div>
