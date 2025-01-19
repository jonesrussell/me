<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import NewsletterCTA from '$lib/components/NewsletterCTA.svelte';
	import '../app.css';
	const { children } = $props();
</script>

<div class="layout">
	<Header />

	<main class="content">
		<div class="content-inner">
			{@render children()}
		</div>
	</main>

	<section aria-label="Newsletter Signup" class="newsletter-section">
		<div class="container">
			<NewsletterCTA />
		</div>
	</section>

	<Footer />
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 100vh;
		overflow-x: hidden;
	}

	.content {
		flex: 1;
		width: 100%;
		padding: var(--ch2) var(--content-padding);
		box-sizing: border-box;
	}

	.content-inner {
		display: flex;
		flex-direction: column;
		gap: var(--ch4);
		width: 100%;
		max-width: min(var(--measure), 100%);
		margin: 0 auto;
	}

	.newsletter-section {
		padding: var(--ch4) 0;
		background: var(--bg-alt);
		border-top: 1px solid var(--border-color);
	}

	.container {
		width: 100%;
		max-width: min(var(--measure), 100%);
		margin: 0 auto;
		padding: 0 var(--content-padding);
		box-sizing: border-box;
	}
</style>
