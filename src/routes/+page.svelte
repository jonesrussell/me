<script lang="ts">
	import { alignToGrid } from '$lib/utils/grid';
	const width = alignToGrid(80);
</script>

<section class="home" style="--home-width: {width}ch">
	<h1>Hey, I'm Russell Jones.</h1>

	<div class="tagline">I help build amazing web applications and contribute to open source.</div>

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
		width: var(--home-width);
		margin: 0 auto;
		font-family: var(--font-mono);
		line-height: 1.4;
	}

	h1 {
		margin: 0 0 var(--ch2) 0;
		font-size: 1.8em;
		font-weight: var(--font-weight-bold);
	}

	.tagline {
		font-size: 1.2em;
		margin: var(--ch2) 0;
		color: var(--text-muted);
	}

	.intro {
		margin: var(--ch3) 0;
	}

	.skills {
		margin: var(--ch2) 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--ch4);
	}

	.skill-group {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
	}

	.skill {
		padding: var(--ch) var(--ch2);
		border: 1px solid var(--border-color);
		background: var(--bg-color);
	}

	.navigation {
		margin-top: var(--ch4);
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
		padding: var(--ch2);
		border: 1px solid var(--border-color);
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
