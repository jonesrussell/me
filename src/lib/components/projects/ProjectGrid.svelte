<script lang="ts">
	import ProjectCard from './ProjectCard.svelte';
	import ErrorBoundary from '../ErrorBoundary.svelte';
	import type { Project } from '$lib/types/project';

	const { projects } = $props<{ projects: Project[] }>();
</script>

<style>
	.project-grid {
		container-type: inline-size;
		container-name: project-grid;
		display: grid;
		gap: var(--space-6);
		grid-template-columns: 1fr;
		width: 100%;
	}

	.card-wrap {
		animation: card-enter 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards;
	}

	.card-wrap.featured {
		animation-duration: 0.6s;
	}

	@keyframes card-enter {
		from {
			opacity: 0;
			transform: translateY(1rem);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@container project-grid (width >= 30rem) {
		.project-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--space-6);
		}

		.card-wrap.featured {
			grid-column: 1 / -1;
		}
	}

	@container project-grid (width >= 50rem) {
		.project-grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.card-wrap.featured {
			grid-column: span 2;
		}
	}

	@container project-grid (width >= 75rem) {
		.project-grid {
			grid-template-columns: repeat(4, 1fr);
			gap: var(--space-8);
		}

		.card-wrap.featured {
			grid-column: span 2;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card-wrap {
			animation: none;
		}
	}
</style>

<div class="project-grid">
	{#each projects as project, i (project.title)}
		<div
			class="card-wrap"
			class:featured={i === 0}
			style="animation-delay: {i * 60}ms"
		>
			<ErrorBoundary fallback="Project temporarily unavailable" component="ProjectCard">
				<ProjectCard {project} featured={i === 0} />
			</ErrorBoundary>
		</div>
	{/each}
</div>
