<script lang="ts">
	import { base } from '$app/paths';
	import Box from '$lib/components/ui/Box.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import type { Project } from '$lib/types/project';

	const { project, featured = false } = $props<{ project: Project; featured?: boolean }>();

	function getStatusLabel(status: Project['status']): string {
		const labels: Record<Project['status'], string> = {
			active: 'Active',
			development: 'In development',
			stable: 'Stable',
			experimental: 'Experimental'
		};
		return labels[status];
	}
</script>

<style>
	.project-card {
		container-type: inline-size;
		container-name: project-card;
		display: flex;
		flex: 1;
		min-height: 0;
		padding: var(--space-4);
		background: var(--bg-darker);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		transition:
			transform var(--transition-base),
			box-shadow var(--transition-base),
			border-color var(--transition-base);
		flex-direction: column;
		gap: var(--space-4);
	}

	.project-card:hover {
		box-shadow:
			0 0 0 1px var(--accent-color),
			0 8px 24px rgb(0 0 0 / 0.15);
		transform: translateY(-0.25rem);
		border-color: var(--accent-color);
	}

	.project-card.featured {
		background: linear-gradient(
			135deg,
			var(--bg-darker) 0%,
			var(--color-mix-faint) 100%
		);
		border-color: var(--accent-color);
		box-shadow: 0 0 0 1px var(--accent-color);
	}

	.project-card.featured:hover {
		box-shadow:
			0 0 0 1px var(--accent-color-hover),
			0 12px 32px rgb(0 0 0 / 0.2);
		border-color: var(--accent-color-hover);
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	h3 {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-color);
	}

	h3 a {
		text-decoration: none;
		color: var(--accent-color);
		transition: color var(--transition-base);
	}

	h3 a:hover {
		color: var(--accent-color-hover);
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		font-size: var(--font-size-base);
		color: var(--text-muted);
	}

	.links a {
		text-decoration: underline;
		color: var(--text-muted);
		text-underline-offset: 2px;
	}

	.links a:hover {
		color: var(--text-color);
	}

	.status {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.status::before {
		display: inline-block;
		width: 0.5rem;
		height: 0.5rem;
		background: var(--text-muted);
		border-radius: var(--radius-full);
		content: '';
	}

	.status-active::before {
		background: var(--color-success);
	}

	.status-development::before {
		background: var(--color-warning);
	}

	.status-stable::before {
		background: var(--color-info);
	}

	.status-experimental::before {
		background: var(--secondary-accent);
	}

	.description {
		font-size: var(--font-size-base);
		color: var(--text-muted);
		max-width: var(--measure);
	}

	.thumbnail {
		aspect-ratio: 16/9;
		width: 100%;
		border-radius: var(--radius-sm);
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

	@media (prefers-reduced-motion: reduce) {
		.project-card {
			transition: none;
		}

		.project-card:hover {
			transform: none;
		}
	}
</style>

<Box>
	<div class="project-card" class:featured>
		<div class="content">
			<h3>
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href={project.url} target="_blank" rel="noopener noreferrer">
					{project.title}
				</a>
			</h3>
			{#if project.siteUrl || project.githubUrl}
				<div class="links">
					{#if project.siteUrl}
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
						<a href={project.siteUrl} target="_blank" rel="noopener noreferrer">
							{new URL(project.siteUrl).hostname}
						</a>
					{/if}
					{#if project.githubUrl}
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
						<a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
							GitHub
						</a>
					{/if}
				</div>
			{/if}
			<span class="status status-{project.status}">{getStatusLabel(project.status)}</span>
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
