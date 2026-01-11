<script lang="ts">
	import SkipToMain from '$lib/components/navigation/SkipToMain.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import NewsletterCTA from '$lib/components/newsletter/NewsletterCTA.svelte';
	import { page } from '$app/stores';
	// Theme initialization is handled by the theme store module

	import '../app.css';

	const { children } = $props<{
		children: () => unknown;
	}>();
</script>

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

<SkipToMain />

<div class="site">
	<Header url={$page.url} />

	{@render children()}

	<NewsletterCTA class="newsletter-cta" />

	<Footer />
</div>
