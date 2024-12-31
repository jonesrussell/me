<script lang="ts">
	import Tree from './Tree.svelte';

	interface TreeNode {
		name: string;
		children?: TreeNode[];
	}

	const { data, level = 0 } = $props<{
		data: TreeNode;
		level?: number;
	}>();

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
		{#each data.children as child}
			<Tree data={child} level={level + 1} />
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
