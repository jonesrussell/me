<script lang="ts">
	import Terminal from '$lib/components/Terminal.svelte';
	import Specialties from '$lib/components/Specialties.svelte';
	import YouTubeSection from '$lib/components/YouTubeSection.svelte';
	import Navigation from '$lib/components/Navigation.svelte';

	const YOUTUBE_CHANNEL = 'https://youtube.com/@yourchannel';
	const YOUTUBE_VIDEO_ID = 'your-video-id';
	const YOUTUBE_VIDEO_TITLE = 'Your Video Title';

	const specialties = [
		{
			title: 'Web Development',
			description:
				'Building modern web applications with the latest technologies',
			icon: '🌐'
		},
		{
			title: 'UI/UX Design',
			description: 'Creating beautiful and intuitive user interfaces',
			icon: '🎨'
		},
		{
			title: 'Performance Optimization',
			description: 'Making websites fast and efficient',
			icon: '⚡'
		}
	];

	const navLinks = [
		{ href: '/projects', icon: '📁', text: 'Projects' },
		{ href: '/blog', icon: '📝', text: 'Blog' },
		{ href: '/contact', icon: '📧', text: 'Contact' }
	];
</script>

<svelte:head>
	<title>Russell Jones | Limitless Developer</title>
	<meta
		name="description"
		content="Limitless Developer from Canada specializing in JavaScript, Go, Cloud Technologies, and Open Source. Building elegant solutions with modern web technologies."
	/>
</svelte:head>

<section class="hero">
	<Terminal />
</section>

<main class="home">
	<Specialties {specialties} />
	<YouTubeSection
		channelUrl={YOUTUBE_CHANNEL}
		videoId={YOUTUBE_VIDEO_ID}
		videoTitle={YOUTUBE_VIDEO_TITLE}
	/>
	<Navigation links={navLinks} />
</main>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		min-height: 50vh;
		background: linear-gradient(to bottom, var(--bg-color), var(--bg-darker));
	}

	.home {
		container-type: inline-size;
		max-width: min(var(--measure), 95cqi);
		margin-inline: auto;
		padding: var(--ch4) var(--ch2);
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			animation: none !important;
			transition: none !important;
		}
	}
</style>
