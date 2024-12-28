<script lang="ts">
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

<svelte:head>
	<title>Projects | Russell Jones</title>
	<meta
		name="description"
		content="Open source projects by Russell Jones, featuring Go and modern web technologies"
	/>
</svelte:head>

<section class="projects">
	<h1>Open Source Projects</h1>

	<div class="intro">
		Here are some of my open source projects. Most are built with Go and modern
		web technologies.
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
		width: 100%;
		max-width: var(--projects-width);
		margin: 0 auto;
		padding: var(--ch4) var(--ch2);
		font-family: var(--font-mono);
		line-height: 1.4;
	}

	h1 {
		font-size: 2em;
		line-height: 1.2;
		margin: 0;
		text-align: center;
	}

	.intro {
		text-align: center;
		margin: var(--ch2) 0 var(--ch4) 0;
		color: var(--text-muted);
	}

	.project-grid {
		display: grid;
		gap: var(--ch4);
		grid-template-columns: 1fr;
	}

	@media (min-width: 80ch) {
		.project-grid {
			grid-template-columns: repeat(auto-fit, minmax(50ch, 1fr));
		}
	}

	.project {
		width: 100%;
		padding: var(--ch3);
		border: 1px solid var(--border-color);
		background: color-mix(in srgb, var(--text-color) 5%, transparent);
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
		padding: 0.2em var(--ch);
		border-radius: 2px;
	}

	.status-active {
		color: var(--color-success);
		background: color-mix(in srgb, var(--color-success) 15%, transparent);
	}

	.status-stable {
		color: var(--color-info);
	}

	.status-experimental {
		color: var(--color-warning);
		background: color-mix(in srgb, var(--color-warning) 15%, transparent);
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
		padding: 0.2em var(--ch);
		background: color-mix(in srgb, var(--text-color) 10%, transparent);
		border: 1px solid var(--border-color);
		border-radius: 2px;
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
