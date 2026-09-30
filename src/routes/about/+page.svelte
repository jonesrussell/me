<script lang="ts">
	import { resolve } from '$app/paths';
	import Meta from '$lib/components/site/Meta.svelte';
	import PageHero from '$lib/components/site/PageHero.svelte';
	import EnquiryCTA from '$lib/components/site/EnquiryCTA.svelte';
</script>

<Meta
	title="About"
	description="Russell Jones, founder, software architect and open-source builder. Practical platforms, developer tools and thoughtful AI workflows."
	path="/about"
/>
<PageHero
	label="About"
	title="A builder’s curiosity."
	accent="An architect’s care."
	intro="I care about software that people can understand, maintain and make their own."
/>
<section class="site-container section-space about-intro">
	<div>
		<p class="eyebrow">01 / About me</p>
		<h2>I’m Russell, a founder, software architect and open-source builder.</h2>
		<p class="lead">My work connects content platforms, developer tools and practical AI.</p>
		<p>
			Through GoFormX, Waaseyaa and North Cloud, I build tools for forms, content and information.
			Each asks the same question: how can useful systems work together while keeping people in
			control?
		</p>
		<p>
			I work with PHP and Go, content architecture and assistant integrations. I value clear
			boundaries, visible tradeoffs and a foundation that can evolve.
		</p>
		<a class="text-link" href={resolve('/projects')}
			>See my work <span aria-hidden="true">→</span></a
		>
	</div>
	<div class="initials" aria-hidden="true">RJ<span>.</span></div>
</section>
<section class="site-container section-space principles">
	<p class="eyebrow">02 / Principles</p>
	<div class="three-columns">
		<div>
			<p class="number">01</p>
			<h3>Start with the problem.</h3>
			<p>
				Understand what people need before choosing the tools. Keep the work focused on a useful
				outcome.
			</p>
		</div>
		<div>
			<p class="number">02</p>
			<h3>Keep decisions visible.</h3>
			<p>
				Document the reasoning and share the tradeoffs so the system makes sense to the next person.
			</p>
		</div>
		<div>
			<p class="number">03</p>
			<h3>Build for ownership.</h3>
			<p>
				Use open technologies, clear structures and practical documentation so people can maintain
				and adapt the work.
			</p>
		</div>
	</div>
</section>
<EnquiryCTA />
