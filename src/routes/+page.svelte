<script lang="ts">
	import Box from '$lib/components/Box.svelte';
</script>

<svelte:head>
	<title>Russell Jones | Web Developer</title>
</svelte:head>

<Box width={80} title="Welcome">
	<div class="welcome">
		<h1>Hey, I'm Russell Jones.</h1>

		<div class="tagline">I help build amazing web applications and contribute to open source.</div>

		<div class="intro">
			I'm a Full Stack Developer from Canada 🇨🇦 specializing in:

			<ul>
				<li>Modern JavaScript & TypeScript</li>
				<li>Vue & Svelte Ecosystems</li>
				<li>PHP (Laravel, Drupal)</li>
				<li>DevOps (Docker, Ansible)</li>
				<li>Go Development 🐹</li>
			</ul>
		</div>

		<div class="cta">
			Check out my <a href="/blog">technical articles</a>, browse my
			<a href="/projects">open source projects</a>, or <a href="/contact">get in touch</a>.
		</div>
	</div>
</Box>

<style>
	.welcome {
		text-align: left;
		line-height: 1.4;
	}

	h1 {
		margin: 0 0 var(--ch2) 0;
		font-size: 1.8em;
	}

	.tagline {
		font-size: 1.2em;
		margin: var(--ch2) 0;
		color: var(--text-muted);
	}

	.intro {
		margin: var(--ch3) 0;
	}

	ul {
		list-style: none;
		padding: var(--ch1) 0;
		margin: 0;
	}

	li {
		padding: calc(var(--ch1) / 2) 0;
	}

	.cta {
		margin-top: var(--ch3);
	}

	a {
		color: var(--accent);
		text-decoration: none;
		border-bottom: 1px solid currentColor;
	}

	a:hover {
		border-bottom-style: dashed;
	}
</style>
