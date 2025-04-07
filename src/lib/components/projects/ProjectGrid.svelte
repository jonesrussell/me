<script lang="ts">
	import ProjectCard from './ProjectCard.svelte';
	import type { Project } from '$lib/types';

	const { projects } = $props<{ projects: Project[] }>();
</script>

<section>
	<h2>Open Source Projects</h2>
	<div class="project-grid">
		{#each projects as project (project.title)}
			<ProjectCard {project} />
		{/each}
	</div>
</section>

<style>
	h2 {
		margin: var(--space-8) 0 var(--space-4) 0;
		font-size: var(--font-size-lg);
		line-height: var(--line-height-tight);
		color: var(--text-color);
	}

	.project-grid {
		display: grid;
		gap: var(--space-4);
	}

	@media (width >= 48ch) {
		h2 {
			margin: var(--space-12) 0 var(--space-6) 0;
			font-size: var(--font-size-xl);
		}

		.project-grid {
			gap: var(--space-6);
		}
	}

	@media (width >= 80ch) {
		.project-grid {
			grid-template-columns: repeat(auto-fit, minmax(50ch, 1fr));
			gap: var(--space-8);
		}
	}
</style>
