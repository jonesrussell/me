<script lang="ts">
	import SkipToMain from '$lib/components/navigation/SkipToMain.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import GoFormXPlaceholder from '$lib/components/forms/GoFormXPlaceholder.svelte';
	import { page } from '$app/state';
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
	<Header url={page.url} />

	{@render children()}

	<GoFormXPlaceholder
		title="Stay Updated"
		description="Subscribe to my newsletter for updates on web development, tech insights, and open source projects."
		variant="section"
		class="newsletter-cta"
	/>

	<Footer />
</div>
