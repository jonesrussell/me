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
	<title
		>Open Source Projects | Russell Jones - Go & Modern Web Development</title
	>
	<meta
		name="description"
		content="Explore my open source projects built with Go, JavaScript, and modern web technologies. From web applications to system tools and game development."
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
		line-height: var(--line-height-base);
	}

	h1 {
		margin: 0;
		font-size: var(--font-size-2xl);
		line-height: var(--line-height-tight);
		text-align: center;
	}

	.intro {
		margin: var(--ch2) 0 var(--ch4) 0;
		text-align: center;
		color: var(--text-muted);
	}

	.project-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--ch4);
	}

	@media (width >= 80ch) {
		.project-grid {
			grid-template-columns: repeat(auto-fit, minmax(50ch, 1fr));
		}
	}

	.project {
		width: 100%;
		padding: var(--ch3);
		background: var(--color-mix-light);
		border: calc(1 * var(--ch) / 16) solid var(--border-color);
	}

	.project-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--ch2);
	}

	h2 {
		margin: 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
	}

	.status {
		padding: calc(var(--ch) / 4) var(--ch);
		font-size: var(--font-size-sm);
		border-radius: calc(var(--ch) / 8);
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
		padding: calc(var(--ch) / 4) var(--ch);

		font-size: var(--font-size-sm);

		background: var(--color-mix-medium);
		border: calc(1 * var(--ch) / 16) solid var(--border-color);
		border-radius: calc(var(--ch) / 8);
	}

	a {
		text-decoration: none;
		color: var(--link-color);
		border-bottom: calc(1 * var(--ch) / 16) solid transparent;
	}

	a:hover {
		border-bottom-color: currentcolor;
		color: var(--link-hover);
	}
</style>
