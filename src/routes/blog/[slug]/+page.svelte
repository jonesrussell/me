<script lang="ts">
	import BlogPost from '$lib/components/blog/BlogPost.svelte';
	import EditorialStatus from '$lib/components/blog/EditorialStatus.svelte';
	import { resolve } from '$app/paths';
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

<style>
	.blog-page {
		min-height: 100vh;
		background: var(--color-surface);
	}
</style>

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
	{@html `<script type="application/ld+json">${JSON.stringify(articleJsonLd).replaceAll('<', '\\u003c')}</scr` +
		`ipt>`}
</svelte:head>

<div class="blog-page">
	<div class="site-container section-space"><EditorialStatus /></div>
	<BlogPost post={data.post} />
	<div class="site-container section-space">
		<a class="text-link" href={resolve('/blog')}>More writing <span aria-hidden="true">→</span></a>
	</div>
</div>
