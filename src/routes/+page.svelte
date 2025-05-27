<script lang="ts">
	import Terminal from '$lib/components/terminal/Terminal.svelte';
	import YouTubeSection from '$lib/components/video/YouTubeSection.svelte';
	import ActionNavCards from '$lib/components/navigation/ActionNavCards.svelte';
	import SpecialtyGrid from '$lib/components/content/SpecialtyGrid.svelte';
	import Hero from '$lib/components/ui/Hero.svelte';

	const YOUTUBE_CHANNEL = 'https://youtube.com/@fullstackdev42';
	const YOUTUBE_VIDEO_ID = 'B4v7ZDLxiS4';
	const YOUTUBE_VIDEO_TITLE = 'Add a Google Font to Tailwind CSS | 2023';
	const YOUTUBE_SECTION_TITLE = 'Latest Video';
	const YOUTUBE_SECTION_SUBTITLE = 'Check out my latest YouTube tutorial';
	const TERMINAL_COMMAND = 'npm run dev';

	const specialties = [
		{
			title: 'Modern JavaScript/TS',
			description: 'Building the future with cutting-edge web technologies',
			icon: '⚡'
		},
		{
			title: 'Golang & PHP',
			description: 'Crafting robust backend solutions with battle-tested technologies',
			icon: '🔧'
		},
		{
			title: 'AI Integration',
			description: 'Harnessing artificial intelligence to solve complex problems',
			icon: '🤖'
		},
		{
			title: 'Cloud & DevOps',
			description: 'Designing and automating scalable cloud-native solutions',
			icon: '☁️'
		}
	];

	const navLinks = [
		{ href: '/blog', icon: '📝', text: 'Read my technical articles' },
		{ href: '/projects', icon: '🚀', text: 'Browse my open source projects' },
		{ href: '/contact', icon: '✉️', text: 'Get in touch' }
	];
</script>

<style>
	.home {
		container-type: inline-size;
		container-name: home-page;
		width: 100%;
		padding: var(--space-16) 0;
	}

	.container {
		display: flex;
		width: 100%;
		margin: 0 auto;
		padding: 0 var(--space-4);
		max-width: min(var(--measure), 95cqi);
		flex-direction: column;
		gap: var(--space-16);
	}

	@container home-page (width >= 30rem) {
		.container {
			max-width: min(var(--measure), 95cqi);
		}
	}

	@container home-page (width >= 50rem) {
		.container {
			max-width: min(var(--measure), 95cqi);
		}
	}

	@container home-page (width >= 75rem) {
		.container {
			max-width: min(var(--measure), 95cqi);
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
</style>

<svelte:head>
	<title>Russell Jones | Developing without limits</title>
	<meta
		name="description"
		content="Limitless Developer from Canada specializing in JavaScript, Go, Cloud Technologies, and Open Source. Building elegant solutions with modern web technologies."
	/>
</svelte:head>

<Hero>
	<Terminal command={TERMINAL_COMMAND} />
</Hero>

<main class="home">
	<div class="container">
		<SpecialtyGrid
			{specialties}
			title="My Specialties"
			description="Expert solutions for your unique challenges"
		/>
		<YouTubeSection
			channelUrl={YOUTUBE_CHANNEL}
			videoId={YOUTUBE_VIDEO_ID}
			videoTitle={YOUTUBE_VIDEO_TITLE}
			sectionTitle={YOUTUBE_SECTION_TITLE}
			sectionSubtitle={YOUTUBE_SECTION_SUBTITLE}
		/>
		<ActionNavCards links={navLinks} />
	</div>
</main>
