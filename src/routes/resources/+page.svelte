<script lang="ts">
	import ResourceSection from '$lib/components/resources/ResourceSection.svelte';
	import FeaturedVideos from '$lib/components/video/FeaturedVideos.svelte';
	import type { Resource } from '$lib/types/resource';
	import type { YouTubeChannel } from '$lib/types/video';
	import Hero from '$lib/components/ui/Hero.svelte';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();

	// YouTube channel info
	const youtubeChannel: YouTubeChannel = {
		name: 'Full Stack Dev',
		url: 'https://www.youtube.com/@fullstackdev42',
		description: 'Practical web development tutorials and coding insights',
		featuredVideos: [
			{
				title: 'Add a Google Font to Tailwind CSS | 2023',
				url: 'https://youtu.be/B4v7ZDLxiS4',
				embedId: 'B4v7ZDLxiS4',
				description: 'Learn how to integrate custom Google Fonts with Tailwind CSS',
				tags: ['Tailwind CSS', 'Web Development', 'CSS', 'Frontend'],
				date: 'Dec 2023'
			}
		]
	};

	// Group resources by category with featured content first
	const groupedResources = $derived.by(() => {
		const resources = data.resources;
		const categories = [
			...new Set(['Essential Tools & Platforms', ...resources.map((r: Resource) => r.category)])
		].sort((a, b) => {
			if (a === 'Essential Tools & Platforms') return -1;
			if (b === 'Essential Tools & Platforms') return 1;
			return a.localeCompare(b);
		});

		return categories.reduce(
			(acc, category) => {
				acc[category] = resources
					.filter((r: Resource) => r.category === category)
					.sort((a: Resource, b: Resource) => {
						if (a.featured && !b.featured) return -1;
						if (!a.featured && b.featured) return 1;
						return (b.stars || 0) - (a.stars || 0);
					});
				return acc;
			},
			{} as Record<string, Resource[]>
		);
	});
</script>

<style>
	.resources {
		container-type: inline-size;
		container-name: resources-page;
		display: grid;
		width: 100%;
		padding: var(--space-16) 0;
		grid-template-rows: auto 1fr;
		gap: var(--space-16);
	}

	.container {
		display: grid;
		width: 100%;
		margin-inline: auto;
		padding-inline: var(--space-4);
		max-width: min(var(--measure), 95cqi);
		gap: var(--space-16);
		grid-template-columns: minmax(0, 1fr);
	}

	.sections {
		display: grid;
		grid-template-columns: minmax(min(100%, 30rem), 1fr);
		gap: var(--space-8);
		width: 100%;
		justify-content: center;
	}

	.featured-videos-section {
		grid-column: 1 / -1;
	}

	@container resources-page (min-width: 640px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-8);
		}

		.sections {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 30rem), 1fr));
			justify-content: start;
		}
	}

	@container resources-page (min-width: 768px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-12);
		}

		.sections {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 40rem), 1fr));
		}
	}

	@container resources-page (min-width: 1024px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-16);
		}
	}

	@container resources-page (min-width: 1280px) {
		.container {
			max-width: min(var(--measure), 95cqi);
			padding-inline: var(--space-20);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			transition: none;
			animation: none;
		}
	}
</style>

<svelte:head>
	<title>Developer Resources | Russell Jones - Web Development & Open Source</title>
	<meta
		name="description"
		content="Curated collection of essential tools, documentation, and learning resources for web developers. From TypeScript to Go, DevOps to AI integration."
	/>
</svelte:head>

<Hero title="Developer Resources" subtitle="Essential Tools & Learning Materials" />

<main class="resources">
	<div class="container">
		<div class="sections">
			{#each Object.entries(groupedResources) as [category, resources], i (category)}
				<ResourceSection {category} resources={resources as Resource[]} index={i} />
			{/each}
			<div class="featured-videos-section">
				<FeaturedVideos videos={youtubeChannel.featuredVideos} />
			</div>
		</div>
	</div>
</main>
