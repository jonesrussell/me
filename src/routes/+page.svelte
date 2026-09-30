<script lang="ts">
	import { resolve } from '$app/paths';
	import Meta from '$lib/components/site/Meta.svelte';
	import ProjectArt from '$lib/components/site/ProjectArt.svelte';
	import GoFormXScreenshot from '$lib/components/site/GoFormXScreenshot.svelte';
	import EnquiryCTA from '$lib/components/site/EnquiryCTA.svelte';
	import { services, caseStudies } from '$lib/data/site';
	import { stripHtmlExcerpt } from '$lib/utils/excerpt';
	import type { PageData } from './$types';
	const { data } = $props<{ data: PageData }>();
</script>

<Meta
	title="Founder & Software Architect"
	description="Practical software, content platforms and AI workflows. Explore Russell Jones’s services, open-source work and writing."
	path="/"
/>
<div class="landing">
	<section class="page-hero hero home-hero">
		<div class="site-container hero-grid">
			<div>
				<p class="eyebrow">Software · AI · Open source</p>
				<h1>Digital infrastructure<br /><span>that stays in your hands.</span></h1>
				<p class="hero-intro">
					I’m Russell, a founder and software architect. I build practical platforms and tools with
					clarity, care and ownership in mind.
				</p>
				<div class="actions">
					<a class="button" href={resolve('/contact')}
						>Discuss your project <span aria-hidden="true">↗</span></a
					><a class="text-link" href={resolve('/projects')}
						>Explore my work <span aria-hidden="true">→</span></a
					>
				</div>
			</div>
			<ProjectArt />
		</div>
	</section>
	<section class="site-container section-space">
		<div class="section-heading">
			<p class="eyebrow">01 / How I can help</p>
			<h2>A clear next step.<br />Then the work to get there.</h2>
		</div>
		<div class="three-columns">
			{#each services as service (service.number)}
				<article class="service-card">
					<p class="number">{service.number}</p>
					<h3>{service.title}</h3>
					<p>{service.situation}</p>
					<a class="text-link" href={resolve('/services')}
						>Explore this service <span aria-hidden="true">→</span></a
					>
				</article>
			{/each}
		</div>
	</section>
	<section class="work-section section-space">
		<div class="site-container">
			<div class="section-heading heading-with-link">
				<div>
					<p class="eyebrow">02 / Selected work</p>
					<h2>Ideas made into working systems.</h2>
				</div>
				<a class="text-link" href={resolve('/projects')}
					>View all work <span aria-hidden="true">→</span></a
				>
			</div>
			{#each caseStudies as project, i (project.slug)}
				<article class="project-row">
					<div>
						<p class="eyebrow">{project.kind}</p>
						<h3>{project.name}</h3>
						<p class="project-headline">{project.headline}</p>
						<p>{project.summary}</p>
						<a class="text-link" href={resolve('/projects/[slug]', { slug: project.slug })}
							>View {project.name} <span aria-hidden="true">→</span></a
						>
					</div>
					{#if project.slug === 'goformx'}
						<GoFormXScreenshot sizes="(max-width: 639px) 90vw, 36vw" />
					{:else}
						<ProjectArt variant={i} />
					{/if}
				</article>
			{/each}
		</div>
	</section>
	<section class="site-container section-space about-preview">
		<div>
			<p class="eyebrow">03 / The approach</p>
			<h2>A builder’s curiosity.<br />An architect’s care.</h2>
		</div>
		<div>
			<p class="lead">Start with the problem. Keep decisions visible. Build for ownership.</p>
			<p>
				From content architecture to assistant tools, I care about systems that people can
				understand, maintain and make their own.
			</p>
			<a class="text-link" href={resolve('/about')}
				>About my approach <span aria-hidden="true">→</span></a
			>
		</div>
	</section>
	<section class="site-container section-space writing-preview">
		<div class="section-heading heading-with-link">
			<div>
				<p class="eyebrow">04 / Writing</p>
				<h2>Notes from the work.</h2>
			</div>
			<a class="text-link" href={resolve('/blog')}
				>Read my writing <span aria-hidden="true">→</span></a
			>
		</div>
		{#each data.posts as post (post.slug)}
			<article class="writing-row">
				<div>
					<p class="eyebrow">
						<time datetime={new Date(post.published).toISOString()}>{post.formattedDate}</time>
					</p>
					<h3><a href={resolve('/blog/[slug]', { slug: post.slug })}>{post.title}</a></h3>
					<p>{stripHtmlExcerpt(post.content, 180)}</p>
				</div>
				<a
					class="row-arrow"
					href={resolve('/blog/[slug]', { slug: post.slug })}
					aria-label={`Read ${post.title}`}>→</a
				>
			</article>
		{:else}<p>
				Practical lessons in software, architecture and AI. <a href={resolve('/blog')}
					>Browse published writing.</a
				>
			</p>{/each}
	</section>
	<EnquiryCTA />
</div>
