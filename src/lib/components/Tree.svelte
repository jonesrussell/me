<script lang="ts">
	interface TreeNode {
		name: string;
		children?: TreeNode[];
	}

	export let data: TreeNode;
	export let level = 0;

	function getPrefix(isLast: boolean) {
		if (level === 0) return '';
		const indent = '│  '.repeat(level - 1);
		return indent + (isLast ? '└─ ' : '├─ ');
	}
</script>

<div class="tree-node">
	{#if data.children}
		<div class="folder">
			{getPrefix(false)}{data.name}/
		</div>
		{#each data.children as child, i}
			<svelte:self data={child} level={level + 1} />
		{/each}
	{:else}
		<div class="file">
			{getPrefix(true)}{data.name}
		</div>
	{/if}
</div>

<style>
	.tree-node {
		font-family: var(--font-mono);
		white-space: pre;
		line-height: 1.2;
	}

	.folder {
		color: var(--text-muted);
	}

	.file {
		color: var(--text-color);
	}
</style>
