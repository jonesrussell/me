<script lang="ts">
	import '@fontsource/fira-mono';
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import NewsletterCTA from '$lib/components/NewsletterCTA.svelte';
	import { onMount } from 'svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<div class="layout" class:mounted>
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
		opacity: 0;
		transition: opacity 0.3s;
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

	.mounted {
		opacity: 1;
	}
</style>
