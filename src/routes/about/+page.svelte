<script lang="ts">
	import Box from '$lib/components/Box.svelte';
</script>

<svelte:head>
	<title>About | Russell Jones</title>
	<meta name="description" content="About Russell Jones - Web Developer" />
</svelte:head>

<div class="about">
	<Box width={60}>
		<h1>About Me</h1>
		<div class="content">
			<p>
				Hello! I'm Russell Jones, a web developer focused on building clean, efficient, and
				user-friendly applications.
			</p>

			<h2>Skills</h2>
			<pre class="skills">
┌─────────┬─────────┬─────────┐
│Frontend │Backend  │DevOps   │
├─────────┼─────────┼─────────┤
│Svelte   │Node.js  │Docker   │
│React    │Express  │Git      │
│TypeScript│MongoDB │CI/CD    │
└─────────┴─────────┴─────────┘</pre>
		</div>
	</Box>
</div>

<style>
	.about {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--ch4);
	}

	h1 {
		text-align: center;
		margin-bottom: var(--ch4);
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
	}

	h2 {
		margin-top: var(--ch4);
		margin-bottom: var(--ch2);
	}

	.skills {
		font-family: var(--font-mono);
		line-height: 1.2;
		white-space: pre;
		color: var(--text-muted);
	}
</style>
