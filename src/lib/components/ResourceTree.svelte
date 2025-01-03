<script lang="ts">
	import ResourceTree from './ResourceTree.svelte';

	interface TreeNode {
		name: string;
		url?: string;
		description?: string;
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
			{getPrefix(isLast)}{data.name}
		</div>
		{#each data.children as child, i}
			<ResourceTree
				data={child}
				level={level + 1}
				isLast={i === data.children.length - 1}
			/>
		{/each}
	{:else}
		<div class="file" title={data.description}>
			{getPrefix(isLast)}
			{#if data.url}
				<a href={data.url} target="_blank" rel="noopener noreferrer"
					>{data.name}</a
				>
			{:else}
				{data.name}
			{/if}
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

	a {
		color: var(--link-color);
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
