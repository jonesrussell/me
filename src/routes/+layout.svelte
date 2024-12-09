<script lang="ts">
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
</script>

<div class="layout">
	<Header />

	<main class="content">
		<slot />
	</main>

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
