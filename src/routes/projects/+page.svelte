<script lang="ts">
	import { resolve } from '$app/paths';
	import Meta from '$lib/components/site/Meta.svelte';
	import PageHero from '$lib/components/site/PageHero.svelte';
	import ProjectArt from '$lib/components/site/ProjectArt.svelte';
	import GoFormXScreenshot from '$lib/components/site/GoFormXScreenshot.svelte';
	import NorthCloudScreenshot from '$lib/components/site/NorthCloudScreenshot.svelte';
	import EnquiryCTA from '$lib/components/site/EnquiryCTA.svelte';
	import { caseStudies } from '$lib/data/site';
</script>

<Meta
	title="Work"
	description="Personal products and open-source work: GoFormX, Waaseyaa and North Cloud. Problems, architectural decisions and demonstrated results."
	path="/projects"
/>
<PageHero
	label="Selected work / Personal products and open source"
	title="Ideas made into"
	accent="working systems."
	intro="Tools and infrastructure I build, with the problems, decisions and limits behind them."
/>
<div class="projects site-container section-space">
	{#each caseStudies as project, i (project.slug)}
		<article class="project-row">
			<div>
				<p class="eyebrow"><span class="number">0{i + 1}</span> / {project.kind}</p>
				<h2>{project.name}</h2>
				<p class="project-headline">{project.headline}</p>
				<p>{project.summary}</p>
				<p class="project-role">My role: product direction, architecture and implementation.</p>
				<p class="technology-list">{project.technologies.join(' / ')}</p>
				<a class="text-link" href={resolve('/projects/[slug]', { slug: project.slug })}
					>View {project.name} <span aria-hidden="true">→</span></a
				>
			</div>
			<div class="project-visual">
				{#if project.slug === 'goformx'}
					<GoFormXScreenshot sizes="(max-width: 639px) 90vw, 36vw" />
				{:else if project.slug === 'north-cloud'}
					<NorthCloudScreenshot sizes="(max-width: 639px) 90vw, 36vw" />
				{:else}
					<ProjectArt variant={i} />
					<p class="eyebrow">Conceptual artwork</p>
				{/if}
			</div>
		</article>
	{/each}
</div>
<EnquiryCTA />
