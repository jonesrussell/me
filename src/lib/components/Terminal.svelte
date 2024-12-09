<script lang="ts">
    export let title = '';
</script>

<div class="terminal">
    {#if title}
    <div class="title-bar">
        ┌─ {title} ───────────────────────┐
    </div>
    {/if}
    <div class="content">
        <slot />
    </div>
    <div class="bottom-bar">
        └────────────────────────────────┘
    </div>
</div>

<style>
    .terminal {
        font-family: var(--font-mono);
        background: var(--bg-color);
        border: 1px solid var(--border-color);
        white-space: pre;
        line-height: 1.2;
    }

    .title-bar {
        padding: var(--ch) var(--ch2);
        border-bottom: 1px solid var(--border-color);
        font-size: 0.9em;
        color: var(--text-muted);
    }

    .content {
        padding: var(--ch2);
        white-space: pre-wrap;
        min-height: var(--ch4);
    }

    .bottom-bar {
        padding: 0 var(--ch2);
        color: var(--text-muted);
    }
</style> 