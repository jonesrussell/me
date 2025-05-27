<script lang="ts">
	import '../app.css';
	import SkipToMain from '$lib/components/navigation/SkipToMain.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import NewsletterCTA from '$lib/components/content/NewsletterCTA.svelte';
	import { page } from '$app/stores';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	const { children } = $props<{
		children: () => unknown;
	}>();

	onMount(() => {
		// Initialize theme on mount
		const savedTheme = localStorage.getItem('theme') as 'auto' | 'light' | 'dark' | null;
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';

		if (savedTheme) {
			theme.set(savedTheme);
			document.documentElement.setAttribute(
				'data-theme',
				savedTheme === 'auto' ? systemTheme : savedTheme
			);
		} else {
			theme.set('auto');
			document.documentElement.setAttribute('data-theme', systemTheme);
		}

		// Debug container widths
		const debugContainerWidths = () => {
			const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
			const containerWidth = document
				.querySelector('.newsletter-container')
				?.getBoundingClientRect().width;
			console.debug('Container Debug:', {
				rootFontSize,
				'30rem in px': 30 * rootFontSize,
				containerWidth,
				windowWidth: window.innerWidth
			});
		};

		// Initial debug
		debugContainerWidths();

		// Debug on resize
		window.addEventListener('resize', debugContainerWidths);

		// Listen for system theme changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => {
			if ($theme === 'auto') {
				document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
			}
		};
		mediaQuery.addEventListener('change', handleChange);
		return () => {
			mediaQuery.removeEventListener('change', handleChange);
			window.removeEventListener('resize', debugContainerWidths);
		};
	});
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
