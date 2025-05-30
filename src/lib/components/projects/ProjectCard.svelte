<script lang="ts">
	import { base } from '$app/paths';
	import Box from '$lib/components/ui/Box.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import type { Project } from '$lib/types/project';

	const { project } = $props<{ project: Project }>();
</script>

<style>
	.project-card {
		container-type: inline-size;
		container-name: project-card;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding: var(--space-4);
		background: var(--color-surface-2);
		border-radius: var(--radius-2);
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	h3 {
		font-size: var(--font-size-3);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-1);
	}

	.description {
		font-size: var(--font-size-2);
		color: var(--color-text-2);
		max-width: var(--measure);
	}

	.thumbnail {
		aspect-ratio: 16/9;
		width: 100%;
		border-radius: var(--radius-1);
		overflow: hidden;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	img.placeholder {
		background: var(--bg-darker);
		opacity: 0.7;
		filter: grayscale(1);
		object-fit: contain;
	}

	@container project-card (width >= 30rem) {
		.project-card {
			flex-direction: row;
			align-items: center;
			gap: var(--space-4);
		}

		.thumbnail {
			width: 40%;
		}
	}

	@container project-card (width >= 50rem) {
		.project-card {
			padding: var(--space-6);
		}

		.thumbnail {
			width: 30%;
		}
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-top: var(--space-2);
	}
</style>

<Box>
	<div class="project-card">
		<div class="content">
			<h3>
				<a href={project.url} target="_blank" rel="noopener noreferrer">
					{project.title}
				</a>
			</h3>
			<span class="status status-{project.status}">{project.status}</span>
			<p class="description">{project.description}</p>
			<div class="tags">
				{#each project.tags as tag (tag)}
					<Tag title={tag}>{tag}</Tag>
				{/each}
			</div>
		</div>
		<div class="thumbnail">
			<img
				src={project.image || `${base}/images/projects/placeholder.png`}
				alt={project.image ? project.title : `No image available for ${project.title}`}
				class:placeholder={!project.image}
			/>
		</div>
	</div>
</Box>
