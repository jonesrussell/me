<script lang="ts">
	import { alignToGrid } from '$lib/utils/grid';
	const width = alignToGrid(80);
</script>

<section class="home">
	<h1>Hey, I'm Russell Jones.</h1>

	<div class="tagline">
		I help build amazing web applications and contribute to open source.
	</div>

	<div class="intro">
		I'm a Full Stack Developer from Canada 🇨🇦 specializing in:

		<div class="skills">
			<div class="skill-group">
				<div class="skill">Modern JavaScript/TS</div>
				<div class="skill">PHP (Laravel, Drupal)</div>
				<div class="skill">Go Development 🐹</div>
			</div>
			<div class="skill-group">
				<div class="skill">Vue & Svelte</div>
				<div class="skill">DevOps & Docker</div>
				<div class="skill">Open Source</div>
			</div>
		</div>

		<nav class="navigation">
			<a href="/blog">Read my technical articles</a>
			<a href="/projects">Browse my open source projects</a>
			<a href="/contact">Get in touch</a>
		</nav>
	</div>
</section>

<style>
	.home {
		max-width: min(var(--measure), 95vw);
		margin: 0 auto;
		padding: var(--ch4) var(--ch2);
	}

	h1 {
		font-size: 2em;
		line-height: 1.2;
		margin: 0;
	}

	.tagline {
		color: var(--text-muted);
		margin: var(--ch2) 0;
	}

	.intro {
		margin: var(--ch3) 0;
	}

	.skills {
		margin: var(--ch2) 0;
		display: grid;
		gap: var(--ch2);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 30ch), 1fr));
	}

	.skill-group {
		display: flex;
		flex-direction: column;
		gap: var(--ch);
	}

	.skill {
		padding: var(--ch);
		border: 1px solid var(--border-color);
		border-radius: 2px;
		background: color-mix(in srgb, var(--text-color) 5%, transparent);
	}

	.navigation {
		margin-top: var(--ch3);
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
	}

	.navigation a {
		color: var(--link-color);
		text-decoration: none;
	}

	.navigation a:hover {
		text-decoration: underline;
	}

	@media (min-width: 600px) {
		.navigation {
			flex-direction: row;
			gap: var(--ch4);
		}
	}
</style>
