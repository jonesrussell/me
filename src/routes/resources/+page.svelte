<script lang="ts">
</script>

<svelte:head>
	<title>Developer Resources</title>
	<meta name="description" content="Useful developer resources and configurations" />
</svelte:head>

<div class="space-y-6">
	<section>
		<h2 class="mb-4 text-xl font-bold">Configuration Files</h2>
		
		<div class="space-y-4">
			<article>
				<h3 class="mb-2 text-lg font-semibold">.cursorrules</h3>
				<pre class="bg-gray-100 p-4 rounded overflow-x-auto"><code>{`{
  "rules": [
    // Your cursor rules here
  ]
}`}</code></pre>
				<p class="mt-2 text-sm">
					These are my custom cursor rules that I use for improved code navigation and editing.
				</p>
			</article>
		</div>
	</section>

	<section>
		<h2 class="mb-4 text-xl font-bold">Other Resources</h2>
		<ul class="list-disc pl-5 space-y-2">
			<li>
				<a href="/settings/vscode" class="text-blue-600 hover:underline">VS Code Settings</a>
			</li>
			<li>
				<a href="/settings/git" class="text-blue-600 hover:underline">Git Configurations</a>
			</li>
		</ul>
	</section>
</div>
