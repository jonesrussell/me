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
		color: var(--text-muted);
		text-align: center;
	}

	.resource-grid {
		display: grid;
		gap: var(--ch4);
		grid-template-columns: 1fr;
	}

	@media (width >= 80ch) {
		.resource-grid {
			grid-template-columns: repeat(auto-fit, minmax(50ch, 1fr));
		}
	}

	.resource {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
		width: 100%;
		padding: var(--ch3);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--color-mix-light);
	}

	.resource-header {
		display: flex;
		gap: var(--ch2);
		justify-content: space-between;
		align-items: center;
	}

	h2 {
		margin: 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-tight);
	}

	.stars {
		color: var(--text-muted);
		font-size: var(--font-size-sm);
	}

	.description {
		margin: var(--ch2) 0;
		color: var(--text-muted);
	}

	.category {
		display: inline-block;
		padding: var(--ch) var(--ch2);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--color-mix-medium);
		font-size: var(--font-size-sm);
	}

	a {
		padding-bottom: calc(var(--ch) / 4);
		color: var(--link-color);
		text-decoration: none;
		transition: all 0.2s ease;
		border-bottom: 1px solid transparent;
	}

	a:hover {
		color: var(--link-hover);
		border-bottom-color: currentcolor;
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
