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
			description: 'A web app that helps constituents easily contact their MPs through email campaigns on important issues.',
			tech: ['Go', 'Echo', 'MariaDB', 'Tailwind CSS', 'JWT'],
			url: 'https://github.com/jonesrussell/mp-emailer',
			status: 'active'
		},
		// ... existing projects
	];

	const videos: Video[] = [
		{
			title: 'The Legend Reborn - AI Generated Trailer',
			description: 'Journey with Nanabush and witness the story of the Anishinaabe in this AI-generated trailer celebrating Indigenous storytelling.',
			topics: ['AI Generated', 'Indigenous', 'Anishinaabe', 'Native American'],
			url: 'https://www.youtube.com/watch?v=7Pvq7hQ3l84',
			embedId: '7Pvq7hQ3l84',
			date: 'Feb 2024'
		},
		{
			title: 'Red Helmet - Stop Motion Trailer',
			description: 'A wanderer comes across a red helmet, origin unknown. Little does he know, the helmet is imbued with a powerful entity that embarks on a journey of its own.',
			topics: ['Stop Motion', 'Short Film', 'Indie Film', 'Original Story'],
			url: 'https://www.youtube.com/watch?v=Bky1A8vNUjU',
			embedId: 'Bky1A8vNUjU',
			date: 'Dec 2023'
		}
	];

	// Add grid alignment utility
	const alignToGrid = (value: number) => Math.round(value * 16) / 16;
</script>

<svelte:head>
	<title>Content & Projects | Russell Jones - Go & Modern Web Development</title>
	<meta
		name="description"
		content="Explore my open source projects, technical videos, and educational content about Go, JavaScript, and modern web development."
	/>
</svelte:head>

<section class="content">
	<h1>Content & Projects</h1>
	<p class="intro">
		Here you'll find my open source projects, technical videos, and educational content.
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
		line-height: var(--line-height-base);
		font-size: var(--font-size-sm);
	}

	h1 {
		font-size: var(--font-size-lg);
		margin-bottom: var(--ch2);
		line-height: var(--line-height-tight);
		color: var(--text-muted);
	}

	h2 {
		font-size: var(--font-size-base);
		margin-top: var(--ch3);
		margin-bottom: var(--ch2);
		line-height: var(--line-height-tight);
		color: var(--text-muted);
	}

	.intro {
		color: var(--text-muted);
		margin-bottom: var(--ch3);
		font-size: var(--font-size-sm);
	}

	.video-grid {
		display: grid;
		gap: var(--ch2);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 40ch), 1fr));
		margin-bottom: var(--ch3);
	}

	.video-card {
		border: calc(1 * var(--ch) / 16) solid var(--border-color);
		background: var(--bg-darker);
		padding: var(--ch2);
		border-radius: var(--radius-sm);
	}

	.video-card:hover {
		transform: translateY(calc(-1 * var(--ch) / 8));
	}

	.video-container {
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
		overflow: hidden;
		border-radius: var(--radius-sm);
		margin-bottom: var(--ch2);
		background: var(--bg-color);
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
		font-size: var(--font-size-base);
		margin-bottom: calc(var(--ch) / 2);
		line-height: var(--line-height-tight);
	}

	.description {
		color: var(--text-muted);
		margin-bottom: var(--ch);
		line-height: var(--line-height-base);
		font-size: var(--font-size-sm);
	}

	.topics {
		display: flex;
		flex-wrap: wrap;
		gap: calc(var(--ch) / 2);
	}

	.topic {
		padding: calc(var(--ch) / 8) calc(var(--ch) / 2);
		border: calc(1 * var(--ch) / 16) solid var(--border-color);
		border-radius: calc(var(--ch) / 8);
		background: var(--bg-color);
		font-size: var(--font-size-xs);
		color: var(--text-muted);
	}

	.topic:hover {
		background: var(--color-mix-light);
		color: var(--text-color);
	}

	.project-grid {
		display: grid;
		gap: var(--ch2);
		grid-template-columns: 1fr;
	}

	.project {
		border: calc(1 * var(--ch) / 16) solid var(--border-color);
		background: var(--bg-darker);
		padding: var(--ch2);
		border-radius: var(--radius-sm);
	}

	.project-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: calc(var(--ch) / 2);
	}

	.project-header h3 {
		font-size: var(--font-size-base);
		line-height: var(--line-height-tight);
	}

	.project-header a {
		color: var(--link-color);
		text-decoration: none;
	}

	.project-header a:hover {
		text-decoration: underline;
	}

	.status {
		font-size: var(--font-size-xs);
		padding: calc(var(--ch) / 8) calc(var(--ch) / 2);
		border-radius: calc(var(--ch) / 8);
		background: var(--bg-color);
	}

	.status-active {
		color: var(--color-success);
	}

	.tech-stack {
		display: flex;
		flex-wrap: wrap;
		gap: calc(var(--ch) / 2);
		margin-top: var(--ch2);
	}

	.tech {
		padding: calc(var(--ch) / 8) calc(var(--ch) / 2);
		border: calc(1 * var(--ch) / 16) solid var(--border-color);
		border-radius: calc(var(--ch) / 8);
		background: var(--bg-color);
		font-size: var(--font-size-xs);
		color: var(--text-muted);
	}
</style>
