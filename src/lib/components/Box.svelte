<script lang="ts">
	interface BoxProps {
		title?: string;
		content?: string;
		width?: number;
		// No need to explicitly define children as it's handled by Svelte slots
	}

	export let title: BoxProps['title'] = undefined;
	export let content: BoxProps['content'] = undefined;
	export let width: BoxProps['width'] = undefined;
</script>

<div class="box" style:width={width ? `${width}ch` : undefined}>
	{#if title}
		<div class="title">{title}</div>
	{/if}
	{#if content}
		<div class="content">{content}</div>
	{/if}
	<slot />
	<!-- This allows for child content -->
</div>

<style>
	.box {
		width: var(--box-width);
		font-family: var(--font-mono);
		line-height: 1.2;
		white-space: pre;
	}

	.title {
		color: var(--text-color);
		font-weight: bold;
	}

	.content {
		color: var(--text-color);
	}
</style>
