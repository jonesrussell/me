<script lang="ts">
    export let items: {
        label: string;
        href?: string;
        selected?: boolean;
    }[] = [];
</script>

<nav class="menu">
    {#each items as item}
        <a 
            class="menu-item" 
            class:selected={item.selected}
            href={item.href}
        >
            {item.selected ? '>' : ' '} {item.label}
        </a>
    {/each}
</nav>

<style>
    .menu {
        font-family: var(--font-mono);
        display: flex;
        flex-direction: column;
        gap: 0.5ch;
    }

    .menu-item {
        text-decoration: none;
        padding: 0.5ch 1ch;
        white-space: pre;
    }

    .selected {
        background: var(--text-color);
        color: var(--bg-color);
    }
</style> 