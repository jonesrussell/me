<script lang="ts">
	import { page } from '$app/stores';
	import { fetchPost, formatPostDate } from '$lib/services/blog-service';
	import type { BlogPost } from '$lib/types/blog';
	import { fade } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import 'highlight.js/styles/github-dark.css';
	import hljs from 'highlight.js/lib/core';
	import php from 'highlight.js/lib/languages/php';
	import xml from 'highlight.js/lib/languages/xml';
	import typescript from 'highlight.js/lib/languages/typescript';
	import SafeHtml from '$lib/components/SafeHtml.svelte';

	hljs.registerLanguage('php', php);
	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('typescript', typescript);

	let post = $state<BlogPost | null>(null);
	let error = $state<string | null>(null);

	function stripCdata(content: string): string {
		return content.replace(/^<!\[CDATA\[|\]\]>$/g, '');
	}

	$effect(() => {
		const slug = $page.params.slug;
		async function loadPost() {
			try {
				const result = await fetchPost(slug);
				post = result;
				console.debug('Loaded post:', post);
				console.debug('Post content:', post?.content);
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
	@media (--container-sm) {
		.post {
			margin-top: var(--space-16);
			padding: var(--space-8);
			max-width: 40rem;
		}

		h1 {
			font-size: var(--font-size-2xl);
		}

		.content {
			font-size: var(--font-size-lg);
		}
	}

	@media (--container-md) {
		.post {
			max-width: 48rem;
			padding: var(--space-12);
		}

		h1 {
			font-size: var(--font-size-3xl);
		}
	}

	@media (--container-lg) {
		.post {
			max-width: 50rem;
		}
	}

	@container blog-page (width >= 30rem) {
		.post {
			margin-top: var(--space-16);
			padding: var(--space-8);
			max-width: min(var(--measure), 95cqi);
		}

		h1 {
			font-size: var(--font-size-2xl);
		}

		.content {
			font-size: var(--font-size-lg);
		}
	}

	@container blog-page (width >= 50rem) {
		.post {
			max-width: min(var(--measure), 95cqi);
			padding: var(--space-12);
		}

		h1 {
			font-size: var(--font-size-3xl);
		}
	}

	@container blog-page (width >= 75rem) {
		.post {
			max-width: min(var(--measure), 95cqi);
		}
	}

	.blog {
		container-type: inline-size;
		container-name: blog-page;
		width: 100%;
		padding: var(--space-4) 0;
	}

	.container {
		display: flex;
		width: 100%;
		margin: 0 auto;
		padding: 0 var(--space-4);
		max-width: min(var(--measure), 95cqi);
		flex-direction: column;
	}

	.post {
		width: 100%;
		max-width: 100%;
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
		width: 100%;
		font-family: var(--font-sans);
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--text-color);
	}

	.content :global(p) {
		margin: var(--space-6) 0;
		line-height: var(--line-height-relaxed);
	}

	.content :global(h2) {
		margin: var(--space-12) 0 var(--space-6);
		font-family: var(--font-mono);
		font-size: var(--font-size-xl);
		line-height: var(--line-height-tight);
		color: var(--text-color);
	}

	.content :global(h3) {
		margin: var(--space-8) 0 var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--font-size-lg);
		line-height: var(--line-height-tight);
		color: var(--text-color);
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
		text-decoration: none;
		color: var(--accent-color);
		transition: all var(--transition-duration) var(--transition-timing);
		border-bottom: 0.0625rem solid transparent;
	}

	.content :global(a:hover) {
		color: var(--accent-color-hover);
		border-bottom-color: currentcolor;
	}

	.content :global(code) {
		padding: var(--space-1) var(--space-2);
		font-family: var(--font-mono);
		font-size: 0.9ch;
		color: var(--accent-color);
		background: var(--bg-darker);
		border-radius: var(--radius-sm);
	}

	.content :global(pre) {
		position: relative;
		margin: var(--space-8) 0;
		padding: var(--space-6);
		background: var(--bg-darker);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-lg);
		box-shadow: inset 0 0 0 0.0625rem rgb(var(--accent-color-rgb), 0.1);
		overflow-x: auto;
	}

	.content :global(pre code) {
		display: block;
		padding: 0;
		font-family: var(--font-mono);
		font-size: calc(var(--font-size-base) * 0.95);
		line-height: 1.75;
		color: var(--text-color);
		background: none;
		tab-size: 0.125rem;
		letter-spacing: -0.025ch;
	}

	.content :global(pre code.hljs) {
		padding: 0;
		background: transparent;
	}

	/* Enhance syntax highlighting colors */
	:global(.hljs-keyword),
	:global(.hljs-builtin) {
		font-weight: 600;
		color: var(--accent-color);
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
		font-weight: 500;
		color: #61afef;
	}

	:global(.hljs-class) {
		font-weight: 600;
		color: #e5c07b;
	}

	:global(.hljs-variable) {
		color: #e06c75;
	}

	:global(.hljs-operator) {
		font-weight: 500;
		color: #56b6c2;
	}

	.content :global(blockquote) {
		margin: var(--space-6) 0;
		padding: var(--space-6) var(--space-8);
		color: var(--text-muted);
		background: var(--bg-darker);
		border-radius: var(--radius-sm);
		border-left: 0.25rem solid var(--accent-color);
		font-style: italic;
	}

	.content :global(blockquote p) {
		margin: 0;
	}

	.content :global(hr) {
		margin: var(--space-8) 0;
		border: none;
		border-top: var(--border-width) solid var(--border-color);
	}
</style>

<div class="blog">
	<div class="container">
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
					{#if post.content}
						<SafeHtml content={stripCdata(post.content)} className="content" />
					{:else}
						<div>No content found for this post.</div>
					{/if}
				</div>
			{:else}
				<div class="loading">Loading...</div>
			{/if}
		</div>
	</div>
</div>
