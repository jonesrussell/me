<script lang="ts">
	import { resolve } from '$app/paths';
	import Meta from '$lib/components/site/Meta.svelte';
	import EnquiryCTA from '$lib/components/site/EnquiryCTA.svelte';
	import { caseStudies } from '$lib/data/site';
	import type { PageData } from './$types';
	const { data } = $props<{ data: PageData }>();
	const project = $derived(data.project);
	const sections = $derived([
		{ title: 'The problem', text: project.problem },
		{ title: 'Constraints', text: project.constraints },
		{ title: 'My contribution', text: project.contribution },
		{ title: 'Decisions & tradeoffs', text: project.decisions },
		{ title: 'What is demonstrated', text: project.result },
		{ title: 'Limitations & current work', text: project.limitations }
	]);
</script>

<Meta title={project.name} description={project.summary} path={`/projects/${project.slug}`} />
<article class="site-container case-study section-space">
	<nav class="breadcrumb" aria-label="Breadcrumb">
		<a href={resolve('/projects')}>Work</a><span aria-hidden="true">/</span><span
			>{project.name}</span
		>
	</nav>
	<header>
		<p class="eyebrow">{project.name} / {project.kind}</p>
		<h1>{project.headline}</h1>
		<p class="status-label">{project.status}</p>
		<p class="lead">{project.summary}</p>
		<p class="technology-list">{project.technologies.join(' / ')}</p>
	</header>
	<figure class="flow-diagram">
		<figcaption class="eyebrow">Conceptual flow</figcaption>
		<ol>
			{#each project.flow as step, i (step)}<li>
					<span class="number">0{i + 1}</span><span>{step}</span>
				</li>{/each}
		</ol>
	</figure>
	{#each sections as section, i (section.title)}<section class="case-section">
			<p class="eyebrow"><span class="number">0{i + 1}</span> / {section.title}</p>
			<h2>{section.title}</h2>
			<p>{section.text}</p>
		</section>{/each}
	<section class="case-section">
		<h2>Explore the project</h2>
		<div class="actions">
			{#each project.links as link (link.href)}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- verified external source URLs -->
				<a class="text-link" href={link.href}>{link.label} <span aria-hidden="true">↗</span></a
				>{/each}
		</div>
		<p class="evidence-note">Status reviewed September 30, 2026. {project.evidence}</p>
	</section>
	<nav class="related-work" aria-label="Related work">
		<p class="eyebrow">Related work</p>
		{#each caseStudies.filter((item) => item.slug !== project.slug) as related (related.slug)}<a
				class="text-link"
				href={resolve('/projects/[slug]', { slug: related.slug })}
				>{related.name} <span aria-hidden="true">→</span></a
			>{/each}
	</nav>
</article>
<EnquiryCTA />
