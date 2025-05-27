<script lang="ts">
	import ProjectCard from './ProjectCard.svelte';
	import type { Project } from '$lib/types/project';

	const { projects } = $props<{ projects: Project[] }>();
</script>

<style>
	.project-grid {
		container-type: inline-size;
		container-name: project-grid;
		display: grid;
		gap: var(--space-4);
		grid-template-columns: 1fr;
		width: 100%;
	}

	@container project-grid (width >= 30rem) {
		.project-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@container project-grid (width >= 50rem) {
		.project-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@container project-grid (width >= 75rem) {
		.project-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>

<div class="project-grid">
	{#each projects as project (project.title)}
		<ProjectCard {project} />
	{/each}
</div>
