<script lang="ts">
	interface Project {
		title: string;
		description: string;
		tech: string[];
		url: string;
		status: 'active' | 'stable' | 'experimental';
	}

	interface Video {
		title: string;
		description: string;
		topics: string[];
		url: string;
		embedId: string;
		date: string;
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

	const videos: Video[] = [
		{
			title: 'The Legend Reborn - AI Generated Trailer',
			description:
				'Journey with Nanabush and witness the story of the Anishinaabe in this AI-generated trailer celebrating Indigenous storytelling.',
			topics: ['AI Generated', 'Indigenous', 'Anishinaabe', 'Native American'],
			url: 'https://www.youtube.com/watch?v=7Pvq7hQ3l84',
			embedId: '7Pvq7hQ3l84',
			date: 'Feb 2024'
		},
		{
			title: 'Red Helmet - Stop Motion Trailer',
			description:
				'A wanderer comes across a red helmet, origin unknown. Little does he know, the helmet is imbued with a powerful entity that embarks on a journey of its own.',
			topics: ['Stop Motion', 'Short Film', 'Indie Film', 'Original Story'],
			url: 'https://www.youtube.com/watch?v=Bky1A8vNUjU',
			embedId: 'Bky1A8vNUjU',
			date: 'Dec 2023'
		}
	];
</script>

<svelte:head>
	<title>Projects & Content | Russell Jones - Go & Modern Web Development</title
	>
	<meta
		name="description"
		content="Explore my open source projects, technical videos, and educational content about Go, JavaScript, and modern web development."
	/>
</svelte:head>

<section class="content">
	<h1>Projects & Content</h1>
	<p class="intro">
		Here you'll find my open source projects, technical videos, and educational
		content.
	</p>

	<h2>Featured Videos</h2>
	<div class="video-grid">
		{#each videos as video}
			<div class="video-card">
				<div class="video-container">
					<iframe
						src={`https://www.youtube.com/embed/${video.embedId}`}
						title={video.title}
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
						loading="lazy"
					></iframe>
				</div>
				<h3 class="video-title">{video.title}</h3>
				<p class="description">{video.description}</p>
				<div class="topics">
					{#each video.topics as topic}
						<span class="topic">{topic}</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<h2>Open Source Projects</h2>
	<div class="project-grid">
		{#each projects as project}
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
					{#each project.tech as tech}
						<span class="tech">{tech}</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.content {
		width: 100%;
		max-width: calc(80 * var(--ch));
		margin: 0 auto;
		padding: var(--ch3) var(--ch2);

		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-base);
	}

	h1 {
		margin-bottom: var(--ch2);
		font-size: var(--font-size-lg);
		line-height: var(--line-height-tight);
		color: var(--text-muted);
	}

	h2 {
		margin-top: var(--ch3);
		margin-bottom: var(--ch2);

		font-size: var(--font-size-base);
		line-height: var(--line-height-tight);
		color: var(--text-muted);
	}

	.intro {
		margin-bottom: var(--ch3);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.video-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 40ch), 1fr));
		gap: var(--ch2);
		margin-bottom: var(--ch3);
	}

	.video-card {
		padding: var(--ch2);
		background: var(--bg-darker);
		border: calc(1 * var(--ch) / 16) solid var(--border-color);
		border-radius: var(--radius-sm);
	}

	.video-card:hover {
		transform: translateY(calc(-1 * var(--ch) / 8));
	}

	.video-container {
		position: relative;

		height: 0;
		margin-bottom: var(--ch2);
		padding-bottom: 56.25%;

		background: var(--bg-color);
		border-radius: var(--radius-sm);

		overflow: hidden;
	}

	.video-container iframe {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;
		border: 0;
	}

	.video-title {
		margin-bottom: calc(var(--ch) / 2);
		font-size: var(--font-size-base);
		line-height: var(--line-height-tight);
	}

	.description {
		margin-bottom: var(--ch);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
	}

	.topics {
		display: flex;
		flex-wrap: wrap;
		gap: var(--ch);
	}

	.topic {
		padding: calc(var(--ch) / 4) var(--ch);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		background: var(--bg-darker);
		border: calc(1 * var(--ch) / 16) solid var(--border-color);
		border-radius: var(--radius-sm);
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 40ch), 1fr));
		gap: var(--ch2);
	}

	.project {
		padding: var(--ch2);
		background: var(--bg-darker);
		border: calc(1 * var(--ch) / 16) solid var(--border-color);
		border-radius: var(--radius-sm);
	}

	.project:hover {
		transform: translateY(calc(-1 * var(--ch) / 8));
	}

	.project-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--ch);
	}

	.project-header h3 {
		margin: 0;
		font-size: var(--font-size-base);
		line-height: var(--line-height-tight);
	}

	.status {
		padding: calc(var(--ch) / 4) var(--ch);
		font-size: var(--font-size-sm);
		border-radius: var(--radius-sm);
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

	.tech-stack {
		display: flex;
		flex-wrap: wrap;
		gap: var(--ch);
		margin-top: var(--ch);
	}

	.tech {
		padding: calc(var(--ch) / 4) var(--ch);
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		background: var(--bg-color);
		border: calc(1 * var(--ch) / 16) solid var(--border-color);
		border-radius: var(--radius-sm);
	}

	a {
		text-decoration: none;
		color: var(--link-color);
	}

	a:hover {
		color: var(--link-hover);
	}
</style>
