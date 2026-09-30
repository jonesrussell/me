<script lang="ts">
	import { base } from '$app/paths';
	import { canonicalUrl } from '$lib/config/seo';
	const { title, description, path } = $props<{
		title: string;
		description: string;
		path: string;
	}>();
</script>

<svelte:head>
	<title>{title} | Russell Jones</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl(base, path)} />
	<meta property="og:title" content={`${title} | Russell Jones`} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl(base, path)} />
	<meta property="og:image" content={canonicalUrl(base, '/og.png')} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
