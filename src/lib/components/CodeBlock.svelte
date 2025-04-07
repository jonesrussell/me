<script lang="ts">
	const {
		language = '',
		filename = undefined,
		width = 60,
		children
	} = $props<{
		language?: string;
		filename?: string;
		width?: number;
		children?: () => unknown;
	}>();

	const content = $derived(children?.() ?? '');
	const lineCount = $derived(
		content.toString().split('\n').filter(Boolean).length
	);
</script>

<div
	class="code-block"
	style="

--block-width: {width}ch"
>
	{#if filename}
		<div class="file-header">
			<span class="filename">{filename}</span>
			<span class="language">{language}</span>
		</div>
	{/if}

	<div class="code-content">
		<pre><code class={language}>{content}</code></pre>
	</div>

	<div class="code-footer">
		<span class="line-count">
			{lineCount} lines
		</span>
	</div>
</div>

<style>
	.code-block {
		width: var(--block-width);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--bg-darker);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-tight);
		white-space: pre;
		box-shadow: var(--shadow-md);
	}

	.file-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-2) var(--space-4);
		border-bottom: var(--border-width) solid var(--border-color);
	}

	.filename {
		color: var(--text-color);
		font-weight: var(--font-weight-medium);
	}

	.language {
		color: var(--text-muted);
		font-size: var(--font-size-xs);
	}

	.code-content {
		padding: var(--space-4);
		overflow-x: auto;
	}

	pre {
		margin: 0;
		padding: 0;
	}

	code {
		font-family: inherit;
	}

	.code-footer {
		padding: var(--space-2) var(--space-4);
		border-top: var(--border-width) solid var(--border-color);
		color: var(--text-muted);
		font-size: var(--font-size-xs);
	}

	.line-number {
		color: var(--text-muted);
		font-size: var(--font-size-xs);
		user-select: none;
	}
</style>
