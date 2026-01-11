<script lang="ts">
	import SafeHtml from '$lib/components/SafeHtml.svelte';
	import { highlightCode } from '$lib/actions/highlight-code';

	const { content } = $props<{ content: string }>();

	function stripCdata(htmlContent: string): string {
		return htmlContent.replace(/^<!\[CDATA\[|\]\]>$/g, '');
	}
</script>

<style>
	/* Responsive adjustments */
	@container post-content (width < 30rem) {
		:global(.prose) {
			padding: 0 var(--space-4);
		}

		:global(.prose h3) {
			font-size: var(--font-size-lg);
		}

		:global(.prose pre) {
			padding: var(--space-3);
			font-size: var(--font-size-xs);
		}
	}

	.post-content {
		container-type: inline-size;
		container-name: post-content;
		width: 100%;
		margin-top: var(--space-8);
	}

	.no-content {
		padding: var(--space-8);
		text-align: center;
		color: var(--color-text-muted);
		font-style: italic;
	}

	/* Blog Content Styles */
	:global(.prose) {
		max-width: min(var(--measure), 95cqi);
		margin: 0 auto;
		line-height: 1.6;
		color: var(--color-text);
	}

	:global(.prose p) {
		margin-bottom: var(--space-4);
		text-align: justify;
	}

	:global(.prose h2) {
		margin: var(--space-8) 0 var(--space-4);
		padding-bottom: var(--space-2);
		font-size: var(--font-size-2xl);
		font-weight: 600;
		color: var(--color-heading);
		border-bottom: 0.125rem solid var(--color-border);
	}

	:global(.prose h3) {
		margin: var(--space-6) 0 var(--space-3);
		font-size: var(--font-size-xl);
		font-weight: 600;
		color: var(--color-heading);
	}

	:global(.prose h4) {
		margin: var(--space-4) 0 var(--space-2);
		font-size: var(--font-size-lg);
		font-weight: 600;
		color: var(--color-heading);
	}

	:global(.prose ul),
	:global(.prose ol) {
		margin: var(--space-4) 0;
		padding-left: var(--space-6);
	}

	:global(.prose li) {
		margin-bottom: var(--space-2);
	}

	:global(.prose blockquote) {
		margin: var(--space-6) 0;
		padding-left: var(--space-4);
		color: var(--color-text-muted);
		border-left: 0.25rem solid var(--color-primary);
		font-style: italic;
	}

	:global(.prose pre) {
		margin: var(--space-6) 0;
		padding: var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		background: var(--color-surface-elevated);
		border: 0.0625rem solid var(--color-border);
		border-radius: var(--radius-md);
		overflow-x: auto;
	}

	:global(.prose code) {
		padding: var(--space-1) var(--space-2);
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: var(--color-text);
		background: var(--color-surface-elevated);
		border-radius: var(--radius-sm);
	}

	:global(.prose pre code) {
		padding: 0;
		color: inherit;
		background: none;
		border-radius: 0;
	}

	:global(.prose a) {
		text-decoration: underline;
		color: var(--color-primary);
		transition: color 0.2s ease;
		text-decoration-color: var(--color-primary-muted);
		text-underline-offset: 0.125rem;
	}

	:global(.prose a:hover) {
		color: var(--color-primary-hover);
		text-decoration-color: var(--color-primary-hover);
	}

	:global(.prose img) {
		height: auto;
		margin: var(--space-6) 0;
		border-radius: var(--radius-md);
		max-width: 100%;
	}

	:global(.prose table) {
		width: 100%;
		border-collapse: collapse;
		margin: var(--space-6) 0;
		font-size: var(--font-size-sm);
	}

	:global(.prose th),
	:global(.prose td) {
		padding: var(--space-3);
		text-align: left;
		border-bottom: 0.0625rem solid var(--color-border);
	}

	:global(.prose th) {
		font-weight: 600;
		color: var(--color-heading);
		background: var(--color-surface-elevated);
	}

	:global(.prose hr) {
		margin: var(--space-8) 0;
		border: none;
		border-top: 0.0625rem solid var(--color-border);
	}

	/* Syntax highlighting overrides */
	:global(.prose .hljs) {
		padding: 0;
		background: transparent;
	}

	:global(.prose .hljs-keyword) {
		color: var(--color-primary);
	}

	:global(.prose .hljs-string) {
		color: var(--color-success);
	}

	:global(.prose .hljs-comment) {
		color: var(--color-text-muted);
		font-style: italic;
	}

	:global(.prose .hljs-number) {
		color: var(--color-warning);
	}

	:global(.prose .hljs-function) {
		color: var(--color-info);
	}

	:global(.prose .hljs-class) {
		color: var(--color-primary);
	}

	:global(.prose .hljs-variable) {
		color: var(--color-text);
	}
</style>

<main class="post-content" use:highlightCode>
	{#if content}
		<SafeHtml content={stripCdata(content)} className="prose" />
	{:else}
		<div class="no-content">No content available for this post.</div>
	{/if}
</main>
