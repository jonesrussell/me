<script lang="ts">
	import Grid from '$lib/components/Grid.svelte';
	import Box from '$lib/components/Box.svelte';
	import RuleViewer from '$lib/components/RuleViewer.svelte';
	import { alignToGrid } from '$lib/utils/grid';

	const contentWidth = alignToGrid(80);
</script>

<svelte:head>
	<title>Developer Resources</title>
	<meta name="description" content="Useful developer resources and configurations" />
</svelte:head>

<Grid cols={1} gap={4}>
	<Box width={contentWidth}>
		<h1>Developer Resources</h1>
	</Box>

	<Box width={contentWidth} title="Configuration Files">
		<div class="section-content">
			<h2>Development Rules</h2>
			<RuleViewer />
			<p class="description">
				These are my development rules that I use for improved code organization and consistency.
			</p>
		</div>
	</Box>

	<Box width={contentWidth} title="Other Resources">
		<ul class="resource-list">
			<li>
				<a href="/settings/vscode">VS Code Settings</a>
			</li>
			<li>
				<a href="/settings/git">Git Configurations</a>
			</li>
		</ul>
	</Box>
</Grid>

<style>
	h1, h2 {
		margin: 0 0 var(--ch2) 0;
		padding: 0;
		line-height: 1.2;
	}

	.section-content {
		display: flex;
		flex-direction: column;
		gap: var(--ch2);
	}

	.description {
		color: var(--text-muted);
		line-height: 1.2;
	}

	.resource-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--ch);
	}

	.resource-list li {
		line-height: 1.2;
	}

	.resource-list li::before {
		content: '→';
		color: var(--text-muted);
		margin-right: var(--ch);
	}
</style>
