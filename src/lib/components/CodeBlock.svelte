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

		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-tight);

		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-md);
		white-space: pre;
	}

	.file-header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: var(--space-2) var(--space-4);
		border-bottom: var(--border-width) solid var(--border-color);
	}

	.filename {
		font-weight: var(--font-weight-medium);
		color: var(--text-color);
	}

	.language {
		font-size: var(--font-size-xs);
		color: var(--text-muted);
	}

	.code-content {
		overflow-x: auto;
		padding: var(--space-4);
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
		font-size: var(--font-size-xs);
		color: var(--text-muted);
	}

	.line-number {
		user-select: none;
		font-size: var(--font-size-xs);
		color: var(--text-muted);
	}
</style>
