<script lang="ts">
	import { resolve } from '$app/paths';
	import Meta from '$lib/components/site/Meta.svelte';
	import PageHero from '$lib/components/site/PageHero.svelte';
	import EnquiryCTA from '$lib/components/site/EnquiryCTA.svelte';
	import { services } from '$lib/data/site';
</script>

<Meta
	title="Services"
	description="Architecture review, platform development and practical AI workflows, with a clear scope and a useful next step."
	path="/services"
/>
<PageHero
	label="Services / Software, AI and open source"
	title="A clear next step."
	accent="Then the work to get there."
	intro="Bring a problem, an idea or an existing system. We can work out what matters and where to begin."
/>
<div class="site-container section-space">
	{#each services as service (service.number)}
		<section class="service-detail">
			<p class="eyebrow"><span class="number">{service.number}</span> / Service</p>
			<h2>{service.title}</h2>
			<div class="three-columns">
				<div>
					<h3 class="eyebrow">When it helps</h3>
					<p>{service.situation}</p>
				</div>
				<div>
					<h3 class="eyebrow">The work</h3>
					<p>{service.work}</p>
				</div>
				<div>
					<h3 class="eyebrow">What we work toward</h3>
					<p>{service.deliverable}</p>
				</div>
			</div>
			<a class="text-link" href={resolve('/contact')}
				>Discuss {service.title.toLowerCase()} <span aria-hidden="true">→</span></a
			>
		</section>
	{/each}
</div>
<section class="work-section section-space">
	<div class="site-container">
		<p class="eyebrow">How we work together</p>
		<h2>Three steps to momentum.</h2>
		<div class="three-columns process">
			<div>
				<p class="number">01</p>
				<h3>Understand</h3>
				<p>Your goals, the current situation and what a useful outcome looks like.</p>
			</div>
			<div>
				<p class="number">02</p>
				<h3>Scope</h3>
				<p>A focused plan with clear boundaries, tradeoffs and next steps.</p>
			</div>
			<div>
				<p class="number">03</p>
				<h3>Build</h3>
				<p>Implementation, verification and documentation for continued ownership.</p>
			</div>
		</div>
	</div>
</section>
<EnquiryCTA />
