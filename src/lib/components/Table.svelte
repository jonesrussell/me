<script lang="ts">
    export let headers: string[] = [];
    export let widths: number[] = [];
</script>

<div class="table">
    {#if headers.length}
    <div class="header">
        {#each headers as header, i}
        <div style="width: {widths[i]}ch">{header.padEnd(widths[i])}</div>
        {/each}
    </div>
    {/if}
    <div class="body">
        <slot />
    </div>
</div>

<style>
    .table {
        font-family: var(--font-mono);
        white-space: pre;
    }
    
    .header {
        display: flex;
        border-bottom: 1px solid var(--border-color);
        padding: 0.5ch 0;
    }
</style> 