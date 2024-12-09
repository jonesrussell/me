<script lang="ts">
    export let headers: string[] = [];
    export let widths: number[] = [];
</script>

<div class="table">
    {#if headers.length}
    <div class="header">
        ┌{headers.map((_, i) => '─'.repeat(widths[i])).join('┬')}┐
        │{#each headers as header, i}{header.padEnd(widths[i])}│{/each}
        ├{headers.map((_, i) => '─'.repeat(widths[i])).join('┼')}┤
    </div>
    {/if}
    <div class="body">
        <slot />
    </div>
    {#if headers.length}
    <div class="footer">
        └{headers.map((_, i) => '─'.repeat(widths[i])).join('┴')}┘
    </div>
    {/if}
</div>

<style>
    .table {
        font-family: var(--font-mono);
        white-space: pre;
        line-height: 1.2;
    }
    
    .header {
        color: var(--text-muted);
    }

    .body {
        padding: var(--ch) 0;
    }

    .footer {
        color: var(--text-muted);
    }
</style> 