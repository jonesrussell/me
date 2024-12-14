<script lang="ts">
	import { alignToGrid } from '$lib/utils/grid';
	const width = alignToGrid(80);

	interface Project {
		title: string;
		description: string;
		tech: string[];
		url: string;
		status: 'active' | 'stable' | 'experimental';
	}

	const projects: Project[] = [
		{
			title: 'MP Emailer',
			description:
				'A web app that helps constituents easily contact their MPs through email campaigns on important issues.',
			tech: ['Go', 'Echo', 'MariaDB', 'Tailwind CSS', 'JWT'],
			url: 'https://github.com/jonesrussell/mp-emailer',
			status: 'active'
		},
		{
			title: 'Goforms',
			description: 'Modern form management system with MariaDB backend.',
			tech: ['Go', 'Echo', 'MariaDB', 'REST API', 'Docker'],
			url: 'https://github.com/jonesrussell/goforms',
			status: 'active'
		},
		{
			title: 'Gimbal',
			description: 'A Gyruss-inspired game built with Ebitengine.',
			tech: ['Go', 'Ebitengine', 'Game Dev', 'WASM'],
			url: 'https://github.com/jonesrussell/gimbal',
			status: 'experimental'
		},
		{
			title: 'Goprowl',
			description: 'Go-based system monitoring and alerting tool.',
			tech: ['Go', 'Metrics', 'Monitoring', 'CLI'],
			url: 'https://github.com/jonesrussell/goprowl',
			status: 'experimental'
		}
	];
</script>

<section class="projects" style="--projects-width: {width}ch">
	<h1>Open Source Projects</h1>

	<div class="intro">
		Here are some of my open source projects. Most are built with Go and modern web technologies.
	</div>

	<div class="project-grid">
		{#each projects as project}
			<div class="project">
				<div class="project-header">
					<h2>
						<a href={project.url} target="_blank" rel="noopener noreferrer">
							{project.title}
						</a>
					</h2>
					<span class="status status-{project.status}">{project.status}</span>
				</div>

				<p class="description">{project.description}</p>

				<div class="tech-stack">
					{#each project.tech as tech}
						<span class="tech">{tech}</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.projects {
		width: var(--projects-width);
		margin: 0 auto;
		font-family: var(--font-mono);
		line-height: 1.4;
	}

	h1 {
		margin: 0 0 var(--ch2) 0;
		font-size: 1.8em;
		font-weight: var(--font-weight-bold);
	}

	.intro {
		margin: var(--ch3) 0;
		color: var(--text-muted);
	}

	.project-grid {
		display: grid;
		gap: var(--ch4);
	}

	.project {
		padding: var(--ch3);
		border: 1px solid var(--border-color);
		background: var(--bg-color);
	}

	.project-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--ch2);
	}

	h2 {
		margin: 0;
		font-size: 1.2em;
		font-weight: var(--font-weight-bold);
	}

	.status {
		font-size: 0.9em;
		padding: 0 var(--ch);
	}

	.status-active {
		color: var(--color-success);
	}

	.status-stable {
		color: var(--color-info);
	}

	.status-experimental {
		color: var(--color-warning);
	}

	.description {
		margin: var(--ch2) 0;
		color: var(--text-muted);
	}

	.tech-stack {
		display: flex;
		flex-wrap: wrap;
		gap: var(--ch);
		margin-top: var(--ch2);
	}

	.tech {
		font-size: 0.9em;
		padding: 0 var(--ch);
		border: 1px solid var(--border-color);
		color: var(--text-muted);
	}

	a {
		color: var(--link-color);
		text-decoration: none;
		border-bottom: 1px solid transparent;
	}

	a:hover {
		color: var(--link-hover);
		border-bottom-color: currentColor;
	}
</style>
