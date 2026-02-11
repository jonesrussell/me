<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import GoFormXPlaceholder from '$lib/components/forms/GoFormXPlaceholder.svelte';
	import { canonicalUrl } from '$lib/config/seo';
	// Theme initialization is handled by the theme store module

	import '../app.css';

	const { children } = $props<{
		children: () => unknown;
	}>();

	const siteUrl = canonicalUrl(base, '/');
	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				name: 'Russell Jones',
				url: siteUrl,
				description: 'Crafting elegant solutions with modern web technologies'
			},
			{
				'@type': 'Person',
				name: 'Russell Jones',
				url: siteUrl
			}
		]
	});
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON-LD from our config only -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</scr` + `ipt>`}
</svelte:head>

<style>
	.site {
		container-type: inline-size;
		container-name: site;
		display: grid;
		grid-template-rows: auto 1fr auto;
		width: 100%;
		min-height: 100vh;
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			transition: none;
			animation: none;
		}
	}
</style>

<div class="site">
	<Header url={page.url} />

	<main id="main" tabindex="-1">
		{@render children()}

		<GoFormXPlaceholder
			title="Stay Updated"
			description="Subscribe to my newsletter for updates on web development, tech insights, and open source projects."
			variant="section"
			class="newsletter-cta"
		/>
	</main>

	<Footer />
</div>
