<script lang="ts">
	import Box from '$lib/components/Box.svelte';
</script>

<svelte:head>
	<title>Russell Jones | Web Developer</title>
</svelte:head>

<Box width={60} title="Welcome">
	<div class="welcome">
		<h1>Russell Jones</h1>
		<p>Full Stack Developer & Open Source Enthusiast 🚀</p>

		<div class="intro">I create web applications and contribute to open source from Canada 🇨🇦</div>
	</div>
</Box>

<style>
	.welcome {
		text-align: center;
		line-height: 1.2;
	}

	h1 {
		margin: 0 0 var(--ch2) 0;
	}

	p {
		margin: 0 0 var(--ch2) 0;
		color: var(--text-muted);
	}

	.intro {
		margin-top: var(--ch2);
		line-height: 1.4;
	}
</style>
