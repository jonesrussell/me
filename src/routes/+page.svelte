<script lang="ts">
	import Terminal from '$lib/components/terminal/Terminal.svelte';
	import YouTubeSection from '$lib/components/video/YouTubeSection.svelte';
	import ActionNavCards from '$lib/components/navigation/ActionNavCards.svelte';
	import SpecialtyGrid from '$lib/components/content/SpecialtyGrid.svelte';
	import Hero from '$lib/components/ui/Hero.svelte';
	import type { Specialty } from '$lib/types/specialty';

	interface PageData {
		terminalCommand: string;
		specialties: Specialty[];
		youtubeChannel: string;
		youtubeVideoId: string;
		youtubeVideoTitle: string;
		youtubeSectionTitle: string;
		youtubeSectionSubtitle: string;
		navLinks: Array<{ href: string; icon: string; text: string }>;
	}

	export let data: PageData;
</script>

<style>
	.home {
		container-type: inline-size;
		container-name: home-page;
		display: grid;
		width: 100%;
		padding: var(--space-16) 0;
		grid-template-rows: auto 1fr;
		gap: var(--space-16);
	}

	.home-container {
		display: grid;
		width: 100%;
		margin-inline: auto;
		padding-inline: var(--space-4);
		max-width: min(var(--measure), 95cqi);
		gap: var(--space-16);
		grid-template-columns: minmax(0, 1fr);
	}

	@container home-page (--container-sm) {
		.home-container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-8);
		}
	}

	@container home-page (--container-md) {
		.home-container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-12);
		}
	}

	@container home-page (--container-lg) {
		.home-container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-16);
		}
	}

	@container home-page (--container-xl) {
		.home-container {
			max-width: 100%;
			padding-inline: 0;
		}
	}

	:global(.youtube-section) {
		margin-top: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			transition: none;
			animation: none;
		}
	}

	.gf-section--cta {
		margin-top: var(--space-16);
		padding: var(--space-8);
		background: var(--color-background-alt);
		border-radius: var(--radius-lg);
	}
</style>

<svelte:head>
	<title>Russell Jones | Developing without limits</title>
	<meta
		name="description"
		content="Limitless Developer from Canada specializing in JavaScript, Go, Cloud Technologies, and Open Source. Building elegant solutions with modern web technologies."
	/>
</svelte:head>

<Hero>
	<Terminal />
</Hero>

<main class="home">
	<div class="home-container">
		<SpecialtyGrid
			specialties={data.specialties}
			title="My Specialties"
			description="Expert solutions for your unique challenges"
		/>
		<YouTubeSection
			channelUrl={data.youtubeChannel}
			videoId={data.youtubeVideoId}
			videoTitle={data.youtubeVideoTitle}
			sectionTitle={data.youtubeSectionTitle}
			sectionSubtitle={data.youtubeSectionSubtitle}
		/>
		<ActionNavCards links={data.navLinks} />
		<div id="cta-form-container" class="gf-section gf-section--cta"></div>
	</div>
</main>
