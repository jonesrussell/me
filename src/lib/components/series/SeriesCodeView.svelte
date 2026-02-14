<script lang="ts">
	import type { ISeriesCodeFile } from '$lib/types/series';
	import { highlightCode } from '$lib/actions/highlight-code';

	const { sourceFiles, testFiles, repoUrl } = $props<{
		sourceFiles: ISeriesCodeFile[];
		testFiles: ISeriesCodeFile[];
		repoUrl: string;
	}>();

	let activeTab = $state<'source' | 'tests'>('source');

	const activeFiles = $derived(activeTab === 'source' ? sourceFiles : testFiles);

	function githubUrl(filePath: string): string {
		return `${repoUrl}/blob/main/${filePath}`;
	}
</script>

<div class="code-view">
	<div class="tab-bar" role="tablist">
		<button
			class="tab-button"
			class:active={activeTab === 'source'}
			role="tab"
			aria-selected={activeTab === 'source'}
			onclick={() => (activeTab = 'source')}
		>
			Source
		</button>
		<button
			class="tab-button"
			class:active={activeTab === 'tests'}
			role="tab"
			aria-selected={activeTab === 'tests'}
			onclick={() => (activeTab = 'tests')}
		>
			Tests
		</button>
	</div>

	<div class="tab-panel" role="tabpanel" use:highlightCode>
		{#each activeFiles as file (file.path)}
			<div class="file-block">
				<div class="file-header">
					<span class="file-path">{file.path}</span>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a class="github-link" href={githubUrl(file.path)} target="_blank" rel="noopener noreferrer">
						View on GitHub
					</a>
				</div>
				<pre><code class="language-{file.language}">{file.content}</code></pre>
			</div>
		{/each}
	</div>
</div>

<style>
	.code-view {
		border: 0.0625rem solid var(--border-color);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.tab-bar {
		display: flex;
		gap: 0;
		background: var(--bg-darker);
		border-block-end: 0.0625rem solid var(--border-color);
	}

	.tab-button {
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		background: transparent;
		border: none;
		border-block-end: 0.125rem solid transparent;
		cursor: pointer;
	}

	.tab-button.active {
		color: var(--accent-color);
		border-block-end-color: var(--accent-color);
	}

	.tab-panel {
		background: var(--bg-darker);
	}

	.file-block {
		border-block-end: 0.0625rem solid var(--border-color);
	}

	.file-block:last-child {
		border-block-end: none;
	}

	.file-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-2) var(--space-3);
		background: var(--bg-darker);
		border-block-end: 0.0625rem solid var(--border-color);
	}

	.file-path {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-muted);
	}

	.github-link {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		text-decoration: none;
		color: var(--accent-color);
	}

	.github-link:hover {
		text-decoration: underline;
	}

	pre {
		margin: 0;
		padding: var(--space-3);
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
	}

	code {
		font-family: inherit;
		color: var(--text-color);
	}

	@media (prefers-reduced-motion: reduce) {
		.tab-button {
			transition: none;
		}
	}
</style>
