<script lang="ts">
	import ProjectArt from './ProjectArt.svelte';
	const {
		label,
		title,
		accent = '',
		intro,
		light = false
	} = $props<{
		label: string;
		title: string;
		accent?: string;
		intro: string;
		light?: boolean;
	}>();
</script>

<section class:hero-light={light} class="page-hero hero">
	<div class="site-container hero-grid">
		<div>
			<p class="eyebrow">{label}</p>
			<h1>
				{title}{#if accent}<br /><span>{accent}</span>{/if}
			</h1>
			<p class="hero-intro">{intro}</p>
		</div>
		<ProjectArt />
	</div>
</section>
