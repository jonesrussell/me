<script lang="ts">
    export let items: {
        name: string;
        children?: typeof items;
    }[] = [];
    
    export let level = 0;
</script>

{#each items as item}
    <div class="tree-item" style="--level: {level}">
        {#if item.children}
            └── {item.name}/
            <svelte:self items={item.children} level={level + 1} />
        {:else}
            └── {item.name}
        {/if}
    </div>
{/each}

<style>
    .tree-item {
        font-family: var(--font-mono);
        white-space: pre;
        padding-left: calc(var(--level) * 4ch);
    }
</style> 