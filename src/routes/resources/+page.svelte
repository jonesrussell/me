<script lang="ts">
	interface Resource {
		title: string;
		url: string;
		description: string;
		stars?: number;
		category: 'Go' | 'Web Development' | 'Tools';
	}

	const resources: Resource[] = [
		{
			title: 'Go by Example',
			url: 'https://github.com/mmcgrana/gobyexample',
			description:
				'A comprehensive collection of annotated example programs for learning Go',
			stars: 7400,
			category: 'Go'
		}
		// More resources can be added here
	];
</script>

<svelte:head>
	<title>Developer Resources | Russell Jones - Tools & Learning Materials</title
	>
	<meta
		name="description"
		content="Curated collection of development resources, tools, and learning materials for Go, web development, and cloud technologies. Hand-picked by Russell Jones."
	/>
</svelte:head>

<section class="resources">
	<h1>Development Resources</h1>

	<div class="intro">
		A curated collection of helpful resources, tools, and learning materials.
	</div>

	<div class="resource-grid">
		{#each resources as resource}
			<div class="resource">
				<div class="resource-header">
					<h2>
						<a href={resource.url} target="_blank" rel="noopener noreferrer">
							{resource.title}
						</a>
					</h2>
					{#if resource.stars}
						<span class="stars">★ {resource.stars}</span>
					{/if}
				</div>

				<p class="description">{resource.description}</p>
				<span class="category">{resource.category}</span>
			</div>
		{/each}
	</div>
</section>

<style>
	.resources {
		width: 100%;
		max-width: var(--measure);
		margin: 0 auto;
		padding: var(--ch4) var(--ch2);
		font-family: var(--font-mono);
		line-height: 1.4;
	}

	h1 {
		font-size: var(--font-size-2xl);
		line-height: var(--line-height-tight);
		margin: 0;
		text-align: center;
	}

	.intro {
		text-align: center;
		margin: var(--ch2) 0 var(--ch4) 0;
		color: var(--text-muted);
	}

	.resource-grid {
		display: grid;
		gap: var(--ch4);
		grid-template-columns: 1fr;
	}

	@media (min-width: 80ch) {
		.resource-grid {
			grid-template-columns: repeat(auto-fit, minmax(50ch, 1fr));
		}
	}

	.resource {
		width: 100%;
		padding: var(--ch3);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--color-mix-light);
	}

	.resource-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--ch2);
	}

	h2 {
		margin: 0;
		font-size: var(--font-size-lg);
		line-height: var(--line-height-tight);
		font-weight: var(--font-weight-bold);
	}

	.stars {
		color: var(--text-muted);
		font-size: 0.9em;
	}

	.description {
		margin: var(--ch2) 0;
		color: var(--text-muted);
	}

	.category {
		display: inline-block;
		font-size: var(--font-size-sm);
		padding: var(--ch) var(--ch2);
		background: var(--color-mix-medium);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
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

	.resources-content {
		line-height: var(--line-height-relaxed);
	}

	.resources-title {
		font-size: var(--font-size-2xl);
		line-height: var(--line-height-tight);
	}

	.resource-title {
		font-size: var(--font-size-lg);
	}

	.resource-description {
		font-size: var(--font-size-sm);
	}

	.resource-meta {
		font-size: var(--font-size-sm);
	}
</style>
