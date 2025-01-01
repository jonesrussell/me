<script lang="ts">
	import Tree from './Tree.svelte';

	interface TreeNode {
		name: string;
		children?: TreeNode[];
	}

	const {
		data,
		level = 0,
		isLast = false
	} = $props<{
		data: TreeNode;
		level?: number;
		isLast?: boolean;
	}>();

	function getPrefix(isLastItem: boolean) {
		if (level === 0) return '';
		const indent = '│  '.repeat(level - 1);
		return indent + (isLastItem ? '└─ ' : '├─ ');
	}
</script>

<div class="tree-node">
	{#if data.children}
		<div class="folder">
			{getPrefix(isLast)}{data.name}/
		</div>
		{#each data.children as child, i}
			<Tree
				data={child}
				level={level + 1}
				isLast={i === data.children.length - 1}
			/>
		{/each}
	{:else}
		<div class="file">
			{getPrefix(isLast)}{data.name}
		</div>
	{/if}
</div>

<style>
	.tree-node {
		font-family: var(--font-mono);
		white-space: pre;
		line-height: var(--line-height-tight);
	}

	.folder {
		color: var(--text-muted);
	}

	.file {
		color: var(--text-color);
	}

	.tree {
		font-family: var(--font-mono);
		line-height: var(--line-height-tight);
		white-space: pre;
	}
</style>
