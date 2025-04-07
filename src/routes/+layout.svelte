<script lang="ts">
	import '../app.css';
	import SkipToMain from '$lib/components/SkipToMain.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	const { children } = $props();
</script>

<SkipToMain />

<div class="site">
	<Header />

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
