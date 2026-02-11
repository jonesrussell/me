<script lang="ts">
	import BlogPost from '$lib/components/blog/BlogPost.svelte';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();

	const articleJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: data.post.title,
		datePublished: data.post.published,
		author: {
			'@type': 'Person',
			name: 'Russell Jones'
		},
		url: data.canonical
	});
</script>

<svelte:head>
	<title>{data.post.title} | Russell Jones</title>
	<meta name="description" content={data.description} />
	<link rel="canonical" href={data.canonical} />
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={data.canonical} />
	<meta property="article:published_time" content={data.post.published} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.post.title} />
	<meta name="twitter:description" content={data.description} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON-LD from load data only -->
	{@html `<script type="application/ld+json">${JSON.stringify(articleJsonLd)}</scr` + `ipt>`}
</svelte:head>

<style>
	.blog-page {
		min-height: 100vh;
		background: var(--color-surface);
	}
</style>

<div class="blog-page">
	<BlogPost post={data.post} />
</div>
