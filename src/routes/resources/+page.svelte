<script lang="ts">
	import RuleViewer from '$components/RuleViewer.svelte';
</script>

<svelte:head>
	<title>Developer Resources</title>
	<meta name="description" content="Useful developer resources and configurations" />
</svelte:head>

<div class="resources">
	<section class="mb-ch4">
		<h2 class="mb-ch2">Configuration Files</h2>
		
		<div class="mb-ch2">
			<article>
				<h3 class="mb-ch">Development Rules</h3>
				<RuleViewer />
				<p class="description mb-ch2">
					These are my development rules that I use for improved code organization and consistency.
				</p>
			</article>
		</div>
	</section>

	<section>
		<h2 class="mb-ch2">Other Resources</h2>
		<ul class="resource-list">
			<li>
				<a href="/settings/vscode">VS Code Settings</a>
			</li>
			<li>
				<a href="/settings/git">Git Configurations</a>
			</li>
		</ul>
	</section>
</div>

<style>
	.resources {
		max-width: var(--measure);
		margin: 0 auto;
	}

	.description {
		font-size: 0.9em;
		color: var(--text-muted);
	}

	.resource-list {
		list-style: disc;
		padding-left: var(--ch4);
	}

	.resource-list li {
		margin-bottom: var(--ch);
	}
</style>
