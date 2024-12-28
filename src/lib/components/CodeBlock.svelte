<script lang="ts">
	import { alignToGrid } from '$lib/utils/grid';

	export let language = '';
	export let filename: string | undefined = undefined;
	export let width = 60;

	$: alignedWidth = alignToGrid(width);

	// Get the content of the default slot
	let content = '';
	$: if ($$slots.default) {
		content = $$slots.default.toString();
	}
</script>

<div class="code-block" style="--block-width: {alignedWidth}ch">
	{#if filename}
		<div class="file-header">
			<span class="filename">{filename}</span>
			<span class="language">{language}</span>
		</div>
	{/if}

	<div class="code-content">
		<pre><code class={language}><slot /></code></pre>
	</div>

	<div class="code-footer">
		<span class="line-count">
			{content.split('\n').length} lines
		</span>
	</div>
</div>

<style>
	.code-block {
		width: var(--block-width);
		font-family: var(--font-mono);
		background: var(--bg-color);
		border: 1px solid var(--border-color);
		line-height: 1.2;
	}

	.file-header {
		padding: var(--ch) var(--ch2);
		border-bottom: 1px solid var(--border-color);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.filename {
		color: var(--text-color);
	}

	.language {
		color: var(--text-muted);
		font-size: 0.9em;
	}

	.code-content {
		padding: var(--ch2);
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
		padding: var(--ch) var(--ch2);
		border-top: 1px solid var(--border-color);
		color: var(--text-muted);
		font-size: 0.9em;
	}
</style>
