<script lang="ts">
	import '../app.css';
	import SkipToMain from '$lib/components/SkipToMain.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	const { children, url } = $props<{ children: any; url: URL }>();
</script>

<svelte:head>
	<link
		rel="preload"
		href="/node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
</svelte:head>

<SkipToMain />

<div class="site">
	<Header {url} />

	{@render children()}

	<Footer />
</div>

<style>
	.site {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100%;
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			transition: none !important;
			animation: none !important;
		}
	}
</style>
