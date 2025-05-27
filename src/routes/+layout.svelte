<script lang="ts">
	import '../app.css';
	import SkipToMain from '$lib/components/navigation/SkipToMain.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import NewsletterCTA from '$lib/components/ui/NewsletterCTA.svelte';
	import { page } from '$app/stores';

	const { children } = $props<{
		children: () => unknown;
	}>();
</script>

<style>
	.site {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100%;
	}

	.newsletter-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: var(--space-8) 0;
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

	<div class="newsletter-container">
		<NewsletterCTA />
	</div>
	<Footer />
</div>
