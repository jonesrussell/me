<script lang="ts">
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	import NewsletterCTA from '../components/NewsletterCTA.svelte';
</script>

<div class="layout">
	<Header />

	<main class="content">
		<slot />
	</main>

	<NewsletterCTA />
	<Footer />
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		gap: var(--spacing);
	}

	.content {
		flex: 1;
		width: 100%;
		max-width: var(--measure);
		margin: 0 auto;
		padding: 0 var(--spacing);
	}
</style>
