<script lang="ts">
	import '@fontsource/fira-mono';
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import NewsletterCTA from '$lib/components/NewsletterCTA.svelte';
</script>

<div class="layout">
	<Header />

	<main class="content">
		<div class="content-inner">
			<slot />
		</div>
	</main>

	<NewsletterCTA />

	<Footer />
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100%;
		overflow-x: hidden;
	}

	.content {
		flex: 1;
		width: 100%;
		padding: 0 var(--content-padding);
		box-sizing: border-box;
	}

	.content-inner {
		max-width: min(var(--measure), 100%);
		margin: 0 auto;
		width: 100%;
	}
</style>
