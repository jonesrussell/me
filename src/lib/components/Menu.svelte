<script lang="ts">
    export let items: string[] = [];
    export let selected = 0;
</script>

<div class="menu">
    {#each items as item, i}
        <div class="menu-item" class:selected={i === selected}>
            {i === selected ? '→ ' : '  '}{item}
        </div>
    {/each}
</div>

<style>
    .menu {
        font-family: var(--font-mono);
        white-space: pre;
        line-height: 1.2;
    }

    .menu-item {
        padding: var(--ch) var(--ch2);
        cursor: pointer;
    }

    .menu-item:hover {
        background: var(--border-color);
    }

    .selected {
        color: var(--link-color);
    }
</style> 