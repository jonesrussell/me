<script lang="ts">
	import { page } from '$app/stores';
	import { fetchPost, formatPostDate } from '$lib/services/blog-service';
	import type { BlogPost } from '$lib/services/blog-service';
	import { fade } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import 'highlight.js/styles/github-dark.css';
	import hljs from 'highlight.js/lib/core';
	import php from 'highlight.js/lib/languages/php';
	import xml from 'highlight.js/lib/languages/xml';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('php', php);
	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('typescript', typescript);

	let post = $state<BlogPost | null>(null);
	let error = $state<string | null>(null);

	$effect(() => {
		const slug = $page.params.slug;
		async function loadPost() {
			try {
				const result = await fetchPost(slug);
				post = result;
				// Highlight code blocks after content is loaded
				setTimeout(() => {
					document.querySelectorAll('pre code').forEach((block) => {
						hljs.highlightElement(block as HTMLElement);
					});
				}, 0);
			} catch (e) {
				error = e instanceof Error ? e.message : 'Failed to load post';
			}
		}
		loadPost();
	});
</script>

<style>
	.blog {
		width: 100%;
		padding: var(--space-8) 0;
		container-type: inline-size;
		container-name: blog-page;
	}

	.post {
		width: 100%;
		max-width: min(40ch, 95cqi);
		margin: var(--space-8) auto 0;
		padding: var(--space-4);
	}

	.post-header {
		margin-bottom: var(--space-8);
		text-align: center;
	}

	h1 {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-tight);
		color: var(--text-color);
		background: linear-gradient(to right, var(--accent-color), var(--accent-color-hover));
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.metadata {
		margin: var(--space-4) 0 0 0;
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.metadata time {
		font-family: var(--font-mono);
	}

	.content {
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--text-color);
		width: 100%;
		font-family: var(--font-sans);
	}

	.content :global(p) {
		margin: var(--space-6) 0;
		line-height: var(--line-height-relaxed);
	}

	.content :global(h2) {
		font-family: var(--font-mono);
		font-size: var(--font-size-xl);
		margin: var(--space-12) 0 var(--space-6);
		color: var(--text-color);
		line-height: var(--line-height-tight);
	}

	.content :global(h3) {
		font-family: var(--font-mono);
		font-size: var(--font-size-lg);
		margin: var(--space-8) 0 var(--space-4);
		color: var(--text-color);
		line-height: var(--line-height-tight);
	}

	.content :global(ul),
	.content :global(ol) {
		margin: var(--space-6) 0;
		padding-left: var(--space-8);
	}

	.content :global(li) {
		margin: var(--space-3) 0;
	}

	.content :global(a) {
		color: var(--accent-color);
		text-decoration: none;
		border-bottom: 1px solid transparent;
		transition: all var(--transition-duration) var(--transition-timing);
	}

	.content :global(a:hover) {
		color: var(--accent-color-hover);
		border-bottom-color: currentColor;
	}

	.content :global(code) {
		font-family: var(--font-mono);
		background: var(--bg-darker);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
		font-size: 0.9em;
		color: var(--accent-color);
	}

	.content :global(pre) {
		background: var(--bg-darker);
		padding: var(--space-6);
		border-radius: var(--radius-lg);
		overflow-x: auto;
		margin: var(--space-8) 0;
		border: var(--border-width) solid var(--border-color);
		position: relative;
		box-shadow: inset 0 0 0 1px rgba(var(--accent-color-rgb), 0.1);
	}

	.content :global(pre code) {
		padding: 0;
		background: none;
		color: var(--text-color);
		font-size: calc(var(--font-size-base) * 0.95);
		line-height: 1.75;
		font-family: var(--font-mono);
		tab-size: 2;
		display: block;
		letter-spacing: -0.025em;
	}

	.content :global(pre code.hljs) {
		background: transparent;
		padding: 0;
	}

	/* Enhance syntax highlighting colors */
	:global(.hljs-keyword),
	:global(.hljs-built_in) {
		color: var(--accent-color);
		font-weight: 600;
	}

	:global(.hljs-string) {
		color: #98c379;
	}

	:global(.hljs-comment) {
		color: var(--text-muted);
		font-style: italic;
		opacity: 0.8;
	}

	:global(.hljs-function) {
		color: #61afef;
		font-weight: 500;
	}

	:global(.hljs-class) {
		color: #e5c07b;
		font-weight: 600;
	}

	:global(.hljs-variable) {
		color: #e06c75;
	}

	:global(.hljs-operator) {
		color: #56b6c2;
		font-weight: 500;
	}

	.content :global(blockquote) {
		border-left: 4px solid var(--accent-color);
		margin: var(--space-6) 0;
		padding: var(--space-6) var(--space-8);
		background: var(--bg-darker);
		border-radius: var(--radius-sm);
		font-style: italic;
		color: var(--text-muted);
	}

	.content :global(blockquote p) {
		margin: 0;
	}

	.content :global(hr) {
		border: none;
		border-top: var(--border-width) solid var(--border-color);
		margin: var(--space-8) 0;
	}

	@container blog-page (width >= 48ch) {
		.post {
			max-width: min(60ch, 95cqi);
			padding: var(--space-8);
			margin-top: var(--space-16);
		}

		h1 {
			font-size: var(--font-size-2xl);
		}

		.content {
			font-size: var(--font-size-lg);
		}
	}

	@container blog-page (width >= 80ch) {
		.post {
			max-width: min(70ch, 95cqi);
			padding: var(--space-12);
		}

		h1 {
			font-size: var(--font-size-3xl);
		}
	}
</style>

<div class="blog">
	<div class="post" in:fade={{ duration: 500, easing: elasticOut }}>
		{#if error}
			<div class="error" role="alert">
				<p>{error}</p>
			</div>
		{:else if post}
			<header class="post-header">
				<h1>{post.title}</h1>
				<div class="metadata">
					<time datetime={post.published}>{formatPostDate(post.published)}</time>
				</div>
			</header>
			<div class="content">
				{post.content}
			</div>
		{:else}
			<div class="loading">Loading...</div>
		{/if}
	</div>
</div>
