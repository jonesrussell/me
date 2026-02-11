<script lang="ts">
	import Terminal from '$lib/components/terminal/Terminal.svelte';
	import YouTubeSection from '$lib/components/video/YouTubeSection.svelte';
	import ActionNavCards from '$lib/components/navigation/ActionNavCards.svelte';
	import SpecialtyGrid from '$lib/components/content/SpecialtyGrid.svelte';
	import Hero from '$lib/components/ui/Hero.svelte';
	import GoFormXPlaceholder from '$lib/components/forms/GoFormXPlaceholder.svelte';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
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

	.gf-section-cta {
		margin-top: var(--space-16);
		padding: var(--space-8);
		background: var(--color-background-alt);
		border-radius: var(--radius-lg);
	}

	.northcloud-feed {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: var(--space-6);
		background: var(--bg-color);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-lg);
	}

	.northcloud-feed-title {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	.northcloud-feed-desc {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.northcloud-feed-list {
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;
		gap: var(--space-2);
		list-style: none;
	}

	.northcloud-feed-item {
		margin: 0;
	}

	.northcloud-feed-link {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		padding: var(--space-2) 0;
		text-decoration: none;
		color: var(--accent-color);
		border-block-end: var(--border-width) solid var(--border-color);
	}

	.northcloud-feed-link:hover {
		text-decoration: underline;
	}

	.northcloud-feed-link-title {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-bold);
	}

	.northcloud-feed-snippet {
		font-size: var(--font-size-xs);
		line-height: var(--line-height-relaxed);
		color: var(--text-muted);
	}

	.northcloud-feed-more {
		align-self: start;
		margin-top: var(--space-2);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		text-decoration: none;
		color: var(--accent-color);
	}

	.northcloud-feed-more:hover {
		text-decoration: underline;
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

<div class="home">
	<div class="home-container">
		<SpecialtyGrid
			specialties={data.specialties}
			title="My Specialties"
			description="Expert solutions for your unique challenges"
		/>
		<YouTubeSection
			channelUrl={data.youtube.channel}
			videoId={data.youtube.videoId}
			videoTitle={data.youtube.videoTitle}
			sectionTitle={data.youtube.section.title}
			sectionSubtitle={data.youtube.section.subtitle}
		/>
		{#if data.northCloudArticles?.length}
			<section class="northcloud-feed" aria-label="Recent from North Cloud pipeline">
				<h2 class="northcloud-feed-title">Recent from North Cloud</h2>
				<p class="northcloud-feed-desc">Classified articles from my content platform.</p>
				<ul class="northcloud-feed-list">
					{#each data.northCloudArticles as article (article.id)}
						<li class="northcloud-feed-item">
							<!-- eslint-disable svelte/no-navigation-without-resolve -->
							<a
								href={article.url}
								class="northcloud-feed-link"
								target="_blank"
								rel="noopener noreferrer"
							>
								<span class="northcloud-feed-link-title">{article.title}</span>
								{#if article.snippet}
									<span class="northcloud-feed-snippet">{article.snippet}</span>
								{/if}
							</a>
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
						</li>
					{/each}
				</ul>
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a
					href="https://northcloud.biz"
					class="northcloud-feed-more"
					target="_blank"
					rel="noopener noreferrer"
				>
					More on North Cloud
				</a>
			</section>
		{/if}
		<ActionNavCards links={data.navLinks} />
		<div id="cta-form-container" class="gf-section gf-section-cta">
			<GoFormXPlaceholder
				title="Get in touch"
				description="Contact form — launching soon."
				variant="section"
			/>
		</div>
	</div>
</div>
