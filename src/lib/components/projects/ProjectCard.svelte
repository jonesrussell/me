<script lang="ts">
	import Box from '$lib/components/layout/Box.svelte';

	const { project } = $props();
</script>

<style>
	.project {
		width: 100%;
		padding: var(--space-4);
	}

	.project-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		margin-bottom: var(--space-4);
	}

	.project-header h3 {
		margin: 0;
		font-size: var(--font-size-lg);
		line-height: var(--line-height-tight);
		color: var(--text-color);
	}

	.description {
		margin: var(--space-4) 0;
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
		color: var(--text-muted);
	}

	.tech-stack {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-top: var(--space-4);
	}

	.tech {
		padding: var(--space-2) var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-muted);
		background: var(--bg-darker);
		border-radius: var(--radius-md);
		transition: all var(--transition-duration) var(--transition-timing);
	}

	.tech:hover {
		color: var(--text-color);
		background: color-mix(in srgb, var(--bg-darker) 80%, var(--accent-color));
	}

	.status {
		padding: var(--space-2) var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		text-transform: capitalize;
		border-radius: var(--radius-md);
		align-self: flex-start;
	}

	.status-active {
		color: var(--success-color);
		background: color-mix(in srgb, var(--success-color) 15%, transparent);
	}

	.status-stable {
		color: var(--info-color);
		background: color-mix(in srgb, var(--info-color) 15%, transparent);
	}

	.status-experimental {
		color: var(--warning-color);
		background: color-mix(in srgb, var(--warning-color) 15%, transparent);
	}

	a {
		text-decoration: none;
		color: var(--link-color);
		transition: all var(--transition-duration) var(--transition-timing);
	}

	a:hover {
		color: var(--link-hover);
	}

	@media (width >= 48ch) {
		.project {
			padding: var(--space-6);
		}

		.project-header {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			gap: var(--space-4);
		}

		.description {
			font-size: var(--font-size-base);
		}

		.tech {
			padding: var(--space-2) var(--space-4);
			font-size: var(--font-size-sm);
		}

		.status {
			font-size: var(--font-size-sm);
			align-self: auto;
		}
	}
</style>

<Box width={40}>
	<div class="project">
		<div class="project-header">
			<h3>
				<a href={project.url} target="_blank" rel="noopener noreferrer">
					{project.title}
				</a>
			</h3>
			<span class="status status-{project.status}">{project.status}</span>
		</div>
		<p class="description">{project.description}</p>
		<div class="tech-stack">
			{#each project.tech as tech (tech)}
				<span class="tech">{tech}</span>
			{/each}
		</div>
	</div>
</Box>
